'use strict';

expDataApp.controller('entityController', function ($resource,$scope,$route, $rootScope, $location, entityService, dataService,APP_CONSTANT, ROUTES,Session) {	
	
	
	
	
	//Initialize data	
	$scope.ifSuccess = null;
	$scope.successMessage = null;
	$scope.errorMessage = null;
	$scope.ifFaliure = null;
	
	$scope.projectName = Session.getProjectName();
    $scope.updateProjectDetail = dataService.getUpdateProjectDetails();
   // $scope.updateProjectDetail.selectedEnvironmentList = $scope.updateProjectDetail.environments;
	 
	   if(angular.equals(ROUTES.PROJECT_UPDATE, $location.path())){	    	
	    	envService.getEnvironmentListByStatus($scope, "Active");
	    }

	 $scope.updateProjects = function () {
		   //Set up env
		 console.log($scope.updateProjectDetail);
		// $scope.updateProjectDetail.environments = $scope.updateProjectDetail.selectedEnvironmentList;
		 projectService.editProject($scope,$scope.updateProjectDetail);		
	 };
	 
	 $scope.deleteProjects = function (projectList) {			
		 projectService.deleteProject($scope,projectList);
		// $scope.close();
	 };
	 
	 $scope.close = function () {
		 $location.url('/entityList'); 
		 $route.reload();
	 };
	 
	
	 
	

	
});


