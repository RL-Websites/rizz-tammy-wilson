document.addEventListener("DOMContentLoaded", function () {
	const baseUrl = "https://rizzpharma.com/API";
	const homeUrl = "https://rizzpharma.com/#ref/";
	const refCode = "e2f402aa-4c69-2b7a-c9f6-fe3dffb81e19";
	const homeUrlFull = `${homeUrl}${refCode}`;

	const cName = "Tammy Wilson";
	const getModuleId = 424;
	const getTabId = 53;
	const postModuleId = 428;
	const postTabId = 55;

	const modalWrapper = document.getElementById("couponModalWrapper");
	const modal = document.getElementById("couponModal");
	const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
	const continueBtn = document.getElementById("continueBtn");
	const okayBtn = document.getElementById("okayBtn");
	const linksToBtn = document.querySelectorAll(".link-to");
	const emailInput = document.getElementById("emailInput");
	const emailError = document.getElementById("emailError");
	const couponMain = document.getElementById("couponMain");
	const couponAlt = document.getElementById("couponAlt");
	const discountCode = document.getElementById("discountCode");
	const sourceText = document.getElementById("sourceText");
	const discountText1 = document.getElementById("discountAmount1");
	const discountText2 = document.getElementById("discountAmount2");
	var couponObject = {};

	linksToBtn.forEach((link) => {
		link.addEventListener("click", handleLinkSubmit);
		link.href = homeUrlFull;
		const id = link.getAttribute("data-id");
		const categoryUrlFull = `https://rizzpharma.com/#category-detail/${id}/ref/${refCode}`;
		if (id) {
			link.href = categoryUrlFull;
		}
	});

	function openModal() {
		modalWrapper.classList.remove("hidden");
		modalWrapper.classList.add("flex");
	}

	function closeModal() {
		modalWrapper.classList.remove("flex");
		modalWrapper.classList.add("hidden");
	}

	function showThankYou() {
		couponMain.classList.add("hidden");
		couponAlt.classList.remove("hidden");
	}

	getCoupon();
	// Open modal after 3 seconds
	setTimeout(openModal, 5000);

	// Close modal when clicking close buttons
	closeButtons.forEach((button) => {
		button.addEventListener("click", closeModal);
	});

	// Okay button functionality
	okayBtn.addEventListener("click", closeModal);

	// Close modal when clicking outside
	modalWrapper.addEventListener("click", function (event) {
		if (event.target === modalWrapper) {
			closeModal();
		}
	});

	// Email input validation on change
	// emailInput.addEventListener('input', function() {
	// 	if (this.value.trim() && !isValidEmail(this.value.trim())) {
	// 			showEmailError('Please enter a valid email address.');
	// 	} else {
	// 			hideEmailError();
	// 	}
	// });

	// Email validation function
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function hideEmailError() {
		emailError.textContent = "";
		emailError.classList.add("hidden");
	}

	function showEmailError(message) {
		emailError.textContent = message;
		emailError.classList.remove("hidden");
	}
	// Continue button functionality
	continueBtn.addEventListener("click", handleSubmit);

	emailInput.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault(); // Prevent form submission if within a form
			handleSubmit();
		}
	});

	function handleSubmit() {
		const email = emailInput.value.toLowerCase().trim();
		if (email && isValidEmail(email)) {
			hideEmailError();
			submitEmail(email);
		} else {
			showEmailError("Please enter a valid email address.");
		}
	}

	function handleLinkSubmit(event) {
		event.preventDefault();
		const url = this.href;
		window.open(url, "_blank");
		submitLink();
	}

	async function getCoupon() {
		const apiUrl = `${baseUrl}/Promo.Code.Admin.RL.Module/PromocodeRL/GetReferralOfferCouponCode?refCode=${refCode}`;
		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			accept: "application/json, text/javascript, */*; q=0.01",
			mode: "no-cors",
			ModuleId: getModuleId,
			TabId: getTabId,
		};

		try {
			const response = await fetch(apiUrl, {
				method: "GET",
				headers: headers,
			});

			if (!response.ok) {
				throw new Error("API request failed");
			}

			const data = await response.json();
			couponObject = data;
			if (data) {
				discountCode.textContent = data.DiscountCode;
				if (data.DiscountType == "P") {
					discount = `${data.DiscountAmount}%`;
				} else {
					discount = `$${data.DiscountAmount}`;
				}
				discountText1.textContent = discount;
				discountText2.textContent = discount;
				sourceText.textContent = data.Source;
			}
			console.log("API response:", data);
		} catch (error) {
			console.error("Error getting coupon code:", error);
			// showEmailError('There was an error getting the coupon code. Please try again.');
		} finally {
			continueBtn.disabled = false;
			continueBtn.textContent = "Continue";
		}
	}

	async function submitEmail(email) {
		const apiUrl = `${baseUrl}/Order.RL.Module/OrderRL/StoreUserWelcomePromocode`;
		const payload = {
			Email: email,
			PromoCodeId: couponObject.PromoCodeId,
			DiscountCode: couponObject.DiscountCode,
			DiscountType: couponObject.DiscountType,
			DiscountAmount: couponObject.DiscountAmount,
			IsUsed: false,
			// Add any other required fields to the payload
		};
		const headers = {
			"Content-Type": "application/json",
			ModuleId: postModuleId,
			TabId: postTabId,
			// Add any other required headers
		};

		try {
			continueBtn.disabled = true;
			continueBtn.textContent = "Submitting...";

			const response = await fetch(apiUrl, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("API request failed");
			}

			const data = await response.json();
			console.log("API response:", data);
			showThankYou();
		} catch (error) {
			console.error("Error submitting email:", error);
			// alert('There was an error submitting your email. Please try again.');
			showEmailError(
				"There was an error submitting your email. Please try again later."
			);
		} finally {
			continueBtn.disabled = false;
			continueBtn.textContent = "Continue";
		}
	}

	async function submitLink() {
		const apiUrl = `${baseUrl}/Order.RL.Module/OrderRL/AddCelebratyClickInfo`;
		const payload = {
			RefCode: refCode,
			CelebrityName: cName,
		};
		const headers = {
			"Content-Type": "application/json",
			ModuleId: postModuleId,
			TabId: postTabId,
		};

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Add Click Info API request failed");
			}

			const data = await response.json();
			console.log("API response:", data);
		} catch (error) {
			console.error("Its a broken link:", error);
		} finally {
			console.log(data);
		}
	}
});
