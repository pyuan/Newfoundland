define([ 
		
		"jquery", 
		"backbone",
		"com/models/LocationModel",
	
	], function( $, Backbone, LocationModel ) {
		
    // Extends Backbone.Collection
    var LocationModelCollection = Backbone.Collection.extend({
    	
    	/**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(item) {
    			return item.get("name"); 
			};
        },

        model: LocationModel,
    	
    });

    // Returns the class
    return LocationModelCollection;

});