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
		"com/views/SearchBar",
	
	], function( $, Backbone, CSV, LocationModelCollection, Constants, LocationModel, 
		LocationService, DebugService, ConfigService, TemplateService, InfoWindow, SearchBar ) {
		
    // Extends Backbone.View
    var NewfoundlandMap = Backbone.View.extend( {
		
		map: null,
		bounds: null,
		infoWindow: null,
		searchBar: null,
		markers: null,
		
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
         * Renders the view from template
         * @param none
         */
        render: function() 
        {
        	var self = this
        	TemplateService.getTemplate(Constants.TEMPLATE_MAP, {}, function(html) {
        		var element = $(html).addClass(Constants.ROOT_CONTAINER_CSS_CLASS);
        		self.$el.html(element);
        		self.createMap();
        		
        		var params = {el: self.$el.find(".search-container"), collection: self.collection, map: self};
        		self.searchBar = new SearchBar(params);
        	});
        	
        	this.$el.on("click", ".reset", function() {
    			self.recenterMap();
    		});
    		
    		this.$el.on("click", ".resetToUser", function() {
    			self.recenterMapToUser();
    		});
        	
            return this; //Maintains chainability
        },
        
        /**
         * initialize google map in provided container element
         * @param none
         */
        createMap: function() 
        {
        	//if no container specified, stop creating map
			var container = this.$el.find(".map").get(0);
			if(!container) {
				return;
			}
			
			var mapOptions = {
				zoom: 1, //set default zoom level
				mapTypeControl: false,
				panControl: false,
			    zoomControl: true,
			    zoomControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    scaleControl: true,
			    streetViewControl: false,
			    streetViewControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    }
			};
			this.map = new google.maps.Map(container, mapOptions);
			
			var self = this;
			this.bounds = new google.maps.LatLngBounds();
			this.markers = [];
			self.collection.each(function(location) {
				var marker = self.createMarker(location);
				self.markers.push(marker);
				self.bounds.extend(marker.getPosition());
			});
			
			//center to fit all markers
			var markerCluster = new MarkerClusterer(this.map, this.markers);
			this.recenterMap();
		},
		
		/**
		 * zoom to show all markers and center 
		 * @param none
		 */
		recenterMap: function() 
		{
			if(this.infoWindow) {
				this.infoWindow.close();	
				this.infoWindow = null;
			}
			
			this.map.setZoom(0); //change zoom to fix cluster marker disappearing bug
			var defaultToContinentalUS = ConfigService.getConfig("DEFAULT_ZOOM_TO_CONTINENTAL_US") == "true";
			if(defaultToContinentalUS) {
				var centerOfUS = new google.maps.LatLng(39.833333, -98.583333);
				this.map.setCenter(centerOfUS);
				this.map.setZoom(4);
			} else {
				this.map.fitBounds(this.bounds);
			}
			
			DebugService.println("Reset Map", "");
		},
		
		/**
		 * center map to a google.maps.LatLng object
		 * @param {google.maps.LatLng} location
		 */
		centerMap: function(location) {
			this.map.setCenter(location);
			this.map.setZoom(0);
			this.map.setZoom(12);
		},
		
		/**
		 * zoom to center to where the user is
		 * @param none
		 */
		recenterMapToUser: function()
		{
			if(navigator.geolocation) 
			{
				var self = this;
				var button = this.$el.find(".resetToUser").addClass("loading");
				navigator.geolocation.getCurrentPosition(function(position) {
					
					if(self.infoWindow) {
						self.infoWindow.close();	
						self.infoWindow = null;
					}
					
					button.removeClass("loading");
					var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					self.map.setCenter(location);
					self.map.setZoom(0); //to trigger refresh
					self.map.setZoom(12);
					DebugService.println("Center map to user", position);
					
			    }, function() {
			    	
			    	button.removeClass("loading");
			    	self.recenterMap();
			    	DebugService.println("User location not accessible", "");
			    	
			    }, {timeout: 10000});
			}
			else {
				alert("Geolocation is not supported by this browser.");
			}
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
			if(markerImage) 
			{
				var icon = 
				{
					url: markerImage,
				    size: new google.maps.Size(35, 35), // This marker is 35 pixels wide by 35 pixels tall.
				    origin: new google.maps.Point(0, 0), // The origin for this image is 0,0.
				    anchor: new google.maps.Point(17, 17) // The anchor for this image is the base of the center point at 17,17
				};
				options.icon = icon;
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
			if(this.infoWindow && this.infoWindow.model !== marker.model) {
				this.infoWindow.close();
			}
			
			//allow info window to be toggled
			if(!this.infoWindow || this.infoWindow.model !== marker.model || 
				(this.infoWindow && !this.infoWindow.isOpen())) 
			{
				this.infoWindow = new InfoWindow();
				this.infoWindow.open(this.map, marker);
			}
			else {
				this.infoWindow.close();
				this.infoWindow = null;
			}
		},
		
		/**
		 * zoom in and center on a marker
		 * @param {LocationModel} location
		 */
		showMarker: function(location)
		{
			var marker;
			for(var i=0; i<this.markers.length; i++) {
				marker = this.markers[i];
				var model = marker.model;
				if(location === model) {
					break;
				}
			}
			
			this.map.setCenter(marker.position);
		    this.map.setZoom(Constants.MAP_MARKER_ZOOM_LEVEL);
		    this.onMarkerClick(marker);
		},
		
		/**
		 * force hide the info window
		 * @param none
		 */
		hideInfoWindow: function() {
			if(this.infoWindow) {
				this.infoWindow.close();
			}
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