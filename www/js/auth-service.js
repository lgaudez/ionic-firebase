angular.module('starter')
    .service('AuthService', function(Ref, UsersRef, $q, $rootScope){
    var self = this;

    self.getAuth = function(){

        var deferred = $q.defer();

        if(self.auth) {
            deferred.resolve(self.auth);
        } else {
            var auth = Ref.getAuth();

            // if connected
            if(auth){
                console.log("connected")
                // retrieve user from db
                UsersRef.child(auth.uid).once('value', function(snap) {
                    $rootScope.auth = snap.val();
                    deferred.resolve(self.auth = snap.val());
                });

            } else {
                // else user not connected return null
                deferred.reject("Not connected");
            }
        }

        return deferred.promise;

    };

    self.logout = function(){
        Ref.unauth();
        $rootScope.auth = null;
    };

    self.login = function(loginData){

        var deferred = $q.defer();

        Ref.authWithPassword(loginData
            , function(error, authData) {
                if (error) {
                    deferred.reject(error);
                } else {
                    self.getAuth();
                    deferred.resolve(authData);
                }
            });

        return deferred.promise;
    };

    self.register = function(registerData){

        var deferred = $q.defer();

        Ref.createUser({email: registerData.email, password: registerData.password}, function(error, userData) {
            if (error) {
                deferred.reject(error);
            } else {

                var user = {
                    uid: userData.uid,
                    email : registerData.email,
                    firstname : registerData.firstname,
                    created : new Date()
                };

                ////Store user in db
                UsersRef.child(user.uid).set(user);

                // connect automaticlaly user
                self.login({email : registerData.email, password: registerData.password});

                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    return self;

});