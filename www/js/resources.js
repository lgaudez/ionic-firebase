angular.module("starter")
    .factory("Auth", function($firebaseAuth, DB) {
        var usersRef = new Firebase(DB);
        return $firebaseAuth(usersRef);
    })
    .factory('Ref', function(DB){
        return new Firebase(DB.REF);
    })

    .factory("UsersRef", function(DB){
        return new Firebase(DB.REF + DB.USERS);
    })

    .factory("MoodsRef", function($firebaseArray, DB){
        return new Firebase(DB.REF + DB.MOODS);
    });