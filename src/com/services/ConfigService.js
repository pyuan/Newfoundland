define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/services/DebugService",
	
	], function( $, Backbone, Constants, DebugService ) {
		
    // Extends Backbone.Model
    var ConfigService = Backbone.Model.extend({}, {
    	
    	/**
    	 * retrieve the value for a configuration, if config doesn't exist use default value
 		 * @param {String} key
 		 * @return {String} configValue
    	 */
    	getConfig: function(key) 
    	{
    		var config = window[Constants.CONFIG_OBJECT_NAME]; 
    		if(config && config[key] != undefined) {
    			DebugService.println("Configuration found for " + key, config[key]);
    			return config[key];
    		}
    		else {
    			DebugService.println("Configuration not found for " + key + ", use default", Constants[key]);
    			return Constants[key];
    		}
    	},
		    	
    });

    // Returns the class
    return ConfigService;

});

