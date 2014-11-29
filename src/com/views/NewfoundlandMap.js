define([ 
		
		"jquery", 
		"backbone",
		"jquerycsv",
		"com/collections/LocationModelCollection",
		"com/models/Constants",
		"com/services/LocationService",
		"com/services/DebugService",
	
	], function( $, Backbone, CSV, LocationModelCollection, Constants, LocationService, DebugService ) {
		
    // Extends Backbone.View
    var NewfoundlandMap = Backbone.View.extend( {
		
		locations: new LocationModelCollection(),
		map: null,
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options)  
        {
			var self = this;
			var onLocations = function(locations) {
				self.locations.add(locations.models);
				DebugService.println("Locations data loaded", locations);
			}
			LocationService.getLocations(onLocations);

			//this.listenTo(this.locations, "change", this.render);
			//this.locations.bind("add", this.render);
			//this.locations.bind("remove", this.render);
			//this.locations.bind("change", this.render);
			this.render();
        },

        /**
         * Renders the view
         * @param none
         */
        render: function() {
        	DebugService.println("", this.$el);
        	this.$el.addClass(Constants.ROOT_CONTAINER_CSS_CLASS);
        	this.createMap();
            return this; //Maintains chainability
        },
        
        createMap: function() 
        {
			var mapOptions = {
				center : {
					lat : -34.397,
					lng : 150.644
				},
				zoom : 4
			};
			map = new google.maps.Map(this.$el.get(0), mapOptions);
		
			for (var i=0; i<500; i++) {
				this.addMarkers();
			}
		},
		
		addMarkers: function() {
			var point = this.getRandomPoint();
			var marker = new google.maps.Marker({
				position : point,
				title : "Hello World!"
			});
		
			// To add the marker to the map, call setMap();
			marker.setMap(map);
			map.setCenter(point)
		},
		
		getRandomPoint: function() {
			var latMin = -26
			var latMax = -20
			var lngMin = 130
			var lngMax = 135
			var lat = latMin + Math.random() * (latMax - latMin)
			var lng = lngMin + Math.random() * (lngMax - lngMin)
			var point = new google.maps.LatLng(lat, lng);
			return point
		},

        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	
        },

    });

    // Returns the View class
    return NewfoundlandMap;

});