'use strict';

angular.module('hailTheKing2App')
	.controller('MainCtrl', ['$scope', '$http', 'socket',
		function($scope, $http, socket) {

			// Create view models for the newsfeed and the topkings section
			$scope.newsItems = [];
			$scope.userFeed = [];

			// Get the newest news feed
			$http.get('/api/newsfeed').success(function(newsItems) {
				$scope.newsItems = newsItems;
			});

			// Get the newest user feed and subscribe via sockets for a realtime leaderboard.
			$http.get('/api/userfeed').success(function(userFeed) {
				$scope.userFeed = userFeed;
				socket.syncUpdates('userfeed', $scope.userFeed);
			});

			$scope.$on('$destroy', function() {
				socket.unsyncUpdates('userfeed');
			});
			
		}
	]);