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
      //creates a new User into the database
    vm.signUp = function() {
      $log.info("trying to create user..");
      $log.info("current user data trying to create:", vm.createUser);

    }

  };

})();
