define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
	
	], function( $, Backbone, Constants ) {
		
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
    		if(config && config[key]) {
    			return config[key];
    		}
    		else{
    			return Constants[key];
    		}
    	},
		    	
    });

    // Returns the class
    return ConfigService;

});

