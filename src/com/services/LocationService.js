define([ 
		
		"jquery", 
		"backbone",
		"com/services/DataService",
		"com/services/DebugService",
		"com/models/LocationModel",
		"com/collections/LocationModelCollection",
		"com/utils/DataUtils",
	
	], function( $, Backbone, DataService, DebugService, LocationModel, LocationModelCollection, DataUtils ) {
		
    // Extends Backbone.Model
    var LocationService = Backbone.Model.extend({}, {
    	
		/**
    	 * get a location model collection from a csv data file 
 		 * @param {Object} onLocations
    	 */
    	getLocations: function(onLocations)
    	{
    		var onDataHandler = function(json) 
    		{
    			var locations = [];
    			for(i in json) {
    				var item = json[i];
    				var attributes = {};
    				attributes[LocationModel.PROPERTY_KEYS.NAME] = item["name"] ? item["name"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.LATITUDE] = item["latitude"] ? item["latitude"] : -1;
    				attributes[LocationModel.PROPERTY_KEYS.LONGITUDE] = item["longitude"] ? item["longitude"] : -1;
    				attributes[LocationModel.PROPERTY_KEYS.ADDRESS] = item["address"] ? item["address"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.CITY] = item["city"] ? item["city"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.STATE] = item["state"] ? item["state"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.ZIPCODE] = item["zipcode"] ? item["zipcode"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.PHONE] = item["phone"] ? item["phone"] : "";
    				attributes[LocationModel.PROPERTY_KEYS.URL] = item["url"] ? item["url"] : "";
    				var location = new LocationModel(attributes);
    				locations.push(location);
    			}
    			var collection = new LocationModelCollection(locations);
    			DebugService.println("Locations data loaded", collection);
    			
    			if(onLocations) {
    				onLocations(collection);
    			}	
    		}
    		DataService.getLocationsCSV(onDataHandler);
    	},
    	
    	/**
    	 * filter a LocationModelCollection with the given key
		 * @param {LocationModelCollection} locations
		 * @param {String} key
		 * @return {Object} results
    	 */
    	search: function(locations, key)
    	{
    		var results = []
        	locations.each(function(location) {
        		var name = location.get(LocationModel.PROPERTY_KEYS.NAME);
        		var address = location.getFullAddress();
        		var nameMatchIndex = name.toLowerCase().indexOf(key.toLowerCase());
        		var addressMatchIndex = address.toLowerCase().indexOf(key.toLowerCase());
        		if(nameMatchIndex != -1 || addressMatchIndex != -1) 
        		{
        			var result = {location: location, nameIndex: nameMatchIndex, addressIndex: addressMatchIndex};
        			results.push(result);
        		}
        	});
        	
        	return results;
    	},	
    	
    	/**
    	 * get the label for a search result
 		 * @param {Object} result, contains Locationmodel, nameIndex, addressIndex
 		 * @param {String} searchKey, used to stylize result label
 		 * @return {String} label
    	 */
    	getSearchResultLabel: function(result, searchKey)
    	{
    		var label = "";
    		var location = result.location;
    		if(result.nameIndex != -1) {
    			var name = location.get(LocationModel.PROPERTY_KEYS.NAME);
    			label = DataUtils.boldKeyInString(name, searchKey);
    		}
    		else if(result.addressIndex != -1) {
    			var address = location.getFullAddress();
    			label = DataUtils.boldKeyInString(address, searchKey);
    		}
    		return label;
    	},
    	
    });

    // Returns the class
    return LocationService;

});