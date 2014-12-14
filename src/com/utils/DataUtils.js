define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var DataUtils = Backbone.Model.extend({}, {
    	
    	/**
    	 * remove comments from the csvString
    	 * @param {String} csvString
    	 * @return {String} csvString
    	 */
    	cleanCSVString: function(csvString)
    	{
    		var arr = csvString.split("\n");
    		for(var i in arr) 
    		{
    			var item = arr[i];
    			if(item.length == 0 || item[0] == "\"") {
    				arr.splice(i, 1);
    			}
    		}
    		
    		csvString = arr.join("\n");
    		return csvString;
    	},
    	
    	/**
    	 * remove empty property names and return a json array of objects 
    	 * remove properties with empty values
 		 * @param {Object} csvJSON
 		 * @return jsonArray, array of objects
    	 */
    	cleanCSVJSON: function(csvJSON)
    	{
    		var jsonArray = [];
			for(i in csvJSON) 
			{
				var item = csvJSON[i];
				var copy = {};
				var hasAtLeastOneValidProperty = false;
				for(property in item) 
				{
					var value = item[property];
					if(property.length > 0 && String(value).length > 0) {
						copy[property.toLowerCase()] = item[property];
						hasAtLeastOneValidProperty = true
					}
				}
				
				if(hasAtLeastOneValidProperty) {
					jsonArray.push(copy);					
				}
			}
			return jsonArray;
    	},
    	
    	/**
    	 * bold the key in some string and return the html markup of the bolded string
		 * @param {String} string
		 * @param {String} searchKey
		 * @return {String} boldedString
    	 */
    	boldKeyInString: function(string, searchKey)
    	{
    		var startIndex = string.toLowerCase().indexOf(searchKey.toLowerCase());
			var boldedString = string.substring(0, startIndex);
			boldedString += "<span class='match'>" + string.substr(startIndex, searchKey.length) + "</span>";
			boldedString += string.substring(startIndex + searchKey.length);
			return boldedString;
    	},
    	
    });

    // Returns the class
    return DataUtils;

});