define([ 
		
		"jquery", 
		"backbone",
		"jquerycsv",
		"com/models/Constants",
		"com/services/LocationService",
	
	], function( $, Backbone, CSV, Constants, LocationService ) {
		
    // Extends Backbone.View
    var NewfoundlandMap = Backbone.View.extend( {
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options)  {
			this.render();
			
			var onLocations = function(locations) {
				console.log(locations);
			}
			LocationService.getLocations(onLocations);
        },

        /**
         * Renders the view
         * @param none
         */
        render: function() {
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