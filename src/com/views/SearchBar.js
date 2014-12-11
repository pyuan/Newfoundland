define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/services/DebugService",
		"com/services/LocationService",
		"com/services/TemplateService",
	
	], function( $, Backbone, Constants, DebugService, LocationService, TemplateService ) {
		
    // Extends Backbone.View
    var SearchBar = Backbone.View.extend( {
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) {
			this.render();
        },
        
        /**
         * Renders the view 
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	TemplateService.getTemplate(Constants.TEMPLATE_SEARCH, {}, function(html) {
        		self.$el.html(html);
        		self.$el.find(".search").on("input", function() {
        			self.search( $(this).val() );
        		});
        	});
            return this; //Maintains chainability
        },
        
        /**
         * filter results based on the key
         * @param {String} key
         */
        search: function(key)
        {
        	if(key.length <= 1) {
        		return;
        	}
        	
        	var filtered = LocationService.search(this.collection, key);
        	DebugService.println("Filtered locations with key: \"" + key + "\"", filtered);
        },

    });

    // Returns the View class
    return SearchBar;

});