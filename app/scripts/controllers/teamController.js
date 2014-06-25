'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('teamController', function($scope, $http, $routeParams) {

        /* For now, we're just going to get the rankings data over again */
        $http.get('data/rankings/alldata.json').success(function(data) {
            var teams = data.filter(function(fteam) {
                return fteam.name === $routeParams.name;
            });

            $scope.team = teams[0];
        });

        $http.get('data/schedules/scheduledata.json').success(function(data) {
            var scheduleTeams = data.filter(function(fteam) {
                return fteam.name === $routeParams.name;
            });

            $scope.contests = scheduleTeams[0].schedule;
        });

        $scope.getBMPercentBrackets = function(totalBrackets) {
            var percentage = 0;
            if (totalBrackets > 0) {
                percentage = parseFloat((totalBrackets / 121) * 100).toFixed(2).replace(/\.?0+$/, '');
            }
            return percentage + '%';
        };

        $scope.shadeByOutcomeClass = function(outcome) {
            switch (outcome) {
                case 'W':
                    return 'highlight-win';
                case 'L':
                    return 'highlight-loss';
                default:
                    return '';
            }

        };

        $scope.getQuality = function(contest) {
            if (contest.outcome === 'W') {
                if (contest.rpi <= 50) {
                    if (contest.location === 'A') {
                        return 'TOP50 ROAD';
                    } else {
                        return 'TOP50';
                    }
                } else if (contest.rpi <= 100 && contest.rpi > 50) {
                    if (contest.location === 'A') {
                        return 'TOP100 ROAD';
                    } else {
                        return 'TOP100';
                    }
                }
            } else {
                if (contest.rpi >= 300) {
                    if (contest.location === 'H') {
                        return '300+ HOME';
                    } else {
                        return '300+';
                    }
                } else if (contest.rpi >= 200 && contest.rpi < 300) {
                    if (contest.location === 'H') {
                        return '200+ HOME';
                    } else {
                        return '200+';
                    }
                }
            }
        };
    });