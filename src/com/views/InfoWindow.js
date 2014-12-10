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
		model: null,
		
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
			this.model = marker.model;
			
			var self = this;
			var params = this.model.toJSON();
			params.address = this.model.getFullAddress();
			TemplateService.getTemplate(Constants.TEMPLATE_INFO_WINDOW, params, function(html){
	        	
	        	var options = {
					content: $(html).get(0),
					disableAutoPan: false,
					maxWidth: 0,
					pixelOffset: new google.maps.Size(-125, 20), //offset so info window is centered horizontally
					zIndex: null,
					/*boxStyle: { 
						background: "url('images/info_window_tip.png') no-repeat",
						opacity: 0.95,
						width: "280px"
					},*/
					//closeBoxMargin: "5px 5px 5px 5px",
					closeBoxURL: "", //"http://www.google.com/intl/en_us/mapfiles/close.gif",
					infoBoxClearance: new google.maps.Size(10, 10), //from edges of the map
					isHidden: false,
					alignBottom: false,
					pane: "floatPane",
					enableEventPropagation: false
				};
				self.base = new InfoBox(options);
		        self.base.open(map, marker);
		        
		        //set element reference and zoom button click handler
		        self.$el = $(options.content);
		        self.$el.find(".zoom").on("click", function() {
		        	map.setCenter(marker.position);
		        	map.setZoom(17);
		        });
	        	
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