(function() {
  'use strict';

  angular
    .module('app')
    .factory('teamService', teamService);

  teamService.$inject = ["$log", "$http"];

  function teamService($log, $http) {
    $log.info('teamService is in da house');

    var service = {
      create: create
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

  }

})();
