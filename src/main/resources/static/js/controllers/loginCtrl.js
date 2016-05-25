'use strict';

expDataApp.controller('loginCtrl', function ($scope, $route, auth) {	
		

			$scope.credentials = {};

			$scope.tab = function(route) {
				return $route.current && route === $route.current.controller;
			};

			$scope.authenticated = function() {
				return auth.authenticated;
			}

			$scope.login = function() {
				auth.authenticate($scope,$scope.credentials, function(authenticated) {
					if (authenticated) {
						console.log("Login succeeded")
						  $scope.error = false;
						  
					} else {
						console.log("Login failed");
						$scope.errorMessage = "Login failed: Invalid User or Password";
						$scope.ifFaliure = true;
						$scope.ifSuccess = false;
						$scope.error = true;
					}
				})
			};

			$scope.logout = auth.clear;

		});
