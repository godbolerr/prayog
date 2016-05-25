'use strict';

expDataApp.service('Session', function ($resource, $rootScope) {
	  this.projectName = null;
	  this.catName = null;
	  this.attributeName = null;
	  this.mapUnitName = null;
	  this.t24applicationName = null;
	  this.schemaName = null;
	  this.jobName = null;
	  this.jobInstanceName = null;
	  this.ruleName = null;
	  this.fileName =null;
	  this.processType = null;
	  this.sourceType = null;
	  this.orgData = null;
	  this.userRole = null;
	  this.userEmail = null;
	  
	  this.create = function (userName, userLastName,userEmail, userRole,userAuth) {	
	    this.userName = userName;	
	    this.userLastName = userLastName;
	    this.userEmail = userEmail;
	    this.userRole = userRole;
	    this.userAuth = userAuth;
	    $rootScope.userName = userName;
	    $rootScope.userEmail = userEmail;
	   
	  };
	  this.destroy = function () {		
		  this.userName = null;	  
		  this.userLastName = null;
		  this.userEmail = null;
		  this.userRole = null;
		  this.userAuth = null;
		  $rootScope.userName = null;
	  };
	  
	  this.setProjectName = function (projectName) {		
		  this.projectName = projectName;
	  }
	  
	  this.getProjectName = function () {		
		  return this.projectName ;
	  }
	  
	  this.setCatName = function (catName) {		
		  this.catName = catName;
	  }
	  
	  this.getCatName = function () {		
		  return this.catName ;
	  }
	  
	  this.setSchemaName = function (schemaName) {		
		  this.schemaName = schemaName;
	  }
	  
	  this.getSchemaName = function () {		
		  return this.schemaName ;
	  }
	
	  this.setAttributeName = function (attributeName) {		
		  this.attributeName = attributeName;
	  }
	  
	  this.getAttributeName = function () {		
		  return this.attributeName ;
	  }
	  
	  this.setMapUnitName = function (mapUnitName) {		
		  this.mapUnitName = mapUnitName;
	  }
	  
	  this.getMapUnitName = function () {		
		  return this.mapUnitName ;
	  }
	  
	  this.setJobName = function (jobName) {		
		  this.jobName = jobName;
	  }
	  
	  this.getJobName = function () {		
		  return this.jobName ;
	  }
	  
	  this.setJobInstanceName = function (jobInstanceName) {		
		  this.jobInstanceName = jobInstanceName;
	  }
	  
	  this.getJobInstanceName = function () {		
		  return this.jobInstanceName ;
	  }
	  
	  this.setRuleName = function (ruleName) {		
		  this.ruleName = ruleName;
	  }
	  
	  this.getRuleName = function () {		
		  return this.ruleName ;
	  }
	  
	  this.setFileName = function (fileName) {		
		  this.fileName = fileName;
	  }
	  
	  this.getFileName = function () {		
		  return this.fileName ;
	  }
	  
	  this.setProcessType = function (processType) {		
		  this.processType = processType;
	  }
	  
	  this.getProcessType = function () {		
		  return this.processType ;
	  }
	  
	  this.setSourceType = function (sourceType) {		
		  this.sourceType = sourceType;
	  }
	  
	  this.getSourceType = function () {		
		  return this.sourceType ;
	  }
	  
	  this.setOrgData = function (orgData) {		
		  this.orgData = orgData;
	  }
	  
	  this.getOrgData = function () {		
		  return this.orgData ;
	  }
	  
	  this.getUserRole = function () {		
		  return this.userRole ;
	  }
	  
	  this.getUserEmail = function () {		
		  return this.userEmail ;
	  }
	  
	  this.setT24applicationName = function (t24applicationName) {		
		  this.t24applicationName = t24applicationName;
	  }
	  
	  this.getT24applicationName = function () {		
		  return this.t24applicationName ;
	  }
	  
	  
	});