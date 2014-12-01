define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var LocationModel = Backbone.Model.extend({
    	
    	initialize: function(attributes, options)
		{
			
		},
    	
    }, 
    {
    	
    	PROPERTY_KEYS : {
    		NAME : "name",
    		LATITUDE : "lat",
    		LONGITUDE : "lng",
    		ADDRESS : "address",
    		CITY : "city",
    		STATE : "state",
    		ZIPCODE : "zipcode",
    		PHONE : "phone",
    		URL : "url"
    	}
    		
    });

    // Returns the class
    return LocationModel;

});