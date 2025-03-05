(function ($) {
    "use strict";

    if ($('.elitelosh-testimonial-company-slider').length) {
      var settingsRaw = $('.elitelosh-testimonial-company-slider .swiper').attr('data-logoone'); 

      console.log(settingsRaw)
                    
      var settings = {};

      try {
          settings = JSON.parse(settingsRaw);
      } catch (error) {
          console.error("Invalid JSON in data-logoone:", settingsRaw);
      }

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
