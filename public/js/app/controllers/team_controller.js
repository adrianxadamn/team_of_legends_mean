(function() {
  'use strict';

  angular
    .module('app')
    .controller('TeamController', TeamController);

  TeamController.$inject = ["$log", "$state", "teamService"];

  function TeamController($log, $state, teamService) {
    $log.info("TeamController is in da house");

    var vm = this;
    vm.all = [];

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

    }


  }

})();
