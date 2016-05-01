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
      templateUrl: "/js/app/layouts/landing_page.html",
      controller: "LandingPageController",
      controllerAs: "vm"
    })
    .state("home", {
      url: "/home",
      templateUrl: "/js/app/home/home.html"
    })
    .state("signin", {
      url: "/signin",
      templateUrl: "/js/app/login/signin.html"
    });

  $urlRouterProvider.otherwise("/");
  }

})();
