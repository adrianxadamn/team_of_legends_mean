(function() {
  'use strict';

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, tokenService, $http) {
    $log.info("auth service is in da house")

    var service = {
      logIn: logIn,
      isLoggedIn: isLoggedIn,
      logOut: logOut,
      currentUser: currentUser,
      refreshToken: refreshToken
    };

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
          tokenService.store(res.data.token);
          return tokenService.decode();
        },
        function(err) {
          $log.info(err);
        }
      );
      return promise;
    }

    function isLoggedIn() {
      return (tokenService.retrieve() != null);
    }

    function logOut() {
      tokenService.destroy();
    }

    function currentUser() {
      var tokenData = tokenService.decode();
       if (tokenData) {
        // No real reason to do this, just showing you
        // how it can be done. We can clean out (remove)
        // properties from the token that are about the token
        // itself, not the user; this cleans up the data.
        tokenData.expiresAt = Date(tokenData.exp);
        delete tokenData.exp;
        delete tokenData.iat;
      };
       return tokenData;
    }

    function refreshToken() {

      var promise = $http({
        method: 'POST',
        url:    '/api/users/me/token'
      })
      .then(function(res) {
        tokenService.store(res.data.token);
        return tokenService.decode();
      });
      return promise;
    }

  };



})();
