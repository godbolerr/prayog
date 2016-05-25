angular.module('auth', []).factory(
		'auth',

		function($rootScope, $http, $location, USER_ROLES, Session, APP_CONSTANT) {
			
			var role;
			var homeURL;	

			enter = function() {
				if ($location.path() != auth.loginPath) {
					auth.path = $location.path();
					if (!auth.authenticated) {
						$location.path(auth.loginPath);
					}
				}					
			}

			var auth = {

				authenticated : false,

				loginPath : '/login',
				logoutPath : '/logout',
				homePath : '/',
				path : $location.path(),

				authenticate : function($scope, credentials, callback) {

					var headers = credentials && credentials.useremail ? {
						authorization : "Basic "
								+ btoa(credentials.useremail + ":"
										+ credentials.password)
					} : {};

					$http.get('user', {
						headers : headers
					}).success(function(data) {						
						if (data.name) {	
							 console.log("User login->"+JSON.stringify(data));	
							auth.authenticated = true;
							role = "ROLE_ADMIN";
							Session.create(data.name,data.principal.userlastname,data.principal.useremail,role,auth.authenticated);
							$rootScope.authUser = auth.authenticated;
						} else {
							auth.authenticated = false;
						}
						callback && callback(auth.authenticated);
						
					  	//Get Home URL
						homeURL = "/entityList"	;
						 $location.path(homeURL);
							 

				
					}).error(function() {
						auth.authenticated = false;
						callback && callback(false);
					});

				},
				isAuthenticated:function(){	 
					  return auth.authenticated;
					 // return  Session.userAuth;
					 // return $rootScope.authUser;
					},
				isAuthorized: function (authorizedRoles) {		
					
					if (!angular.isArray(authorizedRoles)) {
					 authorizedRoles = [authorizedRoles];
					}
					return this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1;
				   },

				clear : function($scope) {
					$location.path(auth.loginPath);
					auth.authenticated = false;
					$rootScope.authUser = false;
					$http.post(auth.logoutPath, {}).success(function() {
						console.log("Logout succeeded");
						$scope.logoutData(true); 
					}).error(function(data) {
						console.log("Logout failed");
						$scope.logoutData(false); 
					});
				},

				init : function(homePath, loginPath, logoutPath) {

					auth.homePath = homePath;
					auth.loginPath = loginPath;
					auth.logoutPath = logoutPath;

					auth.authenticate({}, function(authenticated) {
						if (authenticated) {
							$location.path(auth.path);
						}
					})

					// Guard route changes and switch to login page if unauthenticated
					$rootScope.$on('$routeChangeStart', function() {
						enter();
					});

				}

			};

			return auth;

		});
