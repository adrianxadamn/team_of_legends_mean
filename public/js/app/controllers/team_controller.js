(function() {
  'use strict';

  angular
    .module('app')
    .controller('TeamController', TeamController);

  TeamController.$inject = ["$log", "$state", "teamService", "$http"];

  function TeamController($log, $state, teamService, $http) {
    $log.info("TeamController is in da house");

    var vm = this;
    vm.all = [];

    vm.submitTeam = function(data) {
      $log.info("team:", vm.createTeam);

      teamService
        .create(vm.createTeam).then(
          function(response) {
            $log.info("response:", response);
            $state.go('team-list');
          },
          function(err) {
            $log.info(err);
          })

    };

    function getAllTeams() {
      $http
        .get('/api/teams')
        .then(function(res) {
          vm.all = res.data;
          $log.info(vm.all);
        }, function(err) {
          $log.info(err);
        })
    }

    getAllTeams();

  }

})();
