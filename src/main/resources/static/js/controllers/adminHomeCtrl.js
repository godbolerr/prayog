'use strict';

expDataApp.controller('adminHomeController', function ($resource,$scope, $rootScope, $routeParams,$location, entityService, dataService, APP_CONSTANT, ROUTES, Session) {	
	
	//Initialize data	
	$scope.ifSuccess = null;
	$scope.successMessage = null;
	$scope.errorMessage = null;
	$scope.ifFaliure = null;
	
	$scope.sortType     = 'id'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	
	

	$scope.paginationPage = $routeParams.page;
	$scope.paginationSize = $routeParams.size;
	
	 entityService.getEntities($scope);	
	 
	 
	 //Get Attribute list
	// entityService.getAttibuteList($scope);	 
	
	
	 /*   $scope.getBlob = function(){
	        return new Blob("https://www.google.be/images/srpr/logo3w.png");
	    }
	 */
	 
	   if(angular.equals(ROUTES.PROJECT_ADD, $location.path())){
		  
	    	envService.getEnvironmentListByStatus($scope, "Active");
	    }
	    
		
	 $scope.addProjects = function () {	
		   console.log("Form Control values");
		   
		   if($scope.projects.checkboxModel) {
			   console.log("Check box value 1->"+$scope.projects.checkboxModel.value1);
			   console.log("Check box value 2->"+$scope.projects.checkboxModel.value2);
		   }
		  
		   console.log("Radion button value->"+$scope.projects.Optionality);
		   
		   
		   if($scope.projects.selectedFunction) {		  
			   console.log("Selected Function->"+$scope.projects.selectedFunction.value);
		   }
		   
		   
		 
		   console.log("Multiple Selected Function->"+JSON.stringify($scope.projects.selectedEnvironmentList));
		  
		   $scope.projects.status = "Active";
		   //Set up env
		   console.log("Selected Projectname	->"+$scope.projects.projectName);
		   $scope.projects.environments = $scope.projects.selectedEnvironmentList;
		   entityService.addProjects($scope, $scope.projects);
			
		 };
		 
	 $scope.getCatalogue = function (projectDetail) {
		
			 //Set project name in session
			 Session.setProjectName(projectDetail.projectName);
			$location.url(ROUTES.CATALOGUE_LIST  + APP_CONSTANT.FWD_SLASH + projectDetail.id); 
	 };
	
	 $scope.deleteProjects = function (projectList) {			
		 entityService.deleteProject($scope,projectList);
	 };
	 
	 $scope.updateProject = function (projectList) {	
		// projectList.description = "After Edit project";
		// entityService.editProject($scope,projectList);
		
		 Session.setProjectName(projectList.projectName);
		 dataService.setUpdateProjectDetails(projectList);
		 $location.path("/updateProject");
	 };
	 
	 $scope.close = function () {
		 $location.url('/entityList'); 
		// $route.reload();
	 };
	 
	 

	
});


