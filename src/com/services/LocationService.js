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
    				attributes["name"] = item["name"] ? item["name"] : "";
    				attributes["lat"] = item["latitude"] ? item["latitude"] : -1;
    				attributes["lng"] = item["longitude"] ? item["longitude"] : -1;
    				attributes["address"] = item["address"] ? item["address"] : "";
    				attributes["phone"] = item["phone"] ? item["phone"] : "";
    				attributes["url"] = item["url"] ? item["url"] : "";
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