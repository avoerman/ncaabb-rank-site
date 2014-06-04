'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('MainCtrl', function($scope, $http) {
        $scope.sortOptions = [{
            name: 'RPI',
            value: 'rpi'
        }, {
            name: 'BPI',
            value: 'bpi'
        }, {
            name: 'Ken Pom',
            value: 'kpom'
        }];

        $scope.filterOptions = {
            conferences: [{
                name: 'All'
            }, {
                name: 'A10'
            }, {
                name: 'ACC'
            }, {
                name: 'AE'
            }, {
                name: 'Amer'
            }, {
                name: 'ASun'
            }, {
                name: 'B10'
            }, {
                name: 'B12'
            }, {
                name: 'BE'
            }, {
                name: 'BSky'
            }, {
                name: 'BSth'
            }, {
                name: 'BW'
            }, {
                name: 'CAA'
            }, {
                name: 'CUSA'
            }, {
                name: 'Horz'
            }, {
                name: 'ind'
            }, {
                name: 'Ivy'
            }, {
                name: 'MAAC'
            }, {
                name: 'MAC'
            }, {
                name: 'MEAC'
            }, {
                name: 'MVC'
            }, {
                name: 'MWC'
            }, {
                name: 'NEC'
            }, {
                name: 'OVC'
            }, {
                name: 'P12'
            }, {
                name: 'Pat'
            }, {
                name: 'SB'
            }, {
                name: 'SC'
            }, {
                name: 'SEC'
            }, {
                name: 'Slnd'
            }, {
                name: 'Sum'
            }, {
                name: 'SWAC'
            }, {
                name: 'WAC'
            }, {
                name: 'WCC'
            }]
        };

        $http.get('data/rankings/alldata.json').success(function(data) {
            $scope.teams = data;
        });

        $scope.filterTeam = {
            conference: $scope.filterOptions.conferences[0]
        };

        $scope.conferenceFilter = function(team) {
            if (team.conference === $scope.filterTeam.conference.name) {
                return true;
            } else if ($scope.filterTeam.conference.name === 'All') {
                return true;
            } else {
                return false;
            }
        };

        $scope.rowOver = function(team, useIcon) {
            if (!team.faved) team.useIcon = useIcon;
        };

        $scope.displayIcon = function(team) {
            if (!team.useIcon) return 'none';
        };

        $scope.clickedHeart = function(team) {
            team.faved = !team.faved;
        };

        $scope.getHeart = function(team) {
            return team.faved ? 'glyphicon-heart' : 'glyphicon-heart-empty';
        };

        $scope.highlightedRow = function(team) {
            return team.faved ? 'highlight' : '';
        };
    });