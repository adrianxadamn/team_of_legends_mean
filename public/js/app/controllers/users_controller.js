(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ["$log", "$http", "$state", "profileService", "$location"];

  function UserController($log, $http, $state, profileService, $location) {
    $log.info("UserController is in da house");

    var vm = this;
    vm.all = [];

    vm.toggleInfoValue = [];

    var url = $location.url();
    var urlIgn = url.slice(18);
    $log.info('urlIgn:', urlIgn);

    vm.storeUserData = {};

    for (var i = 0; i < 99999; i++) {
      vm.toggleInfoValue[i] = true;
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
