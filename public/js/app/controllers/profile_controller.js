(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ["$log", "authService", "userService", "$state", "tokenService"];

  function ProfileController($log, authService, userService, $state, tokenService) {
    $log.info('ProfileController is in da house');

    var vm = this;
    vm.authService = authService;
    vm.toggleValue = true;

    vm.editProfile = function(data, userId) {
      $log.info("hi");
      vm.toggleValue = !vm.toggleValue;
      $log.info("vm.toggleValue:", vm.toggleValue);



    };

  }


})();
