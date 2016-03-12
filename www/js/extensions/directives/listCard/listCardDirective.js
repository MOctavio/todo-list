angular.module('todo-list.directives')
  .directive('listCard', [function() {
    return {
      scope: {
        tasks: '='
      },
      restrict: 'E',
      templateUrl: '/js/extensions/directives/listCard/_listCardTemplate.html',
      controller: ['$scope', function($scope) {

      }],
      controllerAs: 'listCardCtr',
      link: function($scope, element, attrs, controller) {}
    };
  }]);
