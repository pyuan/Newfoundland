// Sets the require.js configuration for your application.
require.config( {

      paths: {

            // Core Libraries
            "jquery"			: "http://code.jquery.com/jquery-2.1.1.min", 
            "underscore"		: NewfoundlandConfig.RESOURCE_URL + "com/libs/underscore-min",
            "backbone"			: NewfoundlandConfig.RESOURCE_URL + "com/libs/backbone-min",
            "handlebars"		: NewfoundlandConfig.RESOURCE_URL + "com/libs/handlebars-v2.0.0",
            "less"				: NewfoundlandConfig.RESOURCE_URL + "com/libs/lessc",
            "jquerycsv"			: NewfoundlandConfig.RESOURCE_URL + "com/libs/jquery.csv-0.71.min",
            "com"				: NewfoundlandConfig.RESOURCE_URL + "com/",
            
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {
			
            "backbone": {
            	"deps": [ "underscore", "jquery" ],
                "exports": "Backbone"  //attaches "Backbone" to the window object
            },
            
            "handlebars" : {
				"deps" : ["jquery"],
				"exports" : "Handlebars"
			},
			
			"underscore": {
            	"exports": "_"
            },
            
            "jquerycsv" : {
            	"deps" : ["jquery"],
            },

      } // end Shim Configuration

});

// Includes File Dependencies
require([
	 	
		"jquery",
		"backbone",
		"handlebars",
		"less",
		"com/views/NewfoundlandMap",
		"com/models/Constants",
		"com/services/ConfigService",
		"com/services/FileService",
	
	], function( $, Backbone, Handlebars, Less, NewfoundlandMap, Constants, ConfigService, FileService ) {
	
	$(function() {
		
		//load google maps API
		var url = Constants.GOOGLE_MAPS_API_URL + ConfigService.getConfig("GOOGLE_MAPS_API_KEY");
		var apiKey = ConfigService.getConfig("GOOGLE_MAPS_API_KEY");
		if(apiKey) {
			url += "key=" + apiKey
		}
		url += "&callback=" + Constants.GLOBAL_INIT_FUNCTION_NAME + "";
		FileService.loadJSFile(url);
		
		//store init function in window so app can be initialized after google maps has been loaded
		window[Constants.GLOBAL_INIT_FUNCTION_NAME] = function() 
		{
			//load less 
			FileService.loadLessFile(ConfigService.getConfig("RESOURCE_URL") + Constants.LESS_FILE_HREF);
			
			//load requireJS incompatible libraries
			
			//custom info window
			FileService.loadJSFile(ConfigService.getConfig("RESOURCE_URL") + "com/libs/infobox_packed.js"); 
			
			//marker clusterer
			FileService.loadJSFile(ConfigService.getConfig("RESOURCE_URL") + "com/libs/markerclusterer_packed.js", function() {
				
				//initialize widget and store in window
				var containerSelector = ConfigService.getConfig("MAIN_CONTAINER_CSS_SELECTOR");
				window[Constants.GLOBAL_WINDOW_VARIABLE] = new NewfoundlandMap({el: $(containerSelector)});
				
			});
		}
		
	});	
	
});

