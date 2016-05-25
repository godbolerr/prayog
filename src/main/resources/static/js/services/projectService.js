'use strict';

expDataApp.factory('projectService', function ($resource, $location, APP_CONSTANT,Session,ROUTES) { 
	
	  var projectsRest =  $resource('/rest/orgnizations/:orgId/projects/:projectId', {orgId: '@orgId',projectId: '@projectId'}, {
		  addProjects: { method: 'POST'},  
		  getProjectList: { method: 'GET',isArray:true},
		  editProject: { method: 'PATCH'},
	      deleteProject: { method: 'DELETE'},
	        
	        
	       
	    });
	  
	  
	  var getAttibuteListRest =  $resource('/testService/getAttibuteList', {}, {
		  getAttibuteList: { method: 'GET',  isArray:true}
	       
	    });
	  

	  
  return{
	  
	  addProjects:function(scope, projectData){		
		  console.log("Project added with id"+JSON.stringify(projectData));
		  projectsRest.addProjects({orgId:Session.getOrgData().id},projectData)
			    .$promise.then(function(data) {
			    	 console.log("Project added with id"+JSON.stringify(data.id));	
			    // scope.projectLists = data;	
			     scope.successMessage = "Project added successfully with id " + data.id;
	  	    	 scope.ifSuccess = true;
			     scope.ifFaliure = false;
			     scope.projects= angular.copy();
			      return data;
	  	    },
			    function (errorData) {   
	  	    	   console.log("Error while adding project"+JSON.stringify(errorData));	
	  	    	   scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
					   return false;			  
				 }
			    ); 
			
		},
	
  	  getProjectList:function(scope){	
  		//console.log("Session.getOrgData()-->"+JSON.stringify(Session.getOrgData()))
			projectsRest.getProjectList({orgId:Session.getOrgData().id})
		    .$promise.then(function(data) {	
		     console.log("getProjectList-->"+JSON.stringify(data))
		      scope.projectLists = data;
		     //scope.page = {totalPages:data.totalPages, size:data.size, number:data.number}
		     //scope.projectLists = data;
		     //  console.log("data._links-->"+data._links)
		    // scope.projectLists = data._embedded.projects; 
		    // console.log("data.page-->"+data.page)
		     // console.log("data._embedded.page-->"+data._embedded.page)
		    // scope.page = data.page;
		     //alert(page.number);
		/*    
		    angular.forEach(data.links, function(value) {
		          if(value.rel === 'next') {
		            $scope.nextPageLink = value.href;
		          }

		          if(value.rel === 'prev') {
		            $scope.prevPageLink = value.href;
		          }
		        });*/
		      
		      return data;
	    },
		    function (errorData) { 
  	    	  console.log("Error while getProjectList"+JSON.stringify(errorData))  	 
  	    	  scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
				   return false;			  
			 }
		    );		
	  },
	  
	   deleteProject:function(scope, projectData){	
		   projectsRest.deleteProject({projectId:projectData.id, orgId:Session.getOrgData().id})
			    .$promise.then(function(data) {				  
			   //  scope.projectLists = data; 
			     scope.successMessage = "Project deleted successfully with id " + projectData.id
		  	    	 scope.ifSuccess = true;
				     scope.ifFaliure = false;
				     $location.url(ROUTES.PROJECT_LIST); 
			      return data;
	  	    },
			    function (errorData) { 
	  	    	  console.log("Error while deleteProject"+JSON.stringify(errorData))  	 
	  	    	   scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
					   return false;			  
				 }
			    );		
		  },
		  
		   editProject:function(scope, updateProjectDetail){	
			   projectsRest.editProject({orgId:Session.getOrgData().id},updateProjectDetail)
				    .$promise.then(function(data) {				  
				     console.log("After EditProject"+JSON.stringify(data))  
				     scope.successMessage = "Project Updated successfully"
	  	    	     scope.ifSuccess = true;
			         scope.ifFaliure = false;			       
			         scope.updateProjectDetail = data;
				      return data;
		  	    },
				    function (errorData) { 
		  	    	  console.log("Error while EditProject"+JSON.stringify(errorData))  
		  	       scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
						   return false;			  
					 }
				    );		
			  },
		
			  getAttibuteList:function(scope){		
				  getAttibuteListRest.getAttibuteList()
					    .$promise.then(function(data) {
					    	  console.log("getAttibuteList-->"+JSON.stringify(data));	
					     scope.items = data;					    
					     console.log("Note-->");
					    // console.log("conditionals-->"+data.conditionals);
					    /* scope.successMessage = "Project added successfully"
			  	    	 scope.ifSuccess = true;
					     scope.ifFaliure = false;*/
					      return data;
			  	    },
					    function (errorData) {   
			  	    	   console.log("Error while getAttibuteList project"+JSON.stringify(errorData));	
			  	    	   scope.errorMessage = errorData.data.message;
			  	    	   scope.ifFaliure = true;
			  	    	   scope.ifSuccess = false;
							   return false;			  
						 }
					    ); 
					
				}
	
}});
