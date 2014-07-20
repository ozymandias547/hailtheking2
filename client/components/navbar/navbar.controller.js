'use strict';

angular.module('hailTheKing2App')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      loginOnly: false
    },
    {
      'title': 'Towns',
      'link': '/town',
      loginOnly: true
    },
    {
      'title': 'Map',
      'link': '/map',
      loginOnly: true
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });