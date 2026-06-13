(function ($) {

	"use strict";

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	//LightBox / Fancybox
	if ($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect: 'fade',
			closeEffect: 'fade',
			helpers: {
				media: {}
			}
		});
	}

	//Contact Form Validation
	if ($('#email-form').length) {
		$('#submit').click(function () {

			var o = new Object();
			var form = '#email-form';

			var username = $('#email-form .username').val();
			var email = $('#email-form .email').val();

			if (username == '' || email == '') {
				$('#email-form .response').html('<div class="failed">Please fill the required fields.</div>');
				return false;
			}

			$.ajax({
				url: "sendemail.php",
				method: "POST",
				data: $(form).serialize(),
				beforeSend: function () {
					$('#email-form .response').html('<div class="text-info"><img src="images/icons/preloader.gif"> Loading...</div>');
				},
				success: function (data) {
					$('form').trigger("reset");
					$('#email-form .response').fadeIn().html(data);
					setTimeout(function () {
						$('#email-form .response').fadeOut("slow");
					}, 5000);
				},
				error: function () {
					$('#email-form .response').fadeIn().html(data);
				}
			});
		});
	}

	//Subscribe Form
	if ($('#subscribe-form').length) {
		$('#subscribe-newslatters').click(function () {

			var o = new Object();
			var form = '#subscribe-form';
			var email = $('#subscribe-form .email').val();

			if (email == '') {
				$('#subscribe-form .response').html('<div class="failed">Please enter your Email Address.</div>');
				return false;
			}

			$.ajax({
				url: "sendnewslatters.php",
				method: "POST",
				data: $(form).serialize(),
				beforeSend: function () {
					$('#subscribe-form .response').html('<div class="text-info"><img src="images/icons/preloader.gif"> Loading...</div>');
				},
				success: function (data) {
					$('form').trigger("reset");
					$('#subscribe-form .response').fadeIn().html(data);
					setTimeout(function () {
						$('#subscribe-form .response').fadeOut("slow");
					}, 5000);
				},
				error: function () {
					$('#subscribe-form .response').fadeIn().html(data);
				}
			});
		});
	}

	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);

		});
	}

	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW(
			{
				boxClass: 'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset: 0,          // distance to the element when triggering the animation (default is 0)
				mobile: false,       // trigger animations on mobile devices (default is true)
				live: true       // act on asynchronously loaded content (default is true)
			}
		);
		wow.init();
	}


	/* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

	$(window).on('scroll', function () {
		// headerStyle();
	});

	/* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

	$(window).on('load', function () {
		handlePreloader();
		defaultMasonry();
	});

})(window.jQuery);