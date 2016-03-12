angular.module('todo-list.controllers')
  .controller('TaskController', ['$scope', '$ionicModal', 'localStorageService', function($scope, $ionicModal, localStorageService) {
    var taskData = 'task';
    $scope.task = {};
    $scope.tasks = [];

    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.newTaskModal = modal;
    });

    $scope.openTaskModal = function() {
      $scope.newTaskModal.show();
    };

    $scope.closeTaskModal = function() {
      $scope.newTaskModal.hide();
    };

    $scope.getTasks = function() {
      if (localStorageService.get(taskData)) {
        $scope.tasks = localStorageService.get(taskData);
      } else {
        $scope.tasks = [];
      }
    };
    $scope.createTask = function() {
      $scope.tasks.push($scope.task);
      localStorageService.set(taskData, $scope.tasks);
      $scope.task = {};
      //close new task modal
      $scope.newTaskModal.hide();
    };
    $scope.removeTask = function(index) {
      $scope.tasks.splice(index, 1);
      localStorageService.set(taskData, $scope.tasks);
    };
    $scope.completeTask = function(index) {
      if (index !== -1) {
        $scope.tasks[index].completed = true;
      }
      localStorageService.set(taskData, $scope.tasks);
    };
  }]);
