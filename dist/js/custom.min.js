var countparticipant = 1;
var count = 1;
var values2 = {};
var values22 = {};
var values3 = {};
var values4 = {};
var totalpartcipant = 1;
var valuesParticipant = [];
var dataComplete = {
  "bookingform" : {},
  "participantsDetails" : [],
  "ParentDetails" : {} ,
  "EmergencyDetails" : {}
};


(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function () {
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
  sr.reveal(
    ".sr-icons",
    {
      duration: 600,
      scale: 0.3,
      distance: "0px"
    },
    200
  );
  sr.reveal(".sr-button", {
    duration: 1000,
    delay: 200
  });
  sr.reveal(
    ".sr-contact",
    {
      duration: 600,
      scale: 0.3,
      distance: "0px"
    },
    300
  );

  $(window).on("load", function () {
    console.log("Ready to rock!!!");
  });
})(jQuery); // End of use strict

/*!
 * Start Bootstrap - Freelancer v4.0.0-beta.2 (https://startbootstrap.com/template-overviews/freelancer)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */
!(function (o) {
  "use strict";
  o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var t = o(this.hash);
      if ((t = t.length ? t : o("[name=" + this.hash.slice(1) + "]")).length)
        return (
          o("html, body").animate(
            {
              scrollTop: t.offset().top
            },
            1e3,
            "easeInOutExpo"
          ),
          !1
        );
    }
  }),
    o(document).scroll(function () {
      o(this).scrollTop() > 100
        ? o(".scroll-to-top").fadeIn()
        : o(".scroll-to-top").fadeOut();
    }),
    o(".js-scroll-trigger").click(function () {
      o(".navbar-collapse").collapse("hide");
    }),
    o("body").scrollspy({
      target: "#mainNav",
      offset: 80
    });
  var t = function () {
    o("#mainNav").offset().top > 100
      ? o("#mainNav").addClass("navbar-shrink")
      : o("#mainNav").removeClass("navbar-shrink");
  };
  t(),
    o(window).scroll(t),
    o(".portfolio-item").magnificPopup({
      type: "inline",
      preloader: !1,
      focus: "#username",
      modal: !0
    }),
    o(document).on("click", ".portfolio-modal-dismiss", function (t) {
      t.preventDefault(), o.magnificPopup.close();
    }),
    o(function () {
      o("body")
        .on("input propertychange", ".floating-label-form-group", function (t) {
          o(this).toggleClass(
            "floating-label-form-group-with-value",
            !!o(t.target).val()
          );
        })
        .on("focus", ".floating-label-form-group", function () {
          o(this).addClass("floating-label-form-group-with-focus");
        })
        .on("blur", ".floating-label-form-group", function () {
          o(this).removeClass("floating-label-form-group-with-focus");
        });
    });
})(jQuery);

// When the DOM is ready, run this function
$(document).ready(function () {
  

  $("#numberpart").change(function () {
    var price = Number($(this).val());
    // console.log(price)
    var total = price * 13500;
    $("#totalprice").attr("placeholder", total);
    $("#totalprice").attr("value", total);
  });

  function updatePrice(val) {
    $("#numberpart").val(val);
    $("#numberpart").trigger("change");
  }

  $(".booknowclass1").click(function(e) {
    console.log("Clicked booknow for indonesia...")
    // var eventName = $(".booknowclass").val();
    $('#batchvalue1').text("May 30 - June 4, 2018");
    $('#batchvalue2').text("June 14 - June 19, 2018");
    $("#batchvalue1").val("May 30 - June 4, 2018");
    $("#batchvalue2").val("June 14 - June 19, 2018");

    var tp1 = "13500";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);

  });

  $(".booknowclass2").click(function(e) {
    console.log("Clicked booknow for china...");
    $('#batchvalue1').text("May 15 - May 20, 2018");
    $('#batchvalue2').text("June 14 - June 19, 2018");
    $("#batchvalue1").val("May 15 - May 20, 2018");
    $("#batchvalue2").val("June 14 - June 19, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });

  $(".booknowclass3").click(function(e) {
    console.log("Clicked booknow for Uttarakhand...");
    $('#batchvalue1').text("May 22 - May 28, 2018");
    $('#batchvalue2').text("June 21 - June 26, 2018");
    $("#batchvalue1").val("May 22 - May 28, 2018");
    $("#batchvalue2").val("June 21 - June 26, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });

  $(".booknowclass4").click(function(e) {
    console.log("Clicked booknow for Karnataka...");
    $('#batchvalue1').text("May 8 - May 13, 2018");
    $('#batchvalue2').text("-");
    $("#batchvalue1").val("May 8 - May 13, 2018");
    $("#batchvalue2").val("-");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });

  $(".booknowclass5").click(function(e) {
    console.log("Clicked booknow for Mumbai...");
    $('#batchvalue1').text("May 1 - May 3, 2018");
    $('#batchvalue2').text("May 4 - May 6, 2018");
    $("#batchvalue1").val("May 1 - May 3, 2018");
    $("#batchvalue2").val("May 4 - May 6, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });

  $(".booknowclass6").click(function(e) {
    console.log("Clicked booknow for Bangalore...");
    $('#batchvalue1').text("May 21 - May 23, 2018");
    $('#batchvalue2').text("May 24 - May 26, 2018");
    $("#batchvalue1").val("May 21 - May 23, 2018");
    $("#batchvalue2").val("May 24 - May 26, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });

  $(".booknowclass7").click(function(e) {
    console.log("Clicked booknow for Hyderabad...");
    $('#batchvalue1').text("May 7 - May 9, 2018");
    $('#batchvalue2').text("May 10 - May 12, 2018");
    $("#batchvalue1").val("May 7 - May 9, 2018");
    $("#batchvalue2").val("May 10 - May 12, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });


  $(".booknowclass8").click(function(e) {
    console.log("Clicked booknow for Kolkata...");
    $('#batchvalue1').text("May 17 - May 19, 2018");
    $('#batchvalue2').text("May 20 - May 22, 2018");
    $("#batchvalue1").val("May 17 - May 19, 2018");
    $("#batchvalue2").val("May 20 - May 22, 2018");

    var tp1 = "25000";
    $("#price").attr("placeholder", tp1);
    $("#price").attr("value", tp1);
  });
  

  // updatePrice(1);
  $("#onlineform1").click(function (e) {
    var pname = $("#numberpart").val();
    totalpartcipant = pname;
    var batch = $("#batch").val();
    var batch = $('#batch').find(":selected").val();
    // $('#aioConceptName').find(":selected").text();
    console.log("Batch ==> " + batch);
    // var name = $("#name").val();
    // var email = $("#email").val();
    // var msg = $("#msg").val();
    if (!(pname == "" || batch == "")) {
      // $("#submitdata").empty();
      e.preventDefault();
      var pname = $("#numberpart").val();
      var values = {};
      var price = $("#price").val();
      var tp = price * pname;
      console.log("Price ==> " + price + "And Total==> " + tp);
      // document.getElementById("totalprice").placeholder = tp;
      $("#totalprice").attr("placeholder", tp);
      $("#totalprice").attr("value", tp);
      $.each($("#form1final").serializeArray(), function (i, field) {
        values[field.name] = field.value;
        // valueform1[field.name] = field.value;
      });
      console.log("Here..");
      console.log(values);
      console.log("Filled booking data...");
      // dataComplete[bookingform] = values;
      dataComplete.bookingform = values;
      console.log("Added to global object");
      $("#exampleModalform1").modal("hide");
      $("#exampleModalform2").modal("show");
      $("body").css("overflow", "hidden");
      $("#exampleModalform2").css("overflow", "auto");

      // $("#submitdata").append("Name: " + pname + "Values" + values);
    } else {
      // alert("Please Fill All Fields.");
      console.log("Else..");
      var form = document.getElementById("form1final");

      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
          var values = {};
          // var pname = $("#numberpart").val();
          $.each($("#form1final").serializeArray(), function (i, field) {
            values[field.name] = field.value;
          });
          // console.log("Here..");
          // e.preventDefault();
          // console.log(pname);
          // console.log(values);
        },
        false
      );
    }
  });


$("#finalcloseicon").click(function(e) {
  console.log("Final close....")
  location.reload(true);
});

$("#finalclose").click(function(e) {
  console.log("Final close....")
  location.reload(true);
});



  $("#firstdetailsubmit").click(function (e) {
    console.log("In second form");
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var validemail = isValidEmailAddress(email);
    console.log("valdEmail ==> " + validemail);
    var bloodgroup = $('#bloodgroup').find(":selected").val();
    var meal = $('#meal').find(":selected").val();
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
      return pattern.test(emailAddress);
    };

    if (!(fname == "" || lname == "" || validemail == false || bloodgroup == "" || meal == "")) {
      // $("#submitdata").empty();
      e.preventDefault();
      values2 = {};
      $.each($("#form2final").serializeArray(), function (i, field) {
        values2[field.name] = field.value;
        // valueform1[field.name] = field.value;
      });
      console.log("Here..");
      console.log(values2);
      valuesParticipant.push(values2);
      console.log(valuesParticipant);
      console.log("Filled participant data...");

      // while( countparticipant <= totalpartcipant )
      // {
      //   console.log(values2);
      //   console.log("Participant.")
      //   console.log(countparticipant);
      //   console.log("Total Participant:")
      //   console.log(totalpartcipant);
        
      //   document.getElementById("form2final").reset();
      //   console.log("Form resetted......")
      //   $("#exampleModalform2").css("overflow", "auto");
        


      //   var fname2 = $("#fname").val();
      //   var lname2 = $("#lname").val();
      //   var email2 = $("#email").val();
      //   var bloodgroup2 = $('#bloodgroup').find(":selected").val();
      //   var meal2 = $('#meal').find(":selected").val();
      //   function isValidEmailAddress(emailAddress) {
      //     var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
      //     return pattern.test(emailAddress);
      //   };

      //   if (!(fname2 == "" || lname2 == "" || bloodgroup2 == "" || meal2 == "")) {
      //     e.preventDefault();
      //     values22 = {};
      //     $.each($("#form2final").serializeArray(), function (i, field) {
      //       values22[field.name] = field.value;
      //     });
      //     console.log("Here..");
      //     console.log(values22);
      //     console.log("Filled participant 2 data...");
      //   } else {
      //     console.log("Else..");
      //     var form = document.getElementById("form2final");
    
      //     form.addEventListener(
      //       "submit",
      //       function (event) {
      //         var email2 = $("#email").val();
      //         var validemail2 = isValidEmailAddress(email2);
      //         console.log("Email submit ==> " + email2);
      //         if (form.checkValidity() === false || validemail2 === false) {
      //           event.preventDefault();
      //           event.stopPropagation();
      //           if (validemail2 === false) {
      //             console.log(validemail2);
      //             console.log("Email Invalid..........");
      //             $("#email").next().empty();
      //             $("#email").next().text("Email is invalid.");
      //             $(".emailinvalid").css('display', 'block');
      //           }
      //           else {
      //             console.log(validemail);
      //             console.log("Email Valid...");
      //             $(".emailinvalid").css('display', 'none');
      //           }
      //         }
      //         form.classList.add("was-validated");
      //         var values22 = {};
      //         $.each($("#form2final").serializeArray(), function (i, field) {
      //           values22[field.name] = field.value;
      //         });
      //       },
      //       false
      //     );
      //   }
      //   countparticipant++;


      // }

      console.log("gdcgv");
      console.log(countparticipant);
      console.log("dsfbj");
      console.log(totalpartcipant)
      if( ((countparticipant) < totalpartcipant) )  {
        document.getElementById("form2final").reset();
        $('#participantvalue').text("Participant # "+ (countparticipant + 1));
        console.log("HEfvsdhcd.....")
        $("#exampleModalform2").css("overflow", "auto");
        countparticipant++;
      }
      else{
        console.log("gdcgvndmbb");
        console.log(countparticipant);
        console.log("dsfbjdfg");
        console.log(totalpartcipant)
      $("#exampleModalform2").modal("hide");
      $("#exampleModalform3").modal("show");
      document.getElementById("form3final").reset();
      $("body").css("overflow", "hidden");
      $("#exampleModalform3").css("overflow", "auto");
      }

      // $("#submitdata").append("Name: " + pname + "Values" + values);
    } else {
      // alert("Please Fill All Fields.");
      console.log("Else...........");
      var form = document.getElementById("form2final");

      form.addEventListener(
        "submit",
        function (event) {
          var email = $("#email").val();
          var validemail = isValidEmailAddress(email);
          console.log("Email submit ==> " + email);
          if (form.checkValidity() === false || validemail === false) {
            event.preventDefault();
            event.stopPropagation();
            if (validemail === false) {
              console.log(validemail);
              console.log("Email Invalid..........");
              $("#email").next().empty();
              $("#email").next().text("Email is invalid.");
              $(".emailinvalid").css('display', 'block');
            }
            else {
              console.log(validemail);
              console.log("Email Valid...");
              $(".emailinvalid").css('display', 'none');
            }
          }
          form.classList.add("was-validated");
          // e.preventDefault();
          var values2 = {};
          // var pname = $("#numberpart").val();
          $.each($("#form2final").serializeArray(), function (i, field) {
            values2[field.name] = field.value;
          });
          // console.log("Here..");
          // e.preventDefault();
          // console.log(pname);
          // console.log(values);
        },
        false
      );
    }
  });


  // $("#firstdetailsubmit").click(function (e) {
  //   console.log("In second form");
  //   var fname = $("#fname").val();
  //   var lname = $("#lname").val();
  //   var email = $("#email").val();
  //   var validemail = isValidEmailAddress(email);
  //   console.log("valdEmail ==> " + validemail);
  //   var bloodgroup = $('#bloodgroup').find(":selected").val();
  //   var meal = $('#meal').find(":selected").val();
  //   function isValidEmailAddress(emailAddress) {
  //     var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  //     return pattern.test(emailAddress);
  //   };

  //   if (!(fname == "" || lname == "" || validemail == false || bloodgroup == "" || meal == "")) {
  //     e.preventDefault();
  //     values2 = {};
  //     $.each($("#form2final").serializeArray(), function (i, field) {
  //       values2[field.name] = field.value;
  //     });
  //     console.log("Here..");
  //     console.log(values2);
  //     console.log("Filled participant data...");
  //     $("#exampleModalform2").modal("hide");
  //     $("#exampleModalform3").modal("show");
  //     document.getElementById("form3final").reset();
  //     $("body").css("overflow", "hidden");
  //     $("#exampleModalform3").css("overflow", "auto");

  //   } else {
  //     console.log("Else..");
  //     var form = document.getElementById("form2final");

  //     form.addEventListener(
  //       "submit",
  //       function (event) {
  //         var email = $("#email").val();
  //         var validemail = isValidEmailAddress(email);
  //         console.log("Email submit ==> " + email);
  //         if (form.checkValidity() === false || validemail === false) {
  //           event.preventDefault();
  //           event.stopPropagation();
  //           if (validemail === false) {
  //             console.log(validemail);
  //             console.log("Email Invalid..........");
  //             $("#email").next().empty();
  //             $("#email").next().text("Email is invalid.");
  //             $(".emailinvalid").css('display', 'block');
  //           }
  //           else {
  //             console.log(validemail);
  //             console.log("Email Valid...");
  //             $(".emailinvalid").css('display', 'none');
  //           }
  //         }
  //         form.classList.add("was-validated");
  //         var values2 = {};
  //         $.each($("#form2final").serializeArray(), function (i, field) {
  //           values2[field.name] = field.value;
  //         });
  //       },
  //       false
  //     );
  //   }
  // });



  $("#detailsubmit").click(function (e) {
    dataComplete.participantsDetails = valuesParticipant;
    console.log("Added Participants to global object");
    console.log("In third form");
    console.log(count);
    var relation = $('#relation').find(":selected").val();
    var pfname = $("#pfname").val();
    var plname = $("#plname").val();
    var pemail = $("#pemail").val();
    var validemail = isValidEmailAddress(pemail);
    console.log("valdEmail ==> " + validemail);
    var number = $("#contactno1").val();
    var numbertype = $('#contacttype1').find(":selected").val();
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
      return pattern.test(emailAddress);
    };

    if (!(pfname == "" || plname == "" || validemail == false || relation == "" || numbertype == "" || number == "")) {
      // $("#submitdata").empty();
      e.preventDefault();
      values3 = {};
      $.each($("#form3final").serializeArray(), function (i, field) {
        values3[field.name] = field.value;
        // valueform1[field.name] = field.value;
      });
      console.log("Here..");
      console.log(values3);
      console.log("Filled participant parent data...");
      dataComplete.ParentDetails = values3;
      console.log("Added Paent Details to global object");
      $("#exampleModalform3").modal("hide");
      $("#exampleModalform4").modal("show");
      $("body").css("overflow", "hidden");
      $("#exampleModalform4").css("overflow", "auto");
      // console.log(i);
      console.log(totalpartcipant);

      //values , values2 , values3
      //Save the data to google form here 

    } else {
      // alert("Please Fill All Fields.");
      console.log("Else..");
      var form = document.getElementById("form3final");
      // var form = $("#form3final");
      // console.log(form);

      form.addEventListener(
        "submit",
        function (event) {
          var pemail = $("#pemail").val();
          var validemail = isValidEmailAddress(pemail);
          console.log("Email submit ==> " + pemail);
          if (form.checkValidity() === false || validemail === false) {
            event.preventDefault();
            event.stopPropagation();
            if (validemail === false) {
              console.log(validemail);
              console.log("Email Invalid..........");
              $("#pemail").next().empty();
              $("#pemail").next().text("Email is invalid.");
              $(".emailinvalid").css('display', 'block');
            }
            else {
              console.log(validemail);
              console.log("Email Valid...");
              $(".emailinvalid").css('display', 'none');
            }
          }
          form.classList.add("was-validated");
          // e.preventDefault();
          console.log("Clcked submitt......");
          var values3 = {};
          // var pname = $("#numberpart").val();
          $.each($("#form3final").serializeArray(), function (i, field) {
            values3[field.name] = field.value;
          });
          // console.log("Here..");
          // e.preventDefault();
          // console.log(pname);
          // console.log(values);
        },
        false
      );
    }
  });

  $('#onlinepay').click(function (e) {

    //Integrate Pay U code here
    bolt.launch({
      key: 'rjQUPktU',
      txnid: '123456789',
      hash: 'defdfaadgerhetiwerer',
      amount: '1',
      firstname: 'Jaysinh',
      email: 'dummyemail@dummy.com',
      phone: '6111111111',
      productinfo: 'Bag',
      surl : 'https://sucess-url.in',
      furl: 'https://fail-url.in'
      
      },{ responseHandler: function(response){
      // your payment response Code goes here
      },
      catchException: function(response){
      // the code you use to handle the integration errors goes here
      }
      });

  });

  $("#cheque").click(function (e) {
    console.log("In Fourth Cheque form");
    // console.log(count);
    var erelation = $('#erelation').find(":selected").val();
    var efname = $("#e1name").val();
    var enumber = $("#econtactno1").val();
    var checked = document.getElementById("defaultCheck1").checked;

    if (!(e1name == "" || erelation == "" || enumber == "" || checked == false)) {
      // $("#submitdata").empty();
      e.preventDefault();
      values4 = {};
      $.each($("#form4final").serializeArray(), function (i, field) {
        values4[field.name] = field.value;
        // valueform1[field.name] = field.value;
      });
      console.log("Here..");
      console.log(values4);
      console.log("Filled participant parent data...");
      dataComplete.EmergencyDetails = values4;
      console.log("Added Emergency Details to global object");
      console.log(dataComplete);
      var myJSON = JSON.stringify(dataComplete);
      console.log(myJSON);
      $("#exampleModalform4").modal("hide");
      $("#exampleModalthank").modal("show");
      $('#messagedetails').text("Payment for "+ values2.FirstName + " , Event Name");
      $("body").css("overflow", "hidden");
      $("#exampleModalthank").css("overflow", "auto");

      // $("#submitdata").append("Name: " + pname + "Values" + values);
    } else {
      // alert("Please Fill All Fields.");
      console.log("Else..");
      var form = document.getElementById("form4final");

      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
          // e.preventDefault();
          console.log("Clcked submitt......");
          var values4 = {};
          // var pname = $("#numberpart").val();
          $.each($("#form4final").serializeArray(), function (i, field) {
            values4[field.name] = field.value;
          });
        },
        false
      );
    }
  });




  //Set the carousel options
  $("#quote-carousel").carousel({
    pause: true,
    interval: 4000
  });
});

// $('#exampleModal1').on('show.bs.modal', function (event) {
//   $('#c1').click();

// })

// $('#exampleModalform2').on('show.bs.modal', function (event) {
//   //Store the first form data here and then close first modal
//   $('.cancelform1').click();
// });

// $("#onlineform1").click(function(){
//   $('#exampleModalform1').modal('hide');
//   $('#exampleModalform2').modal('show');
//   $('body').css('overflow', 'hidden');
//   $('#exampleModalform2').css('overflow', 'auto');
// });

// $("#firstdetailsubmit").click(function() {
//   $("#exampleModalform2").modal("hide");
//   $("#exampleModalform3").modal("show");
//   $("body").css("overflow", "hidden");
//   $("#exampleModalform3").css("overflow", "auto");
// });

// $("#detailsubmit").click(function() {
//   $("#exampleModalform3").modal("hide");
//   $("#exampleModalthank").modal("show");
//   $("body").css("overflow", "hidden");
//   $("#exampleModalthank").css("overflow", "auto");
// });

$(".cancelclass").click(function (e) {
  e.preventDefault();
  $("body").css("overflow", "auto");
});

// $("#exampleModalform3").click(function(e) {
//   e.preventDefault();
//   $("body").css("overflow", "auto");
// });

// $('body').click(function(e) {
//   e.preventDefault();
// $('body').css('overflow', 'auto');
// });

$("#formGroupExampleInput1").keyup(function () {
  if ($(this).val() == "") {
    //Check to see if there is any text entered
    // If there is no text within the input ten disable the button
    $("#bt2").prop("disabled", true);
  } else {
    //If there is text in the input, then enable the button
    $("#bt2").prop("disabled", false);
  }
});
