(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ["$log", "$state", "authService"];

  function MainController($log, $state, authService) {
    $log.info("MainController is in da house");

    var vm = this;
    vm.authService = authService;

  };


})();
