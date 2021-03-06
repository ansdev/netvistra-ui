define([
  'angular'
],
function (angular) {
  'use strict';

  var module = angular.module('kibana.controllers');

  module.controller('notifications', function($scope) {
    $scope.notifications = [];
    $scope.acknowledge = function(index) {
      $scope.notifications.splice(index, 1);
    };
  });
});
