(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ["$log", "authService", "userService", "$state",
                               "tokenService", "$location", "profileService", "$http" ];

  function ProfileController($log, authService, userService, $state, tokenService, $location, profileService, $http) {
    $log.info('ProfileController is in da house');

    var vm = this;
    vm.authService = authService;
    vm.toggleValue = true;

    vm.newProfileData = {
      primary_role: authService.currentUser().primary_role,
      transportation: "",
      location: "",
      email: authService.currentUser().email,
      description: ""
    };

    vm.toggleEdit = function() {
      $log.info("hi");
      vm.toggleValue = !vm.toggleValue;
      $log.info("vm.toggleValue:", vm.toggleValue);
    };

    vm.submitUpdate = function() {
      $log.info("data:", vm.newProfileData);

      userService
        .update(vm.newProfileData)
        .then(function(res) {
          $log.info("Updated!:", res);

          // vm.formData.password = '';
          // vm.formData.passwordConfirmation = '';
        })
        .then(function() {
          return authService.refreshToken();
        })
        .then(function(newDecodedToken) {
          $log.info('User updated and token refreshed:', newDecodedToken);
        })
        .catch(function(err) {
          $log.info('Error:', err);
        });
    };


  }


})();
