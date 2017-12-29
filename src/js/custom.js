(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 57
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Scroll reveal calls
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
      duration: 600,
      scale: 0.3,
      distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
      duration: 1000,
      delay: 200
    });
    sr.reveal('.sr-contact', {
      duration: 600,
      scale: 0.3,
      distance: '0px'
    }, 300);
  
    $(window).on('load', function () {
        console.log("Ready to rock!!!");
    });
  })(jQuery); // End of use strict


  /*!
 * Start Bootstrap - Freelancer v4.0.0-beta.2 (https://startbootstrap.com/template-overviews/freelancer)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */
! function(o) {
  "use strict";
  o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var t = o(this.hash);
          if ((t = t.length ? t : o("[name=" + this.hash.slice(1) + "]")).length) return o("html, body").animate({
              scrollTop: t.offset().top
          }, 1e3, "easeInOutExpo"), !1
      }
  }), o(document).scroll(function() {
      o(this).scrollTop() > 100 ? o(".scroll-to-top").fadeIn() : o(".scroll-to-top").fadeOut()
  }), o(".js-scroll-trigger").click(function() {
      o(".navbar-collapse").collapse("hide")
  }), o("body").scrollspy({
      target: "#mainNav",
      offset: 80
  });
  var t = function() {
      o("#mainNav").offset().top > 100 ? o("#mainNav").addClass("navbar-shrink") : o("#mainNav").removeClass("navbar-shrink")
  };
  t(), o(window).scroll(t), o(".portfolio-item").magnificPopup({
      type: "inline",
      preloader: !1,
      focus: "#username",
      modal: !0
  }), o(document).on("click", ".portfolio-modal-dismiss", function(t) {
      t.preventDefault(), o.magnificPopup.close()
  }), o(function() {
      o("body").on("input propertychange", ".floating-label-form-group", function(t) {
          o(this).toggleClass("floating-label-form-group-with-value", !!o(t.target).val())
      }).on("focus", ".floating-label-form-group", function() {
          o(this).addClass("floating-label-form-group-with-focus")
      }).on("blur", ".floating-label-form-group", function() {
          o(this).removeClass("floating-label-form-group-with-focus")
      })
  })
}(jQuery);
  

// When the DOM is ready, run this function
$(document).ready(function() {
    //Set the carousel options
    $('#quote-carousel').carousel({
      pause: true,
      interval: 4000,
    });
  });

  $('#exampleModal1').on('show.bs.modal', function (event) {
    $('#c1').click();
    
  })

  $('#exampleModal2').on('show.bs.modal', function (event) {
    $('#c1').click();
    
  })

$('#formGroupExampleInput1').keyup(function () {
  if ($(this).val() == '') {
      //Check to see if there is any text entered
      // If there is no text within the input ten disable the button
      $('#bt2').prop('disabled', true);
  } else {
      //If there is text in the input, then enable the button
      $('#bt2').prop('disabled', false);
  }
});