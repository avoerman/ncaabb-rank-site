'use strict';

angular
    .module('ncaabbRankSiteApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/rankings.html',
                controller: 'rankingsController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'aboutController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });