(function () {
    'use strict';

    angular
        .module('app')
        .controller('userCtrl', ['$scope', '$filter', 'dataService','$window', function ($scope, $filter, dataService,$window) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();

            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    });
                });
            }

            $scope.deleteUser = function (id) {
                //start
             
                    var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');

                    if (deleteUser) {
                        dataService.deleteUser(id).then(function () {
                            toastr.success('User deleted successfully');
                           
                            getData();
                        }, function () {
                            toastr.error('Error in deleting user with Id: ' + id);
                        });

                   }
               

                //end
            };

            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            };
        }])
        .controller('userAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function () {
                    toastr.success('User created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in creating user');
                });
            };
        }])

        .controller('userPdfCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createPdf = function () {
                dataService.createPdf().then(function () {
                    toastr.success('Pdf created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in creating Pdf');
                });
            };
        }])


        .controller('userEditCtrl', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            $scope.states = {
                showUpdateButton: false
            };

            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error in fetching user with Id: ' + $routeParams.id);
            });

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success('User updated successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updating user');
                });
            };
        }]);
})();