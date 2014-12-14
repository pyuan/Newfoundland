define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var Constants = Backbone.Model.extend({}, {
    	
    	/**** Configuration Defaults ****/
    	DEBUG_MODE : true,
    	GOOGLE_MAPS_API_KEY : "",
    	LOCATIONS_CSV_FILE_URL : "data/locations.csv",
    	MAIN_CONTAINER_CSS_SELECTOR : "",
    	MAP_MARKER_IMAGE : "",
    	
    	/**** Google Maps Constants ****/
		GOOGLE_MAPS_API_URL : "https://maps.googleapis.com/maps/api/js?",   
		MAP_MARKER_ZOOM_LEVEL : 17,
    	
    	/**** Application constants ****/
    	GLOBAL_WINDOW_VARIABLE : "NEWFOUNDLAND_MAP",
    	GLOBAL_INIT_FUNCTION_NAME : "Newfoundland_init",
    	RESOURCE_URL : "http://pyuan.github.io/Newfoundland/src",
    	
    	/**** Configurations constants ****/
    	CONFIG_OBJECT_NAME : "NewfoundlandConfig",
    	
    	/**** LESS constants ****/
    	LESS_FILE_HREF : "css/newfoundland.less",
    	ROOT_CONTAINER_CSS_CLASS : "newfoundland-root",
    	
    	/**** templates constants ****/
    	FOLDER_TEMPLATES : "com/templates/",
    	EXTENSION_TEMPLATES : ".handlebars",
    	TEMPLATE_INFO_WINDOW : "info_window",
    	TEMPLATE_MAP : "map",
    	TEMPLATE_SEARCH : "search",
    	TEMPLATE_SEARCH_RESULTS : "search_results",
    	
    });

    // Returns the class
    return Constants;

});