'use strict';

expDataApp.factory('entityService', function ($resource, $location, APP_CONSTANT,Session,ROUTES) { 
	
	  var entityRest =  $resource('/rest/experiments/:expId', {expId: '@expId'}, {
		  addEntity: { method: 'POST'},  
		  getEntities: { url:'/rest/experiments', method: 'GET',isArray:true},
		  editEntity: { method: 'PATCH'},
	      deleteEntity: { method: 'DELETE'},
	        
	        
	       
	    });
	  
	  
	  
  return{
	  
	  addEntity:function(scope, projectData){		
		  console.log("Project added with id"+JSON.stringify(projectData));
		  entityRest.addEntity({orgId:Session.getOrgData().id},projectData)
			    .$promise.then(function(data) {
			    	 console.log("Project added with id"+JSON.stringify(data.id));	
			    // scope.entityLists = data;	
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
	
  	  getEntities:function(scope){	
  		//console.log("Session.getOrgData()-->"+JSON.stringify(Session.getOrgData()))
			entityRest.getEntities()
		    .$promise.then(function(data) {	
		     console.log("getEntities-->"+JSON.stringify(data))
		      scope.entityLists = data;
		     //scope.page = {totalPages:data.totalPages, size:data.size, number:data.number}
		     //scope.entityLists = data;
		     //  console.log("data._links-->"+data._links)
		    // scope.entityLists = data._embedded.projects; 
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
  	    	  console.log("Error while getEntities"+JSON.stringify(errorData))  	 
  	    	  scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
				   return false;			  
			 }
		    );		
	  },
	  
	   deleteEntity:function(scope, projectData){	
		   entityRest.deleteEntity({projectId:projectData.id, orgId:Session.getOrgData().id})
			    .$promise.then(function(data) {				  
			   //  scope.entityLists = data; 
			     scope.successMessage = "Project deleted successfully with id " + projectData.id
		  	    	 scope.ifSuccess = true;
				     scope.ifFaliure = false;
				     $location.url(ROUTES.PROJECT_LIST); 
			      return data;
	  	    },
			    function (errorData) { 
	  	    	  console.log("Error while deleteEntity"+JSON.stringify(errorData))  	 
	  	    	   scope.errorMessage = errorData.data.message;
	  	    	   scope.ifFaliure = true;
	  	    	   scope.ifSuccess = false;
					   return false;			  
				 }
			    );		
		  },
		  
		   editEntity:function(scope, updateProjectDetail){	
			   entityRest.editEntity({orgId:Session.getOrgData().id},updateProjectDetail)
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
			  }
	
}});
