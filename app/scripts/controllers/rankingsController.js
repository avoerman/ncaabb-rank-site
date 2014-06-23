'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('rankingsController', function($scope, $http) {

        $http.get('data/rankings/alldata.json').success(function(data) {
            $scope.teams = data;
        });

        $scope.conferences = [];

        $http.get('data/conferences.json').success(function(data) {
            $scope.conferences = data;

            $scope.filterTeam = {
                conference: data[0]
            };
        });

        $scope.headers = getHeaders();

        $scope.conferenceFilter = function(team) {
            if (!$scope.filterTeam || team.conference === $scope.filterTeam.conference.name) {
                return true;
            } else if ($scope.filterTeam.conference.name === 'All') {
                return true;
            } else {
                return false;
            }
        };

        $scope.rowOver = function(team, useIcon) {
            if (!team.faved) {
                team.useIcon = useIcon;
            }
        };

        $scope.displayIcon = function(team) {
            if (!team.useIcon) {
                return 'none';
            }
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

        $scope.sortByTeam = function() {
            $scope.teamArrowClass = 'sort-arrow-down';
        };

        /**
         * Handler when the sort arrows are clicked. Removes all blue arrows first.
         */
        $scope.onSortArrowClick = function(header) {
            var desiredHeader = header;
            $scope.headers.forEach(function(header) {
                if (header !== desiredHeader) {
                    header.activeSortArrowAsc = false;
                    header.activeSortArrowDesc = false;
                }
            });

            if (header.activeSortArrowDesc || header.activeSortArrowAsc) {
                header.activeSortArrowDesc = !header.activeSortArrowDesc;
                header.activeSortArrowAsc = !header.activeSortArrowAsc;
            } else {
                if (header.reverseSortByDefault) {
                    header.activeSortArrowDesc = false;
                    header.activeSortArrowAsc = true;
                } else {
                    header.activeSortArrowDesc = true;
                    header.activeSortArrowAsc = false;
                }
            }

            header.lightarrow = false;
            $scope.sortValue = header.value;
            $scope.sortDirection = (header.activeSortArrowAsc ? 'reverse' : '');
        };

        /**
         * Returns the classes for the header for the sort arrows
         */
        $scope.getArrowClasses = function(header) {
            return {
                hovarrow: header.hovered && (!header.activeSortArrowAsc && !header.activeSortArrowDesc),
                lightarrow: !header.hovered && (!header.activeSortArrowAsc && !header.activeSortArrowDesc),
                activearrowAsc: header.activeSortArrowAsc,
                activearrowDesc: header.activeSortArrowDesc
            };
        };

        function getHeaders() {
            return [{
                title: 'Team',
                value: 'name'
            }, {
                title: 'Conference',
                value: 'conference'
            }, {
                title: 'Record',
                value: 'record'
            }, {
                title: 'RPI',
                value: 'rpi'
            }, {
                title: 'BPI',
                value: 'bpi'
            }, {
                title: 'KPom',
                value: 'kpom'
            }, {
                title: 'Seed',
                value: 'bm_seed'
            }, {
                title: 'Avg',
                value: 'bm_avgseed'
            }, {
                title: '# Brackets',
                value: 'bm_numbrackets',
                reverseSortByDefault: true
            }];
        }
    })
    .filter('nullsLast', function() {
        return function(array, key) {
            if (!angular.isArray(array)) {
                return;
            }
            var present = array.filter(function(item) {
                return item[key];
            });
            var empty = array.filter(function(item) {
                return !item[key];
            });
            return present.concat(empty);
        };
    });