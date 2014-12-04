define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/services/DebugService",
		"com/services/TemplateService",
	
	], function( $, Backbone, Constants, DebugService, TemplateService ) {
		
    // Extends Backbone.View
    var InfoWindow = Backbone.View.extend( {
		
		base : null,
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) {
			
        },
        
        /**
         * open the info window
         * load info window html markup from a template
         * @param {google.maps.Map} map
         * @param {google.maps.marker} marker 
         */
        open: function(map, marker)
        {
        	var self = this;
			var model = marker.model;
			var params = {address: model.getFullAddress()}
			TemplateService.getTemplate(Constants.TEMPLATE_INFO_WINDOW, params, function(html){
	        	
	        	var options = {
					content: $(html).get(0),
					disableAutoPan: false,
					maxWidth: 0,
					pixelOffset: new google.maps.Size(-100, 0),
					zIndex: null,
					/*boxStyle: { 
						//background: "url('tipbox.gif') no-repeat",
						opacity: 0.75,
						width: "280px"
					},*/
					closeBoxMargin: "5px 5px 5px 5px",
					closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
					infoBoxClearance: new google.maps.Size(5, 5), //from edges of the map
					isHidden: false,
					alignBottom: false,
					pane: "floatPane",
					enableEventPropagation: false
				};
				self.base = new InfoBox(options);
		        self.base.open(map, marker);
	        	
	        });
       	},
        
        /**
         * close the info window
         * @param none
         */
        close: function()
        {
        	if(this.base) {
        		this.base.close();
        	}
        },

    });

    // Returns the View class
    return InfoWindow;

});