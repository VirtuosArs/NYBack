var initiatedData = null;

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
            firstname: clientData.ParentDetails.pfirstname,
            lastname: clientData.ParentDetails.plastname,
            email: clientData.ParentDetails.pemail,
            phone: clientData.ParentDetails.contactno1,
            // amount: parseFloat(totalAmount).toFixed(1) + '',
            // firstname: user.firstname,
            // lastname: user.lastname,
            // email: user.email,
            // phone: user.mobile,
            productinfo: initiatedData.productInfo,
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
                            dataType: json,
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
                        $http.post(festConfig.baseUrl + 'validateResponse', {
                            txnId: response.response.txnid,
                            hash: response.response.hash,
                            status: response.response.status,
                            txnStatus: response.response.txnStatus,
                            details: response.response
                        })
                            .then(function (validateResponse) {
                                console.log('inside-validate');
                                if (validateResponse.data.data.status == false) {
                                    console.log("errorHash");
                                    console.log(false);
                                    $http.post(festConfig.baseUrl + 'cancelPayment', {
                                        txnId: response.response.txnid,
                                        status: 6 //hash is not validated
                                    });
                                    // heap.track('Bolt Checkout Response-HashNotValidated', {
                                    //     link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    //     total: $scope.totalAmount,
                                    //     txnid: $scope.initiatedData.txnId,
                                    //     hash: $scope.initiatedData.hash,
                                    //     status: status,
                                    //     txnStatus: txnStatus,
                                    //     txnMessage: txnMessage
                                    // });
                                    
                                    $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + "FAIL", {});

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
                                    $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + txnStatus, {});
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
                                    $http.post(festConfig.baseUrl + 'cancelPayment', {
                                        txnId: response.response.txnid,
                                        status: 2 //user has aborted or transaction canceled
                                    })

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
                                    $http.post(festConfig.baseUrl + 'cancelPayment', {
                                        txnId: response.response.txnid,
                                        status: 5 //app error no conditions match
                                    })
                                }
                            })
                            .catch(function (error) {
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
                                $http.post(festConfig.baseUrl + 'cancelPayment', {
                                    txnId: $scope.initiatedData.txnId,
                                    status: 5 //app error no conditions match
                                })
                            })
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
                    $http.post(festConfig.baseUrl + 'cancelPayment', {
                        txnId: $scope.initiatedData.txnId,
                        status: 5 //app error no conditions match
                    })
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
        $http.post(festConfig.baseUrl + 'cancelPayment', {
            txnId: txnId,
            status: 5 //app error no conditions match
        })
    }

};



var initiatePayment = function () {
    var initiatedData = {};
    var selectedEntryType = [];
    var itemString = '';
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

    $.ajax({
        type: "POST",
        url: url,
        data: clientData,
        dataType: json,
        success: function(response) {
            console.log(response.data);
            initiatedData = {
                hash: response.data.data.hash, 
                txnId: response.data.data.txnId, 
                productInfo: response.data.data.transactionId
            };
            checkout();
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
    
        //Integrate Pay U code here
        initiatePayment();
    
});