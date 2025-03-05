(function ($) {
    "use strict";

    // $(document).ready(function () {
    //     var carousels = [
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-871', slider: '#logo-sliderone' },
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-872', slider: '#logo-slidertwo' },
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-873', slider: '#logo-sliderthree' },
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-874', slider: '#logo-sliderfour', dotsEach: true },
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-875', slider: '#logo-sliderfive', items: 3, responsive: { 0: { items: 1 }, 450: { items: 2 }, 650: { items: 3 } } },
    //         { wrapper: '.elitelogo-logoCarousel-wrapper-880', slider: '#logo-slidersix', dotsEach: true }
    //     ];

    //     jQuery(document).ready(function ($) {
    //         carousels.forEach(function (carousel) {
    //             var $wrapper = $(carousel.wrapper);
        
    //             if ($wrapper.length) {
    //                 var settingsRaw = $wrapper.attr('data-logoone'); 
                    
    //                 var settings = {};
        
    //                 try {
    //                     settings = JSON.parse(settingsRaw);
    //                 } catch (error) {
    //                     console.error("Invalid JSON in data-logoone:", settingsRaw);
    //                 }
        
    //                 var sliderElement = document.querySelector(carousel.slider);
    //                 if (!sliderElement) {
    //                     console.error("Slider element not found:", carousel.slider);
    //                     return;
    //                 }

    //                 console.log("Checking wrapper:", sliderElement );
        
    //                 var swiper = new Swiper('.elitelogo-logoCarousel-box-871', {
    //                     slidesPerView: 'auto',
    //                     spaceBetween: 20, // স্পেস ঠিক করার জন্য আপডেট করুন
    //                     loop: settings.infinite || false,
    //                     autoplay: settings.autoplay ? { delay: 3000, disableOnInteraction: false } : false,
    //                     navigation: settings.arrows ? {
    //                         nextEl: '.swiper-button-next',
    //                         prevEl: '.swiper-button-prev'
    //                     } : false,
    //                     pagination: settings.dots ? {
    //                         el: '.swiper-pagination',
    //                         clickable: true,
    //                         dynamicBullets: settings.dotsEach || false
    //                     } : false,
    //                     mousewheel: settings.enable_mouse_control !== false,
    //                     direction: settings.rtl === true ? "rtl" : "ltr",
    //                     breakpoints: {
    //                         0: { slidesPerView: 1, spaceBetween: 10 },
    //                         400: { slidesPerView: 2, spaceBetween: 15 },
    //                         600: { slidesPerView: 3, spaceBetween: 15 },
    //                         1000: { slidesPerView: 4, spaceBetween: 20 },
    //                         1200: { slidesPerView: 5, spaceBetween: 25 }
    //                     }
    //                 });
                    
                    
                    
    //             }
    //         });
    //     });
        
    // });

    if ($('.elitelosh-testimonial-company-slider').length) {
      var settingsRaw = $('.elitelosh-testimonial-company-slider .swiper').attr('data-logoone'); 

      console.log(settingsRaw)
                    
      var settings = {};

      try {
          settings = JSON.parse(settingsRaw);
      } catch (error) {
          console.error("Invalid JSON in data-logoone:", settingsRaw);
      }

      console.log(settings.infinite)
      const testimonial_company_slider = new Swiper('.elitelosh-testimonial-company-slider .swiper', {
        slidesPerView : 2,
        speed: 2000,
        spaceBetween: settings.item_gap,
        loop: settings.infinite || false,
        autoplay: settings.autoplay ? { delay: 3000, disableOnInteraction: false } : false,
        navigation: settings.arrows ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        } : false,
        pagination: settings.dots ? {
            el: '.swiper-pagination',
            clickable: true,
        } : false,
        mousewheel: settings.enable_mouse_control !== false,
        //direction: settings.rtl === true ? "rtl" : "ltr",
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 10 },
          400: { slidesPerView: 2, spaceBetween: 15 },
          600: { slidesPerView: 3, spaceBetween: 15 },
          1000: { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 25 }
        }
      });
	}

})(jQuery);
