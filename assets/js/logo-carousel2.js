(function ($) {
    "use strict";

    // Slick Carousel initialization for brand gallery
    // $(document).ready(function() {
    //     $('.brand-gallery').slick({
    //         slidesToShow: 3, // number of slides to show at once
    //         slidesToScroll: 1, // number of slides to scroll
    //         autoplay: true, // enable autoplay
    //         autoplaySpeed: 2000, // speed of autoplay
    //         arrows: true, // enable arrows
    //         responsive: [
    //             {
    //                 breakpoint: 1024,
    //                 settings: {
    //                     slidesToShow: 2,
    //                 }
    //             },
    //             {
    //                 breakpoint: 600,
    //                 settings: {
    //                     slidesToShow: 1,
    //                 }
    //             }
    //         ]
    //     });
    // });

    // For the second part of your script using owlCarousel (if needed)
    $(document).ready(function () {
        var carousels = [
            { wrapper: '.elitelogo-logoCarousel-wrapper-871', slider: '#logo-sliderone' },
            { wrapper: '.elitelogo-logoCarousel-wrapper-872', slider: '#logo-slidertwo' },
            { wrapper: '.elitelogo-logoCarousel-wrapper-873', slider: '#logo-sliderthree' },
            { wrapper: '.elitelogo-logoCarousel-wrapper-874', slider: '#logo-sliderfour', dotsEach: true },
            { wrapper: '.elitelogo-logoCarousel-wrapper-875', slider: '#logo-sliderfive', items: 3, responsive: { 0: { items: 1 }, 450: { items: 2 }, 650: { items: 3 } } },
            { wrapper: '.elitelogo-logoCarousel-wrapper-880', slider: '#logo-slidersix', dotsEach: true }
        ];

        carousels.forEach(function (carousel) {
            var $wrapper = $(carousel.wrapper);
            if ($wrapper.length) {
                var settingsRaw = $wrapper.attr('data-logoone'); // HTML attribute থেকে ডাটা নেওয়া
                var settings = {};

                try {
                    settings = JSON.parse(settingsRaw); // JSON হিসাবে parse করা
                } catch (error) {
                    console.error("Invalid JSON in data-logoone:", settingsRaw);
                }

                $wrapper.find('.owl-carousel').owlCarousel({
                    items: carousel.items || 5,
                    autoplay: settings.autoplay || false,
                    loop: settings.infinite || false,
                    margin: settings.item_gap || 10,
                    nav: settings.arrows || false,
                    dots: settings.dots || false,
                    dotsEach: carousel.dotsEach || false,
                    rtl: settings.rtl === true, 
                    autoplayHoverPause:settings.enable_mouse_control !== false,
                    responsive: carousel.responsive || {
                        0: { items: 1 },
                        400: { items: 2 },
                        600: { items: 3 },
                        1000: { items: 4 },
                        1200: { items: 5 }
                    }
                });
            }
        });
    });
})(jQuery);
