'use strict';

expDataApp.controller('appController', function($scope, USER_ROLES, $rootScope, ROUTES, $location) {	


	$scope.currentUser = null;
	$scope.role = null;
	$scope.logoutuser = null;
	
	   $scope.userProjectList = [
	                      {id: 1, name: 'Proj1'},
	                      {id: 2, name: 'Proj2'}                    
	                     
	                  ];
	

	$scope.createGlobalData = function (user, role,authenticated){
		$scope.currentUser = user;	
		$scope.role = role;
		$scope.logoutuser = null;
		$scope.userAuthenticated = authenticated;		
	};
	
	$scope.destroyGlobalData = function (){
		
		$scope.currentUser = null;
		$scope.role = null;
		$scope.userAuthenticated = null;
	};
	
	$scope.logoutData = function (logoutuser){
		
		$scope.currentUser = null;
		$scope.role = null;
		$scope.userAuthenticated = null;
		$scope.logoutuser = logoutuser;		
	};
	
	
	
	$rootScope.$on('unauthorized', function() {
       console.log("unauthorized LOGOUT called-->");    
       $location.path(ROUTES.LOGOUT);
    });
	

});