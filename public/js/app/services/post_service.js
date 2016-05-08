(function() {
  'use strict';

  angular
    .module('app')
    .factory('postService', postService);

  postService.$inject = ["$log", "$http"];

  function postService($log, $http) {
    $log.info("postService is in da house");

    var service = {
      create: create
    };

    return service;

    function create(data) {
      $log.info("post data:", data);

      var promise = $http({
        method: 'POST',
        url: '/api/posts',
        data: data
      })
      .then(
        function(res) {
          $log.info("success");
          return res;
        }
      );
      return promise;
    }

  }

})();
