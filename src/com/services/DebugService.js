define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
	
	], function( $, Backbone, Constants ) {
		
    // Extends Backbone.Model
    var DebugService = Backbone.Model.extend({}, {
			
			/**
			 * print to the console if console is available and if debug mode is set to true
			 * @param label, string
			 * @param obj, any javascript object
			 */
			println: function(label, obj) 
			{
				//can't use ConfigService because it would create a circular reference
				var config = window[Constants.CONFIG_OBJECT_NAME];
				var debugMode = config && config.DEBUG_MODE != undefined ? config.DEBUG_MODE : Constants.DEBUG_MODE
				
				if(window.console && debugMode) {
					console.log(">> " + label + " >> ", obj);	
				}
			}	
    	
    });

    // Returns the class
    return DebugService;

});