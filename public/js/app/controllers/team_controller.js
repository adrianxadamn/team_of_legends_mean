(function() {
  'use strict';

  angular
    .module('app')
    .controller('TeamController', TeamController);

  TeamController.$inject = ["$log", "$state", "teamService", "$http", "$location", "authService", "$window"];

  function TeamController($log, $state, teamService, $http, $location, authService, $window) {
    $log.info("TeamController is in da house");

    var vm = this;
    vm.all = [];
    vm.members = [];

    vm.storeTeamData = {};
    vm.teamService = teamService;
    vm.authService = authService;

    var url = $location.url();
    var urlTeamName = url.slice(18);
    $log.info('urlTeamName:', urlTeamName);

    vm.submitTeam = function(data) {
      $log.info("team:", vm.createTeam);

      teamService
        .create(vm.createTeam).then(
          function(response) {
            $log.info("response:", response);
          })
          .then(function() {
            return authService.refreshToken();
          })
          .then(function(newDecodedToken) {
            $log.info('User updated and token refreshed:', newDecodedToken);
            $state.go('team-list');
          });
    };


    vm.joinTeam = function(data, team) {
      $log.info("user:", data);

      teamService
        .addTeamMember(data, team)
        .then(function(res) {
          $log.info("success:", res);
        })
        .then(function() {
          return authService.refreshToken();
        })
        .then(function(newDecodedToken) {
          $log.info('Team updated and token refreshed:', newDecodedToken);
          $window.location.reload();
        })
        .catch(function(err) {
          $log.info('Error:', err);
        });
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
        });
    }

    // function getTeamMembers() {
    //   $http
    //     .get('/api/teams' + urlTeamName);
    //     .then(function(res) {
    //       vm.members = res.data;
    //       $log.info('vm.members:', vm.members);
    //     }, function(err) {
    //       $log.info(err);
    //     });
    // }

    getTeams();
    getTeamInformation();
    // getTeamMembers();

  }

})();
