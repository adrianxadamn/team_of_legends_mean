(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ["$log", "$state", "authService"];

  function HomeController($log, $state, authService) {
    $log.info("HomeController is in da house");

    var vm = this;
    vm.authService = authService;

  };


})();
