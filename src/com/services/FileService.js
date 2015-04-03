define([ 
		
		"jquery", 
		"backbone",
		"com/services/DebugService",
	
	], function( $, Backbone, DebugService ) {
		
    // Extends Backbone.Model
    var FileService = Backbone.Model.extend({}, {
    	
    	/**
    	 * load a less file into the page by asynchronously load in the less file
    	 * run the LESS parser and insert result css into the head 
 		 * @param {String} fileHref
 		 * @param {function} completionHandler
    	 */
    	/*
		loadLessFile: function(fileHref, completionHandler) 
		{
			$.ajax({
				type: "GET",
				url: fileHref,
				cache: false,
				success: function(css)
				{
					DebugService.println("FileService LESS loaded", fileHref);
					
					var parser = new (LESS.Parser);
					parser.parse(css, function(err, tree) {
						var output = tree.toCSS();
						var cssMarkUp = $("<style>" + output + "</style>");
						$("head").append(cssMarkUp); 
					});
					
					if(completionHandler) {
						completionHandler();
					}
				}
			});
		},  
		*/ 
		
		/**
		 * load a css file into the page
		 * @param {String} fileHref
		 * @param {function} completionHandler
		 */
		loadCSSFile: function(fileHref, completionHandler) 
		{
		    $.ajax({
                type: "GET",
                url: fileHref,
                cache: false,
                success: function(css)
                {
                    DebugService.println("FileService CSS loaded", fileHref);
                    
                    var cssMarkUp = $("<style>" + css + "</style>");
                    $("head").append(cssMarkUp); 
                    
                    if(completionHandler) {
                        completionHandler();
                    }
                }
            });
		},
		
		/**
		 * load a javascript file synchronously into the page
 		 * @param {String} fileHref
 		 * @param {function} completionHandler
		 */
		loadJSFile: function(fileHref, completionHandler)
		{
			$.ajaxSetup({async: false});
			$.getScript(fileHref, function() {
				DebugService.println("FileService JS loaded", fileHref);
				
				if(completionHandler) {
					completionHandler();
				}
			});
			$.ajaxSetup({async: true});
		},
		    	
    });

    // Returns the class
    return FileService;

});

