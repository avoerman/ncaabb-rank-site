'use strict';

angular.module('ncaabbRankSiteApp')
    .controller('MainCtrl', function($scope, $http) {
        $scope.filterOptions = {
            conferences: getConferences()
        };

        $scope.headers = getHeaders();

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

            if (header.activeSortArrowDesc) {
                header.activeSortArrowDesc = false;
                header.activeSortArrowAsc = true;
            } else {
                header.activeSortArrowDesc = true;
                header.activeSortArrowAsc = false;
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

        function getConferences() {
            return [{
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
            }];
        }

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
                value: 'bm_numbrackets'
            }];
        }
    });