"use strict";

angular.module('todo')
    .controller('homeCtrl', ['$scope', '$location', '$rootScope', 'ListService', function($scope, $location, $rootScope, ListService) {
      document.getElementById('todoTitle').focus();
      $scope.lists = ListService.getList();
      $scope.complete = 0;
      $scope.createList = function() {
        if ($scope.viewTitle) {
          $scope.lists[$scope.viewTitle] = [];
          $scope.viewTitle = '';
          ListService.saveList($scope.lists);
        }
        document.getElementById('todoTitle').focus();
      };
      $scope.gotoList = function(title) {
        $rootScope.home = 'home';
        $location.path('/list/' + title);
      };
      $scope.deleteList = function(title) {
        delete $scope.lists[title];
        ListService.saveList($scope.lists);
        $scope.complete -= 1;
      };
        $scope.completeList = function(title) {
            $scope.complete += 1;
            var element = document.getElementById('complete');
            element.parentNode.removeChild(element);
        };
    }]);
