(function() {
  'use strict';

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, tokenService, $http) {
    $log.info("auth service is in da house")

    var service = {
      logIn: logIn
      // isLoggedIn: isLoggedIn,
      // logout: logout,
      // currentUser: currentUser,
      // refreshToken: refreshToken
    }

    return service;

    function logIn(data) {

      var promise = $http({
        method: 'POST',
        url: '/api/token',
        data: data
      })
      .then(
        function(res) {
          $log.info("success:", res);
          // $log.info("your token is: ", res.data.token);
          tokenService.store(res.data.token);
          // $log.info("Success:", tokenService.decode());
          // tokenService.destroy();
          return tokenService.decode();
        },
        function(err) {
          $log.info(err);
        }
      );
      return promise;


    };


  }



})();
