define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var Constants = Backbone.Model.extend({}, {
    	
    	/**** Google Maps Constants ****/
		GOOGLE_MAPS_API_URL : "https://maps.googleapis.com/maps/api/js?",   
		GOOGLE_MAPS_API_KEY : "", 	
    	
    	/**** Application constants ****/
    	DEBUG_MODE : true,
    	GLOBAL_WINDOW_VARIABLE : "NEWFOUNDLAND_MAP",
    	GLOBAL_INIT_FUNCTION_NAME : "Newfoundland_init",
    	LOCATIONS_CSV_FILE_URL : "data/locations.csv",
    	
    	/**** Configurations constants ****/
    	CONFIG_OBJECT_NAME : "NewfoundlandConfig",
    	
    	/**** LESS constants ****/
    	LESS_FILE_HREF : "css/newfoundland.less",
    	ROOT_CONTAINER_CSS_CLASS : "newfoundland-root",
    	
    });

    // Returns the class
    return Constants;

});