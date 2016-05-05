(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ["$log", "userService", "$state", "$http", "authService"];

  function LoginController($log, userService, $state, $http, authService) {
    $log.info("LoginController is in da house!")
    var vm = this;


    //Step 1. Create a User
    ////creates a new User into the database
    vm.signUp = function() {
      $log.info("trying to create user..");
      $log.info("current user data trying to create:", vm.createUser);

      //Step 2. Create User through UserService
      userService
        .create(vm.createUser).then(
          function() {
            $state.go("home");
            $log.info("cool");
          },
          function(err) {
            if (err.status === 409) {
              $log.info(err);
            } else if (err.status == 422 || err.status === 400) {
              $log.info(err);
            }
          }
        );
    };


    //Logs in an already created user from the database
    vm.LogIn = function() {
      if (vm.currentLogInInfo.email === undefined ||
          vm.currentLogInInfo.password === undefined) {
            //insert conflict toggle here;

      } else {

      $log.info("Logging in:", vm.currentLogInInfo);

      authService
        .logIn(vm.currentLogInInfo)
        .then(
            function(decodedToken) {
              // $state.go("home");
              $log.info("good shit");
            },
            function(err) {
              $log.info("err:", err);
            }
        );

      }
    };

  };

})();
