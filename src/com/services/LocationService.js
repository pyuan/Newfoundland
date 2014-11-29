define([ 
		
		"jquery", 
		"backbone",
		"com/services/DataService",
		"com/models/LocationModel",
		"com/collections/LocationModelCollection",
	
	], function( $, Backbone, DataService, LocationModel, LocationModelCollection ) {
		
    // Extends Backbone.Model
    var LocationService = Backbone.Model.extend({}, {
    	
		/**
    	 * get a location model collection from a csv data file 
 		 * @param {Object} onLocations
    	 */
    	getLocations: function(onLocations)
    	{
    		var onDataHandler = function(json) {
    			var locations = [];
    			for(i in json) {
    				var item = json[i];
    				var attributes = {};
    				attributes[LocationModel.PROPERTY_KEYS.NAME] = item["name"] ? item["name"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.LATITUDE] = item["latitude"] ? item["latitude"] : -1;
    				attributes[LocationModel.PROPERTY_KEYS.LONGITUDE] = item["longitude"] ? item["longitude"] : -1;
    				attributes[LocationModel.PROPERTY_KEYS.ADDRESS] = item["address"] ? item["address"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.PHONE] = item["phone"] ? item["phone"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.URL] = item["url"] ? item["url"] : "";
    				var location = new LocationModel(attributes);
    				locations.push(location);
    			}
    			var collection = new LocationModelCollection(locations);
    			
    			if(onLocations) {
    				onLocations(collection);
    			}	
    		}
    		DataService.getLocationsCSV(onDataHandler);
    	}    	
    	
    });

    // Returns the class
    return LocationService;

});