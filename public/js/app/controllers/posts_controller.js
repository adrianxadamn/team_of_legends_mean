(function() {
  'use strict';

  angular
    .module('app')
    .controller('PostController', PostController);

  PostController.$inject = ["$log", "authService", "postService", "$http"];

  function PostController($log, authService, postService, $http) {
    $log.info("PostController is in da house");

    var vm = this;
    vm.all = [];
    vm.authService = authService;

    vm.submitPost = function(data) {
      $log.info("post:", vm.createPost);
      $log.info("data:", data);

      postService
        .create(vm.createPost);

    };

    function getAllPosts() {
      $http
        .get('/api/posts')
        .then(function(res) {
          vm.all = res.data;
        }, function(err) {
          $log.info(err);
        });
    }

    getAllPosts();






  }

})();
