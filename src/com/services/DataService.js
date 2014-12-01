define([ 
		
		"jquery", 
		"backbone",
		"jquerycsv",
		"com/models/Constants",
		"com/utils/DataUtils",
		"com/services/ConfigService",
	
	], function( $, Backbone, jquerycsv, Constants, DataUtils, ConfigService ) {
		
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
				url: ConfigService.getConfig("LOCATIONS_CSV_FILE_URL"),
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