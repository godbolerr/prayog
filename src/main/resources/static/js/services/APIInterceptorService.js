'use strict';

expDataApp.service('APIInterceptor', function ($q, $rootScope, $location) { 
	var service = this;
	
	/*service.request = function(config) { 
        var currentUser = UserService.getCurrentUser(),
            access_token = currentUser ? currentUser.access_token : null;

        if (access_token) {
            config.headers.authorization = access_token;
        }
		//console.log("In request intercepter");
        return config;
    };*/

    service.responseError = function(response) {
    	console.log("In response error intercepter ->"+response.status);
    	
    	if (response.status === 401) {
    		console.log("In response 401 intercepter");
    		 $rootScope.$broadcast('unauthorized');
           
        } else if (response.status === 500) {
    		console.log("In response 500 updated intercepter"); 		 
    		 return $q.reject(response);
        } else if (response.status == 405) {
        	console.log("In response 405 Method Not allowed intercepter"); 	
            return $q.reject(response);
        } else {        	
            return $q.reject(response);
        }    	
    	
        return response;
    };
});
