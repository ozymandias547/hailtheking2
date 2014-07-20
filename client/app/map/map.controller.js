'use strict';

angular.module('hailTheKing2App')
  .controller('MapCtrl', ['$scope', 'Map', function ($scope, Map) {
   	

   	Map.initializeMap();
  

}]);