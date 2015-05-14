'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('compareController', function($scope, $http) {
        $scope.title = 'Compare Teams';

        $scope.team = null;
        $scope.team2 = null;
        $scope.teams = [];

        $http.get('data/rankings/alldata.json').success(function(data) {
            $scope.teams = data;
        });

        $http.get('data/schedules/scheduledata.json').success(function(data) {
            $scope.scheduleData = data;
        });

        $scope.compareTeamChange = function(team, bindTo) {
            var scheduleTeams = $scope.scheduleData.filter(function(fteam) {
                return fteam.name === team.name;
            });

            var scheduleData = scheduleTeams[0].schedule;

            if (bindTo === 1) {
                $scope.contests = scheduleData;
            } else {
                $scope.contests2 = scheduleData;
            }
        };

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

    });