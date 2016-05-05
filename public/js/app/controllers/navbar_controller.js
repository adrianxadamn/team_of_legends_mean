(function(){
  'use strict';

  angular
    .module("app")
    .controller("NavBarController", NavBarController);

  NavBarController.$inject = ["$log", "authService"];

  function NavBarController($log, authService) {
    $log.info("NavBarController is in da house!");

    var vm = this;

    vm.authService = authService;

  }

})();
