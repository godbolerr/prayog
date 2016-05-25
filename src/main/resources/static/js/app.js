var expDataApp = angular.module("expDataApp", ['ngResource' , 'ngRoute' , 'auth','ngSanitize'])
   .config(

		function($routeProvider, $httpProvider, $locationProvider, USER_ROLES,ROUTES) {
			 "use strict";
			//$locationProvider.html5Mode(true);			

			$routeProvider
			.when('/', {templateUrl : 'partials/login.html',controller : 'loginCtrl', authorizedRoles: [USER_ROLES.all]})
			.when(ROUTES.ENTITY_LIST, {templateUrl : 'partials/entity-list.html',controller : 'adminHomeController'})	
			.when(ROUTES.ENTITY_UPDATE, {templateUrl : 'partials/entity-edit.html',controller : 'entityController'})
			.when(ROUTES.ENTITY_ADD, {templateUrl : 'partials/entity-add.html',controller : 'adminHomeController'})
			.when(ROUTES.USER_HOME, {templateUrl : 'partials/home-user.html',controller : 'userHomeController'})
			.when(ROUTES.LOGIN, {templateUrl : 'partials/login.html',	controller : 'loginCtrl'})
			.when(ROUTES.LOGOUT, {controller: 'logoutController', templateUrl: 'partials/login.html'})
			.otherwise('/');

			$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
			$httpProvider.interceptors.push('APIInterceptor');

		}).run(function(auth) {

	// Initialize auth module with the home page and login/logout path
	// respectively
	auth.init('/', '/login', '/logout');

});
		
expDataApp.run(['$templateCache', '$cacheFactory', '$rootScope',
function ($templateCache, $cacheFactory, $rootScope) {
    $templateCache = false;
}]);


 expDataApp.constant('USER_ROLES', {
	  all: '*',
	  ROLE_ADMIN: 'ROLE_ADMIN',	 
	  ROLE_USER: 'ROLE_USER',
	  guest: 'Guest'
	});
 
 expDataApp.constant('APP_CONSTANT', {
	  DEFAULT_PAGINATION_PAGE: 0,
	  DEFAULT_PAGINATION_SIZE: 10,
	  FWD_SLASH: "/",
	  HASH_VAL: "#"
	});

 expDataApp.constant('APP_REF_CONSTANT', {
	
	 REPORT_NAME : "EXPDATA.REPORT_NAME",
	 REPORT_TYPE : "EXPDATA.REPORT_TYPE",
	 SOURCE_ATTRIBUTE_DATATYPE : "EXPDATA.SOURCE_ATTRIBUTE_DATATYPE"
	 
	});
 
 expDataApp.constant('ROUTES', {
	  LOGIN: "/login",
	  LOGOUT: "/logout",
	  ENTITY_LIST: "/entityList",
	  ENTITY_UPDATE: "/updateEntity",
	  ENTITY_ADD: "/addEntity",		  
	  USER_HOME: "/userhome"

	});
 

 expDataApp.run(function($rootScope, $location, auth,APP_CONSTANT, ROUTES){
	  //Add constants in rootscope to use at page level  
	 $rootScope.APP_CONSTANT = APP_CONSTANT;
	    $rootScope.ROUTES = ROUTES;
		 //route that require login
		var loginpermission=['/login','/','/logout','']; 	
		$rootScope.$on('$routeChangeStart', function(event, nextState){		
			if( loginpermission.indexOf($location.path()) !=-1){
				
			}
			else {
				if (auth.isAuthenticated()) {				
					 console.log("Autheticated but not authorized");
				 } else {
					 console.log("Not Autheticated");		  
					$location.path('/login');
				 }			
			
			}
		});
	});
 

 expDataApp.controller('userHomeController', function ($resource,$scope, $rootScope) {		
		
 });
 


 expDataApp.directive('ngConfirmBoxClick', [

 function() {

	return {
		restrict: 'A',
		link : function(scope, element, attr) {		
			//var msg = attr.ngConfirmBoxClick || "Are you sure want to delete???";
			var msg = attr.ngConfirmBoxClick;
			var clickAction = attr.confirmedClick;
			 element.bind('click', function(event) {

				if (window.confirm(msg)) {	
					console.log("Deleteing record");
					scope.$eval(clickAction)
				} else {
					console.log("Not deleteing record");
				}

			});

		}

	};

}

]);
 
 
 expDataApp.filter('pages', function () {
	    return function (input, currentPage, totalPages, range) {	
	    
	      currentPage = parseInt(currentPage);
	      totalPages = parseInt(totalPages);
	      range = parseInt(range);
	  
	      
	     /* console.log("currentPage-->"+currentPage);
	      console.log("totalPages-->"+totalPages);
	      console.log("range-->"+range);
	      console.log("size-->"+size);*/

	    //  var minPage = (currentPage - range < 0) ? 0 : (currentPage - range > (totalPages - (range * 2))) ? totalPages - (range * 2) : currentPage - range;
	     // var maxPage = (currentPage + range > totalPages) ? totalPages : (currentPage + range < range * 2) ? range * 2 : currentPage + range;
	      
	     // var minPage = (currentPage - range < 0) ? 0 : (currentPage - range > (totalPages - (range * 2))) ? totalPages - (range * 2) : currentPage - range;
	    //  var maxPage = (currentPage + range > totalPages) ? totalPages :  range;
	      
	  
	      //Cure = 4, total 7 
	     // var minPage = Math.max(Math.min(currentPage - (range ), totalPages - range), 0);
	     // var maxPage = Math.min(Math.max(currentPage + range, range), totalPages);
	      
	      var minPage = Math.ceil(Math.max(Math.min(currentPage - (range / 2), totalPages - range), 0));
	      var maxPage =  Math.ceil(Math.min(Math.max(currentPage + (range / 2), range), totalPages));
	     
	   /*   
	      console.log("minPage-->"+minPage);
	      console.log("maxPage-->"+maxPage);*/

	      for(var i=minPage; i<maxPage; i++) {
	        input.push(i);
	      }

	      return input;
	    };
	  });
 
 
 expDataApp.directive('fileModel', ['$parse', function ($parse) {
     return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           var model = $parse(attrs.fileModel);
           var modelSetter = model.assign;
           
           element.bind('change', function(){
              scope.$apply(function(){
                 modelSetter(scope, element[0].files[0]);
              });
           });
        }
     };
  }]);
 

 expDataApp.directive('fileDownload', function ($compile) {
	    return {
	        restrict:'E',
	        scope:{ getUrlData:'&getData'},
	        link:function (scope, elm, attrs) {
	            var url = URL.createObjectURL(scope.getUrlData());
	            
	           // var url = "https://www.google.be/images/srpr/logo3w.png";
	            elm.append($compile(
	                '<a class="btn" download="test"' +
	                    'href="' + url + '">' +
	                    'Download' +
	                    '</a>'
	            )(scope));
	        }
	    };
	});
 
 
 expDataApp.directive('ngOnlyDigits', function () {

   return {
       restrict: 'A',
       require: '?ngModel',
       link: function (scope, element, attrs, ngModel) {
    	   console.log("Inside ngOnlyDigits");
           if (!ngModel) return;
           ngModel.$parsers.unshift(function (inputValue) {
               var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
               ngModel.$viewValue = digits;
               ngModel.$render();
               return digits;
           });
       }
   };
});
 
 
 expDataApp.directive('ngNumericOnly', function(){
	    return {
	        require: 'ngModel',
	        link: function(scope, element, attrs, modelCtrl) {

	            modelCtrl.$parsers.push(function (inputValue) {
	                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

	                if (transformedInput!=inputValue) {
	                    modelCtrl.$setViewValue(transformedInput);
	                    modelCtrl.$render();
	                }

	                return transformedInput;
	            });
	        }
	    };
	});