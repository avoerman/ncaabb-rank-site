'use strict';

angular.module('ncaabbRankSiteApp')
    .directive('opponentquality', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                contest: '='
            },
            template: '<span>{{quality}}</span>',
            controller: function($scope) {
                var contest = $scope.contest;
                if (contest.outcome === 'W') {
                    if (contest.rpi <= 50) {
                        if (contest.location === 'A') {
                            $scope.quality = 'TOP50 ROAD';
                        } else {
                            $scope.quality = 'TOP50';
                        }
                    } else if (contest.rpi <= 100 && contest.rpi > 50) {
                        if (contest.location === 'A') {
                            $scope.quality = 'TOP100 ROAD';
                        } else {
                            $scope.quality = 'TOP100';
                        }
                    }
                } else if (contest.outcome === 'L') {
                    if (contest.rpi >= 300) {
                        if (contest.location === 'H') {
                            $scope.quality = '300+ HOME';
                        } else {
                            $scope.quality = '300+';
                        }
                    } else if (contest.rpi >= 200 && contest.rpi < 300) {
                        if (contest.location === 'H') {
                            $scope.quality = '200+ HOME';
                        } else {
                            $scope.quality = '200+';
                        }
                    }
                }
            }
        };
    });