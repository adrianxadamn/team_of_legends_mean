(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ["$log", "$http", "$state"];

  function UserController($log, $http, $state) {
    $log.info("UserController is in da house");

    var vm = this;
    vm.all = [];

    vm.toggleInfoValue = [];


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

    getUsers();


  }


})();
