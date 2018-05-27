(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ui.bootstrap'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'userCtrl',
                    templateUrl: '/app/templates/user.html'
                })
                .when('/adduser', {
                    controller: 'userAddCtrl',
                    templateUrl: '/app/templates/userAdd.html'
                })
                .when('/pdf', {
                    controller: 'userPdfCtrl',
                    templateUrl: '/app/templates/pdf.html'
                })
                .when('/edituser/:id', {
                    controller: 'userEditCtrl',
                    templateUrl: '/app/templates/userEdit.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();