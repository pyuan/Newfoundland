define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.View
    var Constants = Backbone.Model.extend({}, {
    	
    	GLOBAL_WINDOW_VARIABLE: "NEWFOUNDLAND_MAP",
    	
    });

    // Returns the View class
    return Constants;

});