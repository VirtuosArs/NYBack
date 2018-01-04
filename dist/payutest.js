// import { error } from "util";

var initiatedData = null;
var url = "http://139.59.70.142:11002/api/v1/";
// var clientData = {  
//     "bookingform":{  
//        "numberpart":"3",
//        "batch":"May 30 - June 4, 2018",
//        "price":"13500",
//        "totalprice":"40500"
//     },
//     "participantsDetails":[  
//        {  
//           "FirstName":"Test1 FN",
//           "MiddleName":"Test1 MN",
//           "LastName":"Test1 LN",
//           "emailid":"test1@test1.com",
//           "parentoccupation":"",
//           "gender":"Male",
//           "bloodgroup":"O-positive",
//           "meal":"Non-veg",
//           "dob":"",
//           "age":"",
//           "nationality":"",
//           "allergies":""
//        },
//        {  
//           "FirstName":"T2 FN",
//           "MiddleName":"T2 MN",
//           "LastName":"T2 LN",
//           "emailid":"test2@test2.com",
//           "parentoccupation":"",
//           "gender":"Female",
//           "bloodgroup":"O-negative",
//           "meal":"Veg",
//           "dob":"",
//           "age":"",
//           "nationality":"",
//           "allergies":""
//        },
//        {  
//           "FirstName":"T3 FN",
//           "MiddleName":"T3 MN",
//           "LastName":"T3 LN",
//           "emailid":"test3@test3.com",
//           "parentoccupation":"",
//           "gender":"Male",
//           "bloodgroup":"B-positive",
//           "meal":"Any",
//           "dob":"",
//           "age":"",
//           "nationality":"",
//           "allergies":""
//        }
//     ],
//     "ParentDetails":{  
//        "relation":"Father",
//        "pfirstname":"Test F FN",
//        "pmiddlename":"Test F MN",
//        "plastname":"Test F LN",
//        "address":"TEst Address",
//        "contacttype1":"Mobile",
//        "contactno1":"999999999",
//        "contactno2":"",
//        "pemail":"testf@testf.com"
//     },
//     "EmergencyDetails":{  
//        "e1name":"Test e1",
//        "erelation":"Mother",
//        "econtactno1":"9999999991",
//        "e2name":"",
//        "econtactno2":""
//     }
//  };

var checkout = function () {
    // heap.track('Bolt Checkout Initiated', {
    //     event_id: $scope.event._id, 
    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
    //     total: $scope.totalAmount,
    //     txnid: $scope.initiatedData.txnId,
    //     hash: $scope.initiatedData.hash,
    // });
    try {
        bolt.launch({
            key: 'k8Dvwvqw',
            txnid: initiatedData.txnId,
            hash: initiatedData.hash,
            amount: parseFloat(clientData.bookingform.totalprice).toFixed(1) + '',
            // amount: clientData.bookingform.totalprice,
            firstname: clientData.ParentDetails.pfirstname,
            lastname: clientData.ParentDetails.plastname,
            email: clientData.ParentDetails.pemail,
            phone: clientData.ParentDetails.contactno1,
            // amount: parseFloat(totalAmount).toFixed(1) + '',
            // firstname: user.firstname,
            // lastname: user.lastname,
            // email: user.email,
            // phone: user.mobile,
            productinfo: JSON.stringify(clientData),
            surl: 'https://sucess-url.in',
            furl: 'https://fail-url.in',
            udf3: initiatedData.txnId
        }, {
                responseHandler: function (response) {
                    // your payment response Code goes here
                    console.log(JSON.stringify(response, null, 4));
                    var status = response.response.status;
                    var txnStatus = response.response.txnStatus;
                    var txnMessage = response.response.txnMessage;
                    // heap.track('Bolt Checkout Response handler', {
                    //     // event_id: event._id, 
                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                    //     total: clientData.bookingform.totalprice,
                    //     txnid: initiatedData.txnId,
                    //     hash: initiatedData.hash,
                    //     status: status,
                    //     txnStatus: txnStatus,
                    //     txnMessage: txnMessage
                    // });
                    console.log(response.status);
                    console.log(status + ' ' + txnStatus);
                    if (txnStatus == "CANCEL") {
                        // $http.post(festConfig.baseUrl + 'cancelPayment', {
                        //     txnId: initiatedData.txnId,
                        //     status: 2 
                        // });
                        $.ajax({
                            type: "POST",
                            url: url + 'cancelPayment',
                            data: {
                                txnId: initiatedData.txnId,
                                status: 2 //user has aborted or transaction canceled
                            },
                            contentType: "application/json",
                            dataType: "json",
                            success: function(response) {
                                console.log(response.data);
                                
                            }
                        });
                        // heap.track('Bolt Checkout Response User-Cancel', {
                        //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                        //     total: $scope.totalAmount,
                        //     txnid: $scope.initiatedData.txnId,
                        //     hash: $scope.initiatedData.hash,
                        //     status: status,
                        //     txnStatus: txnStatus,
                        //     txnMessage: txnMessage
                        // });
                    }
                    else {
                        // heap.track('Bolt Checkout Validate Response Initiated', {
                        //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                        //     total: clientData.bookingform.totalprice,
                        //     txnid: $scope.initiatedData.txnId,
                        //     hash: $scope.initiatedData.hash,
                        //     status: status,
                        //     txnStatus: txnStatus,
                        //     txnMessage: txnMessage
                        // });
                        $.ajax({
                            type: "POST",
                            url: url + 'validateResponse',
                            data: {
                                txnId: response.response.txnid,
                                hash: response.response.hash,
                                status: response.response.status,
                                txnStatus: response.response.txnStatus,
                                details: response.response
                            },
                            contentType: "application/json",
                            dataType: "json",
                            success: function (validateResponse) {
                                console.log('inside-validate');
                                if (validateResponse.data.data.status == false) {
                                    console.log("errorHash");
                                    console.log(false);
                                    $http.post(url + 'cancelPayment', {
                                        txnId: response.response.txnid,
                                        status: 6 //hash is not validated
                                    });
                                    $.ajax({
                                        type: "POST",
                                        url: url + 'cancelPayment',
                                        data: {
                                            txnId: response.response.txnid,
                                            status: 6 //hash is not validated
                                        },
                                        dataType: "json",
                                        success: function(response) {
                                            console.log(response.data);
                                            
                                        }
                                    });
                                    openPopUP("Payment Cancelled Status ==> 6");
                                    // heap.track('Bolt Checkout Response-HashNotValidated', {
                                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    //     total: $scope.totalAmount,
                                    //     txnid: $scope.initiatedData.txnId,
                                    //     hash: $scope.initiatedData.hash,
                                    //     status: status,
                                    //     txnStatus: txnStatus,
                                    //     txnMessage: txnMessage
                                    // });
                                    
                                    // $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + "FAIL", {});

                                }
                                else if (validateResponse.data.data.status == true && (txnStatus == "SUCCESS" || txnStatus == "FAIL")) {
                                    // heap.track('Bolt Checkout Response-HashValidated', {
                                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    //     total: $scope.totalAmount,
                                    //     txnid: $scope.initiatedData.txnId,
                                    //     hash: $scope.initiatedData.hash,
                                    //     status: status,
                                    //     txnStatus: txnStatus,
                                    //     txnMessage: txnMessage
                                    // });
                                    openPopUP("Payment Success or txnStatus == Fail");
                                    // $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + txnStatus, {});
                                }
                                else if (validateResponse.data.data.status == true && txnStatus == "CANCEL") {
                                    // heap.track('Bolt Checkout Response-HashValidatedCancel', {
                                    //     event_id: $scope.event._id, 
                                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    //     total: $scope.totalAmount,
                                    //     txnid: $scope.initiatedData.txnId,
                                    //     hash: $scope.initiatedData.hash,
                                    //     status: status,
                                    //     txnStatus: txnStatus,
                                    //     txnMessage: txnMessage
                                    // });
                                    // $http.post(festConfig.baseUrl + 'cancelPayment', {
                                    //     txnId: response.response.txnid,
                                    //     status: 2 //user has aborted or transaction canceled
                                    // })

                                    $.ajax({
                                        type: "POST",
                                        url: url + 'cancelPayment',
                                        data: {
                                            txnId: response.response.txnid,
                                            status: 2 //user has aborted or transaction canceled
                                        },
                                        contentType: "application/json",
                                        dataType: "json",
                                        success: function(response) {
                                            console.log(response.data);
                                            
                                        }
                                    });

                                }
                                else {
                                    console.log("errorElseConditions");
                                    console.log(false);
                                    // heap.track('Bolt Checkout Response-HashValidatedNoConditions', {
                                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    //     total: $scope.totalAmount,
                                    //     txnid: $scope.initiatedData.txnId,
                                    //     hash: $scope.initiatedData.hash,
                                    //     status: status,
                                    //     txnStatus: txnStatus,
                                    //     txnMessage: txnMessage
                                    // });
                                    // $http.post(festConfig.baseUrl + 'cancelPayment', {
                                    //     txnId: response.response.txnid,
                                    //     status: 5 //app error no conditions match
                                    // })

                                    $.ajax({
                                        type: "POST",
                                        url: url + 'cancelPayment',
                                        data: {
                                            txnId: response.response.txnid,
                                            status: 5 //app error no conditions match
                                        },
                                        contentType: "application/json",
                                        dataType: "json",
                                        success: function(response) {
                                            console.log(response.data);
                                            
                                        }
                                    });
                                    
                                }
                            },
                            error : function (error) {
                                console.log("errorCatch");
                                console.log(error);
                                // heap.track('Bolt Checkout Response-ValidateCatch', {
                                //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                //     total: $scope.totalAmount,
                                //     txnid: $scope.initiatedData.txnId,
                                //     hash: $scope.initiatedData.hash,
                                //     status: status,
                                //     txnStatus: txnStatus,
                                //     error: error.message,
                                //     txnMessage: txnMessage
                                // });
                                $.ajax({
                                    type: "POST",
                                    url: url + 'cancelPayment',
                                    data: {
                                        txnId: $scope.initiatedData.txnId,
                                        status: 5 //app error no conditions match
                                    },
                                    contentType: "application/json",
                                    dataType: "json",
                                    success: function(response) {
                                        console.log(response.data);
                                        
                                    }
                                });

                                // $http.post(festConfig.baseUrl + 'cancelPayment', {
                                //     txnId: $scope.initiatedData.txnId,
                                //     status: 5 //app error no conditions match
                                // })
                            }
                        });




                        
                    }
                },
                catchException: function (response) {
                    // the code you use to handle the integration errors goes here
                    console.log("errorException");
                    console.log(response);
                    // heap.track('Bolt Checkout-Catch', { 
                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                    //     total: $scope.totalAmount,
                    //     txnid: $scope.initiatedData.txnId,
                    //     hash: $scope.initiatedData.hash,
                    //     error: JSON.stringify(response, null, 4)
                    // });
                    // $http.post(festConfig.baseUrl + 'cancelPayment', {
                    //     txnId: $scope.initiatedData.txnId,
                    //     status: 5 //app error no conditions match
                    // })

                    $.ajax({
                        type: "POST",
                        url: url + 'cancelPayment',
                        data: {
                            txnId: initiatedData.txnId,
                            status: 5 //app error no conditions match
                        },
                        contentType: "application/json",
                        dataType: "json",
                        success: function(response) {
                            console.log(response.data);
                            
                        }
                    });
                }
            });
    }
    catch (error) {
        // heap.track('Bolt Checkout-TryCatch', {
        //     link: $routeParams.orgName + '/' + $routeParams.eventName,
        //     total: $scope.totalAmount,
        //     txnid: $scope.initiatedData.txnId,
        //     hash: $scope.initiatedData.hash,
        //     error: JSON.stringify(error, null, 4)
        // });
        console.log("errorCatched");
        console.log(error);
        // $http.post(festConfig.baseUrl + 'cancelPayment', {
        //     txnId: txnId,
        //     status: 5 //app error no conditions match
        // })
        console.log(initiatedData);
        $.ajax({
            type: "POST",
            url: url + 'cancelPayment',
            data: {
                txnId: initiatedData.txnId,
                status: 5 //app error no conditions match
            },
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                console.log(response.data);
                
            }
        });
    }

};



var initiatePayment = function () {

    var selectedEntryType = [];
    var itemString = '';
    console.log("In initiate Payment....");
    console.log("Client Data==>");
    console.log(clientData);
    // $scope.event.entryType.forEach((entryType, index) => {
    //     if (entryType.quantity > 0) {
    //         selectedEntryType.push(entryType);
    //         itemString = itemString + "Item" + index + "-" + entryType.title + '/price:' + entryType.price + '/quantity' + entryType.quantity + ','
    //     }
    // });
    // if($routeParams.preview && $routeParams.preview == 'preview'){
    //     alert("Not available in preview mode!");
    //     return;
    
    // }
    // if(selectedEntryType.length <= 0 || $scope.totalAmount <=0 ){
    //     alert("Please add entries to checkout!");
    //     return;
    
    // }
    // if(!$scope.user){
    //     alert("Please fill all details to checkout!");
    //     return;
    // }
    // else if(!$scope.user.firstname || !$scope.user.lastname || !$scope.user.mobile || !$scope.user.email){
    //     alert("Please fill all details to checkout!");
    //     return;
    // }
    // if($scope.event.isAddressRequired){
    //     if(!$scope.user.address){
    //         alert("Please fill all details to checkout!");
    //         return;
    //     }
    // }
    // heap.identify($scope.user.email);
    // heap.addUserProperties({
    //     'First Name': $scope.user.firstname,
    //     'Last Name': $scope.user.lastname,
    //     'email': $scope.user.email,
    //     'mobile': $scope.user.mobile
    // });
    // heap.track('Initiated Payment', {
    //     event_id: $scope.event._id, 
    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
    //     items: itemString,
    //     total: $scope.totalAmount
    // });
    var vclientData = {
        clientData: clientData
    };
    console.log()
    $.ajax({
        type: "POST",
        url: url + 'initiatePayment',
        data: JSON.stringify(vclientData),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            console.log(response.data);
            initiatedData = {
                hash: response.data.hash, 
                txnId: response.data.txnId, 
                productInfo: response.data.transactionId
            };
            checkout();
        },
        error: function(error) {
            console.log(error)
        }
    });

    // $http.post(festConfig.baseUrl + 'initiatePayment', {
        //Send Client DAta
        //clientData
    //     clientData: clientData

    // })
    //     .then(function (response) {
    //         console.log(response.data);
    //         initiatedData = {
    //             hash: response.data.data.hash, 
    //             txnId: response.data.data.txnId, 
    //             productInfo: response.data.data.transactionId
    //         };
    //         checkout();
    //     })
    //     .catch(function (error) {
    //         console.log(error);
            // heap.track('Initiated Payment Error Catch', {
            //     event_id: event._id, 
            //     link: $routeParams.orgName + '/' + $routeParams.eventName,
            //     items: itemString,
            //     total: totalAmount,
            //     error: error.message
            // });
        // })
};


$('#onlinepay').click(function (e) {
    console.log("In Fourth Cheque form");
    // console.log(count);
    var erelation = $('#erelation').find(":selected").val();
    var efname = $("#e1name").val();
    var enumber = $("#econtactno1").val();
    var checked = document.getElementById("defaultCheck1").checked;
    console.log(checked);

    if (!(e1name == "" || erelation == "" || enumber == "")) {
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
      // clientData.EmergencyDetails = values4;
      console.log("Added Emergency Details to global object");
      console.log(dataComplete);
      var myJSON = JSON.stringify(dataComplete);
      clientData = dataComplete;
      console.log(myJSON);
      console.log(clientData);
    //   $("#exampleModalform4").modal("hide");
    //   $("#exampleModalthank").modal("show");
      var total = valuesParticipant.length;
      var namestring = "";
      while(total--) {
        if(valuesParticipant[total].FirstName.length > 0)
        {
          namestring = namestring + valuesParticipant[total].FirstName + ", ";
        }
        else
          console.log("Looping complete");
      }
    //   $('#messagedetails').text(namestring + " "+ eventNameT + "'");
    //   $("body").css("overflow", "hidden");
    //   $("#exampleModalthank").css("overflow", "auto");

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



        //Integrate Pay U code here
        
        // clientData = JSON.stringify(dataComplete);
        clientData = dataComplete;
        console.log(clientData);
        console.log("Clicked online")
        initiatePayment();
    
});



var openPopUP = function (data) {
    //----- OPEN
    // $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        $("#popupheading").text(data)
        e.preventDefault();
    // });
 
    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
 
        e.preventDefault();
    });
}