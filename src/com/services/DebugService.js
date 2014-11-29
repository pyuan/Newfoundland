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
				if(window.console && Constants.DEBUG_MODE) {
					console.log(">> " + label + " >> ", obj);	
				}
			}	
    	
    });

    // Returns the class
    return DebugService;

});