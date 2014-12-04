define([ 
		
		"jquery", 
		"backbone",
		"jquerycsv",
		"com/collections/LocationModelCollection",
		"com/models/Constants",
		"com/models/LocationModel",
		"com/services/LocationService",
		"com/services/DebugService",
		"com/services/ConfigService",
		"com/services/TemplateService",
		"com/views/InfoWindow",
	
	], function( $, Backbone, CSV, LocationModelCollection, Constants, LocationModel, 
		LocationService, DebugService, ConfigService, TemplateService, InfoWindow ) {
		
    // Extends Backbone.View
    var NewfoundlandMap = Backbone.View.extend( {
		
		map: null,
		bounds: null,
		infoWindow: null,
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options)  
        {
			var self = this;
			var onLocations = function(locations) {
				self.collection = locations
				self.collection.bind("add", this.render);
				self.collection.bind("remove", this.render);
				self.render();
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
        
        /**
         * initialize google map in provided container element
         * @param none
         */
        createMap: function() 
        {
        	//if no container specified, stop creating map
			var container = this.$el.get(0);
			if(!container) {
				return;
			}
			
			var mapOptions = {
				zoom: 1 //set default zoom level
			};
			this.map = new google.maps.Map(container, mapOptions);
			
			var self = this;
			this.bounds = new google.maps.LatLngBounds();
			var markers = [];
			self.collection.each(function(location) {
				var marker = self.createMarker(location);
				markers.push(marker);
				self.bounds.extend(marker.getPosition());
			});
			
			//center to fit all markers
			var markerCluster = new MarkerClusterer(this.map, markers);
			this.map.fitBounds(this.bounds);
		},
		
		/**
		 * create a marker based on a LocationModel
		 * @param {LocationModel} location
		 * @return {google.maps.Marker} marker
		 */
		createMarker: function(location) 
		{
			var lat = location.get(LocationModel.PROPERTY_KEYS.LATITUDE);
			var lng = location.get(LocationModel.PROPERTY_KEYS.LONGITUDE);
			var point = new google.maps.LatLng(lat, lng);
			var options = {
				position: point,
				model: location
			};
			
			var markerImage = ConfigService.getConfig("MAP_MARKER_IMAGE");
			if(markerImage) {
				options.icon = markerImage;
			}
			
			var marker = new google.maps.Marker(options);
			
			//add click handler for the marker
			var self = this;
			google.maps.event.addListener(marker, 'click', function() {
				self.onMarkerClick(marker);
	        	DebugService.println("Marker cicked", marker);
	        });
			
			return marker;
		},
		
		/**
		 * handle when a marker is clicked
		 * @param {google.maps.marker} marker
		 */
		onMarkerClick: function(marker)
		{
			if(this.infoWindow) {
				this.infoWindow.close();	
			}
			
			this.infoWindow = new InfoWindow();
			this.infoWindow.open(this.map, marker);
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