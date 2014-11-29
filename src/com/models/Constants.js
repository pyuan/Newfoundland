define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var Constants = Backbone.Model.extend({}, {
    	
    	/**** Application constants ****/
    	GLOBAL_WINDOW_VARIABLE : "NEWFOUNDLAND_MAP",
    	ROOT_CONTAINER_CSS_CLASS : "newfoundland-root",
    	
    	/**** data services constants ****/
    	LOCATION_DATA_URL : "data/locations.csv",
    	
    });

    // Returns the class
    return Constants;

});