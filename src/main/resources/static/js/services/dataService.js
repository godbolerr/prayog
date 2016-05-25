'use strict';

expDataApp.factory('dataService', function ($resource, $location) { 
	 var updateProjectDetail = {};
	 var updateCatalogueDetail = {};
	 var updateMapUnitDetail = {};
	 var updateAttributeDetail = {};
	 var updateJobDetail = {};
	 var updateRuleDetail = {};
	 var environmentDetails = {};
	 var ruleRefData = {};
	 
  return{
		 setUpdateProjectDetails:function(updateProjectObj){				
			 updateProjectDetail = updateProjectObj;
			 console.log("setUpdateProjectDetails-->"+updateProjectDetail);
	    },
	    
	    getUpdateProjectDetails:function(){				
			return updateProjectDetail;
	    } ,
	    setUpdateCatalogueDetails:function(updateCatalogueObj){				
	    	updateCatalogueDetail = updateCatalogueObj;
			 console.log("updateCatalogueDetail-->"+updateCatalogueDetail);
	    },
	    
	    getUpdateCatalogueDetails:function(){				
			return updateCatalogueDetail;
	    }, 
	    setUpdateMapUnitDetails:function(updateMapUnitObj){				
	    	updateMapUnitDetail = updateMapUnitObj;
			 console.log("updateMapUnitDetail-->"+updateMapUnitDetail);
	    },
	    
	    getUpdateMapUnitDetails:function(){				
			return updateMapUnitDetail;
	    } ,
	    setUpdateAttributeDetails:function(updateAttributeObj){				
			 updateAttributeDetail = updateAttributeObj;
			 console.log("setUpdateAttributeDetails-->"+updateAttributeDetail);
	    },
	    
	    getUpdateAttributeDetails:function(){				
			return updateAttributeDetail;
	    } ,
	    
	    setUpdateJobDetails:function(updateJobObj){				
	    	updateJobDetail = updateJobObj;
			 console.log("updateMapUnitDetail-->"+updateJobDetail);
	    },
	    
	    getUpdateJobDetails:function(){				
			return updateJobDetail;
	    } ,
	    
	    setUpdateRuleDetails:function(updateRuleObj){				
	    	updateRuleDetail = updateRuleObj;
			 console.log("updateMapUnitDetail-->"+updateRuleDetail);
	    },
	    
	    getUpdateRuleDetails:function(){				
			return updateRuleDetail;
	    } ,
	    
	    setEnvironmentDetails:function(updateEnvironmentObj){				
	    	environmentDetails = updateEnvironmentObj;		
	    },
	    
	    getEnvironmentDetails:function(){				
			return environmentDetails;
	    },
	    
	    
	    setRuleRefData:function(ruleRefDataObj){				
	    	ruleRefData = ruleRefDataObj;		
	    },
	    
	    getRuleRefData:function(){				
			return ruleRefData;
	    } 
}});
