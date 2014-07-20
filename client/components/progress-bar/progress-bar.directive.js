'use strict';

/**
 * A small progress bar that fills a color up
 */
angular.module('hailTheKing2App')
  .directive('progressBar', function () {
    return {
      restrict: 'E',
      template: "<span>mastery progress bar</span>"
    };
  });