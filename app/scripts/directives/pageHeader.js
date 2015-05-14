'use strict';

angular.module('ncaabbRankSiteApp')
    .directive('pageHeader', ['$location', function(location) {
        return {
            restrict: 'E',
            templateUrl: '/views/page-header.html',
            controller: ['$scope', '$filter', function($scope) {
                $scope.getActiveClass = function(cls) {
                    return (cls === location.path()) ? 'active' : '';
                };
            }]
        };
    }]);