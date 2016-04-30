(function() {
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

  appRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];
  function appRoutes($stateProvider, $urlRouterProvider) {



  $stateProvider
    .state("landing_page", {
      url: "/",
      templateUrl: "/js/app/layouts/landing_page.html"
    });

  $urlRouterProvider.otherwise("/");
  }

})();
