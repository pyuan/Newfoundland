define([
		
		"jquery", 
		"backbone",
		"handlebars",
		"com/models/Constants",
		
	], function($, Backbone, Handlebars, Constants) {

	var TemplateService = Backbone.Model.extend({},
	
	{
		
		/**
		 * process a handlebar template
		 * @param template, name string to the template without the extension
		 * @param params, object to process the handlebar template
		 * @param onTemplateHandler, function to receive the post processed html of the template
		 * @param async, boolean [optional], default is false
		 */
		getTemplate: function(template, params, onTemplateHandler, async)
		{
			$.ajax({
				type: "GET",
				url: Constants.RESOURCE_URL + "/" + Constants.FOLDER_TEMPLATES + template + Constants.EXTENSION_TEMPLATES,
				async: typeof async =="undefined" ? false : async,
				cache: true,
				dataType: "text",
				success: function(data){
					var template = Handlebars.compile(data);
					var html = params ? template(params) : template({});
					
					if(onTemplateHandler){
						onTemplateHandler(html);
					}
				}
			});	
		},
			
	});

	return TemplateService;

}); 