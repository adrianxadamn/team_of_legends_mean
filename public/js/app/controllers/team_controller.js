(function() {
  'use strict';

  angular
    .module('app')
    .controller('TeamController', TeamController);

  TeamController.$inject = ["$log", "$state", "teamService", "$http", "$location"];

  function TeamController($log, $state, teamService, $http, $location) {
    $log.info("TeamController is in da house");

    var vm = this;
    vm.all = [];

    vm.storeTeamData = {};

    var url = $location.url();
    var urlTeamName = url.slice(18);
    $log.info('urlTeamName:', urlTeamName);

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

    function getTeamInformation() {
      $http
        .get('/api/teams/' + urlTeamName)
        .then(function(res) {
          vm.storeTeamData = res.data;
          $log.info("vm.storeTeamData:", vm.storeTeamData);
        }, function(err) {
          $log.info(err);
        });
    }

    function getTeams() {
      $http
        .get('/api/teams')
        .then(function(res) {
          vm.all = res.data;
          $log.info(vm.all);
        }, function(err) {
          $log.info(err);
        })
    }

    getTeams();
    getTeamInformation();

  }

})();
