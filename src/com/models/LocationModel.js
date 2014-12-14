define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var LocationModel = Backbone.Model.extend({
    	
    	initialize: function(attributes, options)
		{
			
		},
		
		/**
		 * return the full address of a location
		 * @param none
		 * @return {String} address
		 */
		getFullAddress: function() 
		{
			//can't reference class static properties from within an instance of that class
			var address = this.get("address"); 
			address += " " + this.get("city");
			address += " " + this.get("state");
			address += " " + this.get("zipcode");
			return address;
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