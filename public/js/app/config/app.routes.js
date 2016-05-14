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
      templateUrl: "/js/app/layouts/home.html",
      controller: "MainController",
      controllerAs: "vm"
    })
    .state("signin", {
      url: "/signin",
      templateUrl: "/js/app/login/signin.html",
      controller: "LoginController",
      controllerAs: "vm"
    })
    .state('user-list', {
      url: "/users",
      templateUrl: "/js/app/layouts/users.html",
      controller: "MainController",
      controllerAs: "vm"
    })
    .state('user-profile', {
      url: '/profile?username',
      templateUrl: '/js/app/layouts/user_profile.html',
      controller: "MainController",
      controllerAs: "vm"
    })
    .state('edit-profile', {
      url: '/edit_profile?username',
      templateUrl: '/js/app/layouts/edit_profile.html',
      controller: "MainController",
      controllerAs: "vm"
    })
    .state('create-team', {
      url: '/new_team',
      templateUrl: '/js/app/layouts/new_team.html',
      controller: "MainController",
      controllerAs: "vm"
    })
    .state('team-list', {
      url: '/teams',
      templateUrl: 'js/app/layouts/teams.html',
      controller: "MainController",
      controllerAs: "vm"
    });

  $urlRouterProvider.otherwise("/");
  }

  angular
    .module("app")
    .run(authorizeRoutes); // Register the following function to run
                           // AFTER the above configuration.

  // $state and authService you know. $rootScope is different. It's
  // the shared "scoping" object which is inherited by all bindings
  // ($scope or vm) anywhere in the app. If you add something to
  // $rootScope, it's like adding it to EVERY "vm" (view-model, ie
  // template-controller binding), directive, filter, etc. in the app.
  authorizeRoutes.$inject = ["$state", "authService", "$rootScope"];

  function authorizeRoutes($state, authService, $rootScope) {

    // $on is the Angular event listener: we are telling Angular to
    // listen to any $stateChangeStart events triggered in our app!
    $rootScope.$on("$stateChangeStart", function(event, toState) {

      // Check the new state's "authorized" property, which is not built
      // in to ui-router, it just happens to match the property I added
      // to the state definition on line #25 above!
      if (toState.authorized && !authService.isLoggedIn()) {
        $state.go("signin");    // Go here immediately, and
        event.preventDefault(); // do not let the event continue.
      }
    });
  }


})();
