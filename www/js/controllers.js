angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, AuthService, $ionicPopup) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //})

        // Form data for the login modal
        $scope.loginData = {};
        $scope.registerData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loginModal = modal;
        });


        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.loginModal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function (loginData) {
            AuthService.login(loginData).then(function () {
                $scope.closeLogin();
            }, function (error) {
                // show alert
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: error
                });

                alertPopup.then(function (res) {
                });
            });
        };

        $scope.openRegisterModal = function () {
            $scope.registerModal.show();
        };

        $scope.closeRegisterModal = function () {
            $scope.registerModal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.registerModal = modal;
        });


        $scope.register = function () {
            $scope.registerModal.show();
        };


        $scope.doRegistration = function () {
            AuthService.register($scope.registerData).then(
                function () {
                    $scope.closeRegisterModal();
                }
                , function (error) {
                    // show alert
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: error
                    });

                    alertPopup.then(function (res) {
                    });

                });

            $scope.logout = function () {
                AuthService.logout();
            }

        }
    })

    .controller('LoginCtrl', function(){})

    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })

    .controller('MoodsCtrl', function($scope, MoodsRef, $firebaseArray, AuthService){
        $scope.moods = new $firebaseArray(MoodsRef);

        $scope.addMood = function() {
            var content = prompt("What mood you want to add?");
            if (content) {
                $scope.moods.$add({
                    content: content,
                    created: Firebase.ServerValue.TIMESTAMP,
                    createdBy: AuthService.auth.email
                });
            }
        };

        $scope.deleteMood = function(mood){
            $scope.moods.$remove(mood)
        }

    })

    .controller('UsersCtrl', function($scope, UsersRef, $firebaseArray) {
        $scope.users = new $firebaseArray(UsersRef);
    });




