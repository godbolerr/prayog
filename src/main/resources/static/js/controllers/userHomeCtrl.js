'use strict';

expDataApp.controller('logoutController', function($resource, $scope,
		$rootScope,auth) {   
    auth.clear($scope);

});

