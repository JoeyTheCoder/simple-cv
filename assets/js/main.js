
(function ($) {
	var $window = $(window),
		$body = $('body');
	let translations = {};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile)
		$body.addClass('is-touch');

	// Scrolly links.
	$('.scrolly').scrolly({
		speed: 1200
	});




	// language.js






function reattachLanguageToggleListeners() {
    $('.lang-toggle').on('click', function () {
		var newLanguage = $(this).data('lang');
		toggleLanguage(newLanguage);
		// Reload the page only if dropotron is active
	
	});
}

function updateMenuTranslations() {
    $('#nav a[data-translate-key]').each(function () {
        var translationKey = $(this).data('translate-key'); // Use data-translate-key attribute for translation
        var language = document.documentElement.lang || 'en'; // Get the selected language from the HTML element
        var translatedText = translations[language][translationKey]; // Get translated text based on language and key

        if (translatedText) {
            $(this).text(translatedText);
        }
    });
}





// Initialize dropotron after translating menu items
function initTranslationAndDropotron() {
    updateMenuTranslations();

   

    $('#de, #en').on('click', function (event) {
        event.preventDefault();

        // Get the selected language from the clicked link
        const newLanguage = $(this).data('lang');
        document.documentElement.lang = newLanguage;

        // Update translations and re-initialize dropotron
        updateMenuTranslations();

        // Remove 'active' class from all links
        $('.lang-toggle').removeClass('active');

        // Add 'active' class to the clicked link
        $(this).addClass('active');

        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', newLanguage);
    });

   

    // Nav.
    // Title Bar.
    $(
        '<div id="titleBar">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '<span class="title">' + $('#logo').html() + '</span>' +
        '</div>'
    )
        .appendTo($body);

    // Panel.
    $(
        '<div id="navPanel">' +
        '<nav>' +
        $('#nav').navList() +
        '</nav>' +
        '</div>'
		
    )
	
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
			
        });

// ... rest of your code ...

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie' || browser.mobile) {
			$.fn._parallax = function () {
				return $(this);
			};
		} else {
			$.fn._parallax = function () {
				$(this).each(function () {
					var $this = $(this),
						on, off;
					on = function () {
						$this
							.css('background-position', 'center 0px');
						$window
							.on('scroll._parallax', function () {
								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);
								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');
							});
					};
					off = function () {
						$this
							.css('background-position', '');
						$window
							.off('scroll._parallax');
					};
					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);
				});
				return $(this);
			};
			$window
				.on('load resize', function () {
					$window.trigger('scroll');
				});
		}

		// Spotlights.
		var $spotlights = $('.spotlight');
		$spotlights
			._parallax()
			.each(function () {
				var $this = $(this),
					on, off;
				on = function () {
					var top, bottom, mode;
					$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');
					if ($this.hasClass('top')) {
						mode = 'top';
						top = '-20%';
						bottom = 0;
					} else if ($this.hasClass('bottom')) {
						mode = 'bottom-only';
						top = 0;
						bottom = '20%';
					} else {
						mode = 'middle';
						top = 0;
						bottom = 0;
					}
					$this.scrollex({
						mode: mode,
						top: top,
						bottom: bottom,
						initialize: function (t) { $this.addClass('inactive'); },
						terminate: function (t) { $this.removeClass('inactive'); },
						enter: function (t) { $this.removeClass('inactive'); }
					});
				};
				off = function () {
					$this.css('background-image', '');
					$this.unscrollex();
				};
				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);
			});

		// Wrappers.
		var $wrappers = $('.wrapper');
		$wrappers
			.each(function () {
				var $this = $(this),
					on, off;
				on = function () {
					$this.scrollex({
						top: 250,
						bottom: 0,
						initialize: function (t) { $this.addClass('inactive'); },
						terminate: function (t) { $this.removeClass('inactive'); },
						enter: function (t) { $this.removeClass('inactive'); }
					});
				};
				off = function () {
					$this.unscrollex();
				};
				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);
			});

		// Banner.
		var $banner = $('#banner');
		$banner
			._parallax();
	}

	document.addEventListener('DOMContentLoaded', function () {
		fetch('assets/js/translations.json')
			.then(response => response.json())
			.then(data => {
				translations = data;
				reattachLanguageToggleListeners(); // Attach language toggle listeners first
				initTranslationAndDropotron(); // Initialize dropotron after attaching listeners
			})
			.catch(error => console.error('Error loading translations:', error));
	});

})(jQuery);
