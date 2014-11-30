// Sets the require.js configuration for your application.
require.config( {

      paths: {

            // Core Libraries
            "jquery"		: "http://code.jquery.com/jquery-2.1.1.min", 
            "underscore"	: "com/libs/underscore-min",
            "backbone"		: "com/libs/backbone-min",
            "handlebars"	: "com/libs/handlebars-v2.0.0",
            "less"			: "com/libs/lessc",
            "jquerycsv"		: "com/libs/jquery.csv-0.71.min",

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
	
	], function( $, Backbone, Handlebars, Less, NewfoundlandMap, Constants ) {
	
	$(function() {
		
		//initialize widget and store in window
		window[Constants.GLOBAL_WINDOW_VARIABLE] = new NewfoundlandMap({el: $("#map-canvas")});
		
	});	
	
});

