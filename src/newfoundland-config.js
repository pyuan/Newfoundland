var NewfoundlandConfig = 
{
	
	//if set to true, print debug console statements
	DEBUG_MODE : false,
	
	//API key for google maps, optional
	//can be found in your Google API console, if true, allows usage to be tracked
	GOOGLE_MAPS_API_KEY : "",
	
	//full url path for the locations csv data file 
	LOCATIONS_CSV_FILE_URL : "",
	
	//css selector to create the widget in
	MAIN_CONTAINER_CSS_SELECTOR : "#map-container",
	
	//full path to the marker image
	MAP_MARKER_IMAGE : "",
	
	//REQUIERD prefix for loading components
	RESOURCE_URL : "",
	
	/**
	 * get url variable
	 * source: http://stackoverflow.com/a/21903119
 	 * @param {String} sParam
 	 * @return {String} value
	 */
	getUrlParameter: function(sParam) 
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	},
	
	/**
	 * append javascript files to the head
	 * @param {String} filePath
	 */
	loadJS: function(filePath) {
		var script = $("<script/>").attr("type", "text/javascript").attr("src", filePath);
		$("head").append(script);
	}
	
};

$(function() {
	
	//set configs based on url vars
	NewfoundlandConfig.LOCATIONS_CSV_FILE_URL = NewfoundlandConfig.getUrlParameter("csv");
	NewfoundlandConfig.GOOGLE_MAPS_API_KEY = NewfoundlandConfig.getUrlParameter("apiKey");
	NewfoundlandConfig.MAP_MARKER_IMAGE = NewfoundlandConfig.getUrlParameter("markerIcon");
	
	//load rest of required js files
	NewfoundlandConfig.loadJS("com/libs/require.js");
	NewfoundlandConfig.loadJS("newfoundland.js");
	
});
