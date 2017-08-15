var app = angular.module('angularTable', ['angularUtils.directives.dirPagination', 'ngRoute'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    console.log('started');
    $routeProvider.when('/list', {
        templateUrl: '/ListPage.html',
    });
    $routeProvider.when('/add', {
        templateUrl: 'add.html',
    });
    $routeProvider.when('/edit', {
        templateUrl: 'edit.html',
    });
    $routeProvider.otherwise({
        redirectTo: '/list'
    });
    $locationProvider.html5Mode(false).hashPrefix('!');

}]);

app.controller('listdata',function($scope, $http, $location){
    $scope.clients = [];

    console.log('fill client');
	$http({
	    method: 'get',
	    url: "clientJson/client.json",
	    dataType: 'json',
	    headers: {
	        "Content-Type": "application/json"
	    }
	}).then(function (success) {
	    $scope.clients = success.data;
	}, function (error) {

	});
	
	$scope.sort = function (keyname) {
	    $scope.sortKey = keyname;
	    $scope.reverse = !$scope.reverse;
	};

	$scope.go = function (path) {
	    console.log(path);
	    $location.path(path);
	};

    $scope.ClientsModel =
    {
        id: 0,
        first_name: '',
        last_name: '',
        dob: '1/1/1990'
    };

    $scope.addNew = function (ClientsModel) {
        $scope.clients.push({
            'fname': "",
            'lname': "",
            'dob': "",
        });
    };

    $scope.remove = function () {
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.clients, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        $scope.clients = newDataList;   
    };

    $scope.save = function () {
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.clients, function (selected) {
                newDataList.push(selected);
        });
        $scope.clients = newDataList;
    };

    $scope.checkAll = function () {
        var sA = $scope.selectedAll;
        if (!sA) {
            sA = true;
        } else {
            sA = false;
        }
        angular.forEach($scope.clients, function (ClientsModel) {
            ClientsModel.selected = sA;
        });
    };

});

