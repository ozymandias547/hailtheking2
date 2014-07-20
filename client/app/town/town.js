'use strict';

angular.module('hailTheKing2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('town', {
        url: '/town',
        templateUrl: 'app/town/town.html',
        controller: 'TownCtrl'
      });
  });