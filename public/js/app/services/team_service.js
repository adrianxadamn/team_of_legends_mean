(function() {
  'use strict';

  angular
    .module('app')
    .factory('teamService', teamService);

  teamService.$inject = ["$log", "$http"];

  function teamService($log, $http) {
    $log.info('teamService is in da house');

    var service = {
      create: create,
      addTeamMember: addTeamMember
    };

    return service;

    function create(data) {
      $log.info('team data:', data);

      var promise = $http({
        method: 'POST',
        url: '/api/teams',
        data: data
      })
      .then(function(res) {
          $log.info("success");
          return res;
      });
      return promise;
    }

    function addTeamMember(data, team) {
      $log.info("user data:", data);
      var array = [data, team];

      var promise = $http({
        method: 'PUT',
        url: '/api/teams/' + team,
        data: array
      })
      .then(function(res) {
        $log.info("success");
      });
      return promise;
    }

  }

})();
