define([ 
		
		"jquery", 
		"backbone",
		"less",
		"com/services/DebugService",
	
	], function( $, Backbone, LESS, DebugService ) {
		
    // Extends Backbone.Model
    var FileService = Backbone.Model.extend({}, {
    	
    	/**
    	 * load a less file into the page by asynchronously load in the less file
    	 * run the LESS parser and insert result css into the head 
 		 * @param {String} fileHref
    	 */
		loadLessFile: function(fileHref) 
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
				}
			});
		},   
		
		/**
		 * load a javascript file into the page by appending it to the HEAD
 		 * @param {String} fileHref
		 */
		loadJSFile: function(fileHref)
		{
			var script = $("<script/>").attr("type", "text/javascript").attr("src", fileHref);
			$("head").append(script);
		},
		    	
    });

    // Returns the class
    return FileService;

});

