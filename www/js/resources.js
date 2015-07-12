angular.module("starter")
    .factory("Auth", function($firebaseAuth) {
        var usersRef = new Firebase("https://scorching-inferno-7420.firebaseio.com/users");
        return $firebaseAuth(usersRef);
    })
    .factory('Ref', function(DB){
        return new Firebase(DB.REF);
    })

    .factory("UsersRef", function(DB){
        return new Firebase(DB.REF + DB.USERS);
    })

    .factory("Users", function($firebaseArray, DB){
        var usersRef = new Firebase(DB + DB.USERS);
        return $firebaseArray(usersRef);
    });