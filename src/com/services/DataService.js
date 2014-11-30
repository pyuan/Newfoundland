define([ 
		
		"jquery", 
		"backbone",
		"jquerycsv",
		"com/models/Constants",
		"com/utils/DataUtils",
	
	], function( $, Backbone, jquerycsv, Constants, DataUtils ) {
		
    // Extends Backbone.Model
    var DataService = Backbone.Model.extend({}, {
    	
		/**
    	 * send ajax request to load the locations data from a csv file 
 		 * @param {Object} onDataHandler
    	 */
    	getLocationsCSV: function(onDataHandler)
    	{
    		$.ajax({
				type: "GET",
				url: Constants.LOCATION_DATA_URL,
				cache: false,
				success: function(csv)
				{
					var csvJson = $.csv.toObjects(csv);
					var jsonArray = DataUtils.cleanCSVJSON(csvJson);

					if(onDataHandler) {
						onDataHandler(jsonArray);
					}
				}
			});
    	}    	
    	
    });

    // Returns the class
    return DataService;

});