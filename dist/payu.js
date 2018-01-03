var festPayApp = angular.module('festPayApp', ['ngRoute'])

    .controller('TodoListController', function () {
    })
    .controller('eventCtrl', function (festConfig, $scope, $http, $rootScope, $location, $routeParams, edes) {
        console.log('config');
        console.log(festConfig);
        console.log(edes);
        $scope.user = null;
        $scope.totalAmount = 0;
        $scope.event = edes.data;
        $scope.event.entryType.forEach((entryType) => {
            entryType.quantity = 0;
        });
        heap.track('Event View', {
            event_id: $scope.event._id, 
            link: $routeParams.orgName + '/' + $routeParams.eventName,
        });

        $scope.addTicket = function (entryType) {
            entryType.quantity++;
            $scope.totalAmount = $scope.totalAmount + entryType.price;
            console.log($scope.event.entryType);
            heap.track('Add Cart', {
                event_id: $scope.event._id, 
                link: $routeParams.orgName + '/' + $routeParams.eventName,
                item: entryType.title,
                price: entryType.price,
                quantity: entryType.quantity,
                total: $scope.totalAmount
            });
        };

        $scope.removeTicket = function (entryType) {
            if (entryType.quantity !== 0) {
                entryType.quantity--;
                $scope.totalAmount = $scope.totalAmount - entryType.price;
            }
            heap.track('Remove Cart', {
                event_id: $scope.event._id, 
                link: $routeParams.orgName + '/' + $routeParams.eventName,
                item: entryType.title,
                price: entryType.price,
                quantity: entryType.quantity,
                total: $scope.totalAmount
            });
            console.log($scope.event.entryType);
        }

        $scope.checkout = function () {
            heap.track('Bolt Checkout Initiated', {
                event_id: $scope.event._id, 
                link: $routeParams.orgName + '/' + $routeParams.eventName,
                total: $scope.totalAmount,
                txnid: $scope.initiatedData.txnId,
                hash: $scope.initiatedData.hash,
            });
            try {
                bolt.launch({
                    key: 'k8Dvwvqw',
                    txnid: $scope.initiatedData.txnId,
                    hash: $scope.initiatedData.hash,
                    amount: parseFloat($scope.totalAmount).toFixed(1) + '',
                    firstname: $scope.user.firstname,
                    lastname: $scope.user.lastname,
                    email: $scope.user.email,
                    phone: $scope.user.mobile,
                    productinfo: $scope.initiatedData.productInfo,
                    surl: 'https://sucess-url.in',
                    furl: 'https://fail-url.in',
                    udf3: $scope.initiatedData.txnId
                }, {
                        responseHandler: function (response) {
                            // your payment response Code goes here
                            console.log(JSON.stringify(response, null, 4));
                            var status = response.response.status;
                            var txnStatus = response.response.txnStatus;
                            var txnMessage = response.response.txnMessage;
                            heap.track('Bolt Checkout Response handler', {
                                event_id: $scope.event._id, 
                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                total: $scope.totalAmount,
                                txnid: $scope.initiatedData.txnId,
                                hash: $scope.initiatedData.hash,
                                status: status,
                                txnStatus: txnStatus,
                                txnMessage: txnMessage
                            });
                            console.log(response.status);
                            console.log(status + ' ' + txnStatus);
                            if (txnStatus == "CANCEL") {
                                $http.post(festConfig.baseUrl + 'cancelPayment', {
                                    txnId: $scope.initiatedData.txnId,
                                    status: 2 //user has aborted or transaction canceled
                                });
                                heap.track('Bolt Checkout Response User-Cancel', {
                                    event_id: $scope.event._id, 
                                    link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    total: $scope.totalAmount,
                                    txnid: $scope.initiatedData.txnId,
                                    hash: $scope.initiatedData.hash,
                                    status: status,
                                    txnStatus: txnStatus,
                                    txnMessage: txnMessage
                                });
                            }
                            else {
                                heap.track('Bolt Checkout Validate Response Initiated', {
                                    event_id: $scope.event._id, 
                                    link: $routeParams.orgName + '/' + $routeParams.eventName,
                                    total: $scope.totalAmount,
                                    txnid: $scope.initiatedData.txnId,
                                    hash: $scope.initiatedData.hash,
                                    status: status,
                                    txnStatus: txnStatus,
                                    txnMessage: txnMessage
                                });
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
                                            heap.track('Bolt Checkout Response-HashNotValidated', {
                                                event_id: $scope.event._id, 
                                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                                total: $scope.totalAmount,
                                                txnid: $scope.initiatedData.txnId,
                                                hash: $scope.initiatedData.hash,
                                                status: status,
                                                txnStatus: txnStatus,
                                                txnMessage: txnMessage
                                            });
                                            
                                            $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + "FAIL", {});

                                        }
                                        else if (validateResponse.data.data.status == true && (txnStatus == "SUCCESS" || txnStatus == "FAIL")) {
                                            heap.track('Bolt Checkout Response-HashValidated', {
                                                event_id: $scope.event._id, 
                                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                                total: $scope.totalAmount,
                                                txnid: $scope.initiatedData.txnId,
                                                hash: $scope.initiatedData.hash,
                                                status: status,
                                                txnStatus: txnStatus,
                                                txnMessage: txnMessage
                                            });
                                            $location.path('/' + $routeParams.orgName + '/' + $routeParams.eventName + '/payment-success/t/' + response.response.txnid + '/a/' + response.response.amount + '/tst/' + txnStatus, {});
                                        }
                                        else if (validateResponse.data.data.status == true && txnStatus == "CANCEL") {
                                            heap.track('Bolt Checkout Response-HashValidatedCancel', {
                                                event_id: $scope.event._id, 
                                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                                total: $scope.totalAmount,
                                                txnid: $scope.initiatedData.txnId,
                                                hash: $scope.initiatedData.hash,
                                                status: status,
                                                txnStatus: txnStatus,
                                                txnMessage: txnMessage
                                            });
                                            $http.post(festConfig.baseUrl + 'cancelPayment', {
                                                txnId: response.response.txnid,
                                                status: 2 //user has aborted or transaction canceled
                                            })

                                        }
                                        else {
                                            console.log("errorElseConditions");
                                            console.log(false);
                                            heap.track('Bolt Checkout Response-HashValidatedNoConditions', {
                                                event_id: $scope.event._id, 
                                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                                total: $scope.totalAmount,
                                                txnid: $scope.initiatedData.txnId,
                                                hash: $scope.initiatedData.hash,
                                                status: status,
                                                txnStatus: txnStatus,
                                                txnMessage: txnMessage
                                            });
                                            $http.post(festConfig.baseUrl + 'cancelPayment', {
                                                txnId: response.response.txnid,
                                                status: 5 //app error no conditions match
                                            })
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("errorCatch");
                                        console.log(error);
                                        heap.track('Bolt Checkout Response-ValidateCatch', {
                                            event_id: $scope.event._id, 
                                            link: $routeParams.orgName + '/' + $routeParams.eventName,
                                            total: $scope.totalAmount,
                                            txnid: $scope.initiatedData.txnId,
                                            hash: $scope.initiatedData.hash,
                                            status: status,
                                            txnStatus: txnStatus,
                                            error: error.message,
                                            txnMessage: txnMessage
                                        });
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
                            heap.track('Bolt Checkout-Catch', {
                                event_id: $scope.event._id, 
                                link: $routeParams.orgName + '/' + $routeParams.eventName,
                                total: $scope.totalAmount,
                                txnid: $scope.initiatedData.txnId,
                                hash: $scope.initiatedData.hash,
                                error: JSON.stringify(response, null, 4)
                            });
                            $http.post(festConfig.baseUrl + 'cancelPayment', {
                                txnId: $scope.initiatedData.txnId,
                                status: 5 //app error no conditions match
                            })
                        }
                    });
            }
            catch (error) {
                heap.track('Bolt Checkout-TryCatch', {
                    event_id: $scope.event._id, 
                    link: $routeParams.orgName + '/' + $routeParams.eventName,
                    total: $scope.totalAmount,
                    txnid: $scope.initiatedData.txnId,
                    hash: $scope.initiatedData.hash,
                    error: JSON.stringify(error, null, 4)
                });
                console.log("errorCatched");
                console.log(error);
                $http.post(festConfig.baseUrl + 'cancelPayment', {
                    txnId: txnId,
                    status: 5 //app error no conditions match
                })
            }

        };
        $scope.initiatedData = null;
        $scope.initiatePayment = function () {
            $scope.initiatedData = {};
            var selectedEntryType = [];
            var itemString = '';
            $scope.event.entryType.forEach((entryType, index) => {
                if (entryType.quantity > 0) {
                    selectedEntryType.push(entryType);
                    itemString = itemString + "Item" + index + "-" + entryType.title + '/price:' + entryType.price + '/quantity' + entryType.quantity + ','
                }
            });
            if($routeParams.preview && $routeParams.preview == 'preview'){
                alert("Not available in preview mode!");
                return;
            
            }
            if(selectedEntryType.length <= 0 || $scope.totalAmount <=0 ){
                alert("Please add entries to checkout!");
                return;
            
            }
            if(!$scope.user){
                alert("Please fill all details to checkout!");
                return;
            }
            else if(!$scope.user.firstname || !$scope.user.lastname || !$scope.user.mobile || !$scope.user.email){
                alert("Please fill all details to checkout!");
                return;
            }
            if($scope.event.isAddressRequired){
                if(!$scope.user.address){
                    alert("Please fill all details to checkout!");
                    return;
                }
            }
            heap.identify($scope.user.email);
            heap.addUserProperties({
                'First Name': $scope.user.firstname,
                'Last Name': $scope.user.lastname,
                'email': $scope.user.email,
                'mobile': $scope.user.mobile
            });
            heap.track('Initiated Payment', {
                event_id: $scope.event._id, 
                link: $routeParams.orgName + '/' + $routeParams.eventName,
                items: itemString,
                total: $scope.totalAmount
            });
            $http.post(festConfig.baseUrl + 'initiatePayment', {
                //Send Client DAta
                //clientData

                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                mobile: $scope.user.mobile,
                email: $scope.user.email,
                address: $scope.user.address,
                eventId: $scope.event._id,
                entryTypes: selectedEntryType,
                totalAmount: parseFloat($scope.totalAmount),
                referer: $routeParams.source
            })
                .then(function (response) {
                    console.log(response.data);
                    $scope.initiatedData = {
                        hash: response.data.data.hash, 
                        txnId: response.data.data.txnId, 
                        productInfo: response.data.data.transactionId
                    };
                    $scope.checkout();
                })
                .catch(function (error) {
                    console.log(error);
                    heap.track('Initiated Payment Error Catch', {
                        event_id: $scope.event._id, 
                        link: $routeParams.orgName + '/' + $routeParams.eventName,
                        items: itemString,
                        total: $scope.totalAmount,
                        error: error.message
                    });
                })
        };

    })
    .controller('eventPaymentCtrl', function (festConfig, $scope, $http, $rootScope, $location, $routeParams, edes) {
        $scope.event = edes.data;
        $scope.tid = $routeParams.tid;
        $scope.amount = $routeParams.amount;
        $scope.tstatus = $routeParams.tstatus;

        if ($scope.tstatus == "SUCCESS") {
            $scope.tsuccess = true;
        }
        else if ($scope.tstatus == "FAIL") {
            $scope.tsuccess = false;
        }


    })
    .run(function (festConfig, $rootScope, $location) {
        $rootScope.$on("$routeChangeError", function (event, next, current) {
            heap.track('404 Error', {
                path: next.$$route.originalPath,
                eventName: next.params.eventName,
                orgName: next.params.orgName,
                source: next.params.source,
                preview: next.params.preview,
            });
            if($rootScope.forbidden == true){
                $rootScope.forbidden = false;
                $location.path("/403");
            }
            else if(next.$$route.originalPath == "/:orgName/:eventName/s/:source?" && next.params.eventName && next.params.orgName && !next.params.source){
                $location.path('/'+ next.params.orgName +'/' + next.params.eventName);
            }
            else if(next.$$route.originalPath == "/:orgName/:eventName/:preview?" && next.params.eventName && next.params.orgName && next.params.preview && next.params.preview != 'preview'){
                $location.path('/'+ next.params.orgName +'/' + next.params.eventName);
            }
            else{
                $location.path("/404");
            }
        });
    })
    .config(['festConfig', '$routeProvider', '$locationProvider', 
        function config(festConfig, $routeProvider, $locationProvider) {
            // configure html5 to get links working on jsfiddle
            // $locationProvider.html5Mode(true);
            // $locationProvider.hashPrefix('!');
            $routeProvider
                .when('/:orgName/:eventName/:preview?', {
                    templateUrl: 'partials/event.html',
                    controller: 'eventCtrl',
                    resolve: {
                        edes: function ($http, $route) {
                            if($route.current.params.preview == 'preview'){
                                var link = encodeURI($route.current.params.orgName + '/' + $route.current.params.eventName);
                                
                                link = festConfig.baseUrl + 'eventLink?l=' + link + '&preview=true';

                            }
                            else{
                                var link = encodeURI($route.current.params.orgName + '/' + $route.current.params.eventName);
                                
                                link = festConfig.baseUrl + 'eventLink?l=' + link;
                            }
                            return $http.get(link)
                                .then(function (response) {
                                    if($route.current.params.preview && $route.current.params.preview != 'preview'){
                                        throw Error('wrong preview parameter')
                                    }
                                    return response.data;
                                })
                                .catch(function (error) {
                                    if(error.message == 'wrong preview parameter'){
                                        $location.path('/'+ $route.current.params.orgName +'/' + $route.current.params.eventName);
                                    }
                                    heap.track('Event Get Error', {
                                        link: $route.current.params.orgName + '/' + $route.current.params.eventName,
                                        error: JSON.stringify(response)
                                    });
                                    $rootScope.forbidden = false;
                                    if (error.status == 403) {
                                        console.log("error");
                                        console.log(error);
                                        $rootScope.forbidden = true;
                                        $location.path('/404');
                                    }
                                    else if (error.status != 200) {
                                        console.log("error");
                                        console.log(error);
                                        $location.path('/404');
                                    }

                                })
                        }
                    }
                })
                .when('/:orgName/:eventName/s/:source?', {
                    templateUrl: 'partials/event.html',
                    controller: 'eventCtrl',
                    resolve: {
                        edes: function ($http, $route) {
                            var link = encodeURI($route.current.params.orgName + '/' + $route.current.params.eventName);
                            return $http.get(festConfig.baseUrl + 'eventLink?l=' + link)
                                .then(function (response) {
                                    if(!$route.current.params.source){
                                        throw Error('no source');
                                    }
                                    return response.data;
                                })
                                .catch(function (error) {
                                    heap.track('Event Get Error', {
                                        link: $route.current.params.orgName + '/' + $route.current.params.eventName,
                                        error: JSON.stringify(response)
                                    });
                                    console.log("error");
                                    console.log(error);
                                    if(error.message == 'no source'){
                                        $location.path('/'+ $route.current.params.orgName +'/' + $route.current.params.eventName);
                                    }
                                    if (error.status == 403) {
                                        console.log("error");
                                        console.log(error);
                                        $rootScope.forbidden = true;
                                        $location.path('/404');
                                    }
                                    else if (error.status != 200) {
                                        $location.path('/404');
                                    }

                                })
                        }
                    }
                })
                .when('/:orgName/:eventName/payment-success/t/:tid/a/:amount/tst/:tstatus', {
                    templateUrl: 'partials/payment-success.html',
                    controller: 'eventPaymentCtrl',
                    resolve: {
                        edes: function ($http, $route) {
                            var link = encodeURI($route.current.params.orgName + '/' + $route.current.params.eventName);
                            return $http.get(festConfig.baseUrl + 'eventLink?l=' + link)
                                .then(function (response) {
                                    return response.data;
                                })
                                .catch(function(response){
                                    heap.track('Event Get Error', {
                                        link: $route.current.params.orgName + '/' + $route.current.params.eventName,
                                        error: JSON.stringify(response)
                                    });
                                })
                        }
                    }
                })
                .when('/404', {
                    templateUrl: 'partials/404.html',
                    // controller: 'ChapterController',
                    // resolve: {
                    //     // I will cause a 1 second delay
                    //     delay: function ($q, $timeout) {
                    //         var delay = $q.defer();
                    //         $timeout(delay.resolve, 1000);
                    //         return delay.promise;
                    //     }
                    // }
                })
                .when('/403', {
                    templateUrl: 'partials/403.html',
                })
                .otherwise({
                    redirectTo: '/404'
                });


        }
    ]);