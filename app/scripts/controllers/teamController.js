'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('teamController', function($scope, $http, $routeParams) {

        /* For now, we're just going to get the rankings data over again */
        $http.get('data/rankings/alldata.json').success(function(data) {
            var teams = data.filter(function(fteam) {
                return fteam.name === $routeParams.name;;
            });

            $scope.team = teams[0];
        });

    });