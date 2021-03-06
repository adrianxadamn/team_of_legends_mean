(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ["$log", "$http", "$state", "$location", "teamService", "authService", "$window"];

  function UserController($log, $http, $state, $location, teamService, authService, $window) {
    $log.info("UserController is in da house");

    var vm = this;
    vm.all = [];
    vm.teamService = teamService;
    vm.authService = authService;
    vm.toggleInfoValue = [];
    vm.toggleValue = true;

    var url = $location.url();
    var urlIgn = url.slice(18);
    $log.info('urlIgn:', urlIgn);

    vm.storeUserData = {};

    for (var i = 0; i < 99999; i++) {
      vm.toggleInfoValue[i] = true;
    };

    vm.toggleEdit = function() {
      vm.toggleValue = !vm.toggleValue;
      $log.info("vm.toggleValue:", vm.toggleValue);
    };

    vm.addTeamMember = function(data, team) {
      $log.info("user:", data);

      teamService
        .addTeamMember(data, team)
        .then(function(res) {
          $log.info("success:", res);
          $window.location.reload();
        });
    };

    vm.toggleInfo = function(num) {
      $log.info("num:", num);
      $log.info("vm.toggleInfoValue[num]:", vm.toggleInfoValue[num]);
      if (vm.toggleInfoValue[num] === true) {
        return vm.toggleInfoValue[num] = false;
      } else {
        return vm.toggleInfoValue[num] = true;
      };
    };

    function getUserInformation() {
      $http
        .get('/api/users/' +  urlIgn)
        .then(function(res) {
          vm.storeUserData = res.data;
          $log.info("vm.storeUserData:", vm.storeUserData);
        }, function(err) {
          $log.info(err);
        });
    }


    function getUsers() {
      $http
        .get('api/users')
        .then(function(res) {
          vm.all = res.data;
        }, function(err) {
          $log.info(err);
        });
    }

    getUserInformation();
    getUsers();


  }


})();
