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
		
		map: null,
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) {
        	this.map = options.map;
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
        	});
        	
        	//result click handler
        	this.$el.on("click", ".result", function() {
        		var cid = $(this).attr("data-item-id");
        		self.goToResult(cid);
        	});
        	
			//hide search results when mouse leaves search        	
        	this.$el.on("mouseleave", function() {
    			self.hideSearchResults();
    		});
    		
    		//trigger search whenever search field receives focus or when the input changes
    		this.$el.on("input mouseenter", ".search", function() {
    			self.search( $(this).val() );
    		});
    		
    		//trigger geocode search when enter key is tapped
    		this.$el.on("keydown", ".search", function(e) {
    			if(e.which == 13) {
    				$(this).select();
			        self.geocodeSearch( $(this).val() );
			    }
			    //console.log(e.which);
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
        		this.showSearchResults(null);
        		return;
        	}
        	
        	var results = LocationService.search(this.collection, key);
        	this.showSearchResults(results);
        },
        
        /**
         * geocode the entered string in search bar and center to location
         * @param {String} key
         */
        geocodeSearch: function(key) {
        	var scope = this;
        	var geocoder = new google.maps.Geocoder();
        	geocoder.geocode( {'address': key}, function(results, status) {
        		if (status == google.maps.GeocoderStatus.OK) {
        			if(results[0]) {
        				var location = results[0].geometry.location;
		        		scope.map.centerMap(location);
        			}
			    } else {
			        DebugService.println("Search Bar", "Geocode was not successful for the following reason: " + status);
			    }
		    });
        },
        
        /**
         * show the search results
 		 * @param {Object} results, contains LocationModel, nameMatchIndex and addressMatchIndex
         */
        showSearchResults: function(results)
        {
        	var resultsContainer = this.$el.find(".results").hide();
        	if(!results || results.length == 0) {
        		return;
        	}
        	
        	var key = this.$el.find(".search").val();
        	var items = [];
        	for(var i=0; i<results.length; i++) 
        	{
        		var result = results[i];
        		var location = result.location;
        		var item = {cid: location.cid};
        		item.label = LocationService.getSearchResultLabel(result, key);
        		items.push(item);
        	}

        	var params = {items: items};
        	TemplateService.getTemplate(Constants.TEMPLATE_SEARCH_RESULTS, params, function(html) {
        		$(resultsContainer).html(html).show();
        	});
        },
        
        /**
         * hide the search results
         * @param none
         */
        hideSearchResults: function() 
        {
        	var results = this.$el.find(".results");
        	$(results).hide();
        },
        
        /**
         * id to retrieve the LocationModel
         * zoom and center map to location
 		 * @param {String} cid
         */
        goToResult: function(cid)
        {
        	var location = this.collection.get(cid);
        	this.map.showMarker(location);
        	DebugService.println("Location selected", location);
        },

    });

    // Returns the View class
    return SearchBar;

});