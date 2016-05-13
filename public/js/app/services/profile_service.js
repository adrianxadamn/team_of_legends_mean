(function() {
  'use strict';


  angular
    .module('app')
    .factory('profileService', profileService);

  profileService.$inject = ["$log", "$http"];

  function profileService($log, $http) {
    $log.info("profileService is in da house");

    var service = {
      get: get
    }

    return service;


    function get(userIgn) {
      var promise = $http({
        method: 'GET',
        url: '/api/users/' + userIgn
      })
      return promise;
    }

  }

})();
