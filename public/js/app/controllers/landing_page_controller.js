(function() {
  'use strict';

  angular
    .module("app")
    .controller("LandingPageController", LandingPageController)

  LandingPageController.$inject = ["$log", "$state"];

  function LandingPageController($log, $state) {
    $log.info("LandingPageController is in da house");

    var vm = this;

    vm.enter = function() {
      $state.go("signin");
    }

  }

})();
