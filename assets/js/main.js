$(document).ready(function () {
	new Swiper(".clients__slider", {
		spaceBetween: 20,
		speed: 700,
		loop: true,
		navigation: {
			nextEl: ".clients__arrow-next",
			prevEl: ".clients__arrow-prev",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 1,
			},
		},
	});

	new Swiper(".partners__slider", {
		spaceBetween: 20,
		speed: 700,
		loop: true,

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 5,
			},
		},
	});

	const $backToTop = $("#backToTop");

	// Show the button when scrolling down
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$backToTop.fadeIn();
		} else {
			$backToTop.fadeOut();
		}
	});
	$backToTop.click(function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	document.addEventListener("scroll", function () {
		const hero = document.querySelector(".hero");
		const heroContent = document.querySelector(".hero__content");
		const scrollY = window.scrollY;
		hero.style.backgroundPositionY = `${scrollY * -0.5}px`;
		heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
	});
});
