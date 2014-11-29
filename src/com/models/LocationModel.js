define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.Model
    var LocationModel = Backbone.Model.extend({
    	
    	initialize: function(attributes, options)
		{
			
		},
    	
    });

    // Returns the class
    return LocationModel;

});