(function() {
  "use strict";

  angular
    .module("app")
    .factory("tokenSigningService", tokenSigningService);

  tokenSigningService.$inject = ["$log", "tokenService"];

  function tokenSigningService($log, tokenService) {
    return {
      request: signWithToken
    };

    function signWithToken(request) {
      if (tokenService.retrieve()) {
        // $log.info("Token exists; signing request.");
        request.headers['Authorization'] = `Bearer ${tokenService.retrieve()}`;
      }

      return request;
    }
  }

})();
