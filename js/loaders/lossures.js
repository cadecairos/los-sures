/********************************************

	MAIN.JS
	
	VERSION 0.1
	
	LOADS JS FILES


*********************************************/
require.config({
	baseUrl :'js/',
	paths : {
		'order' : 'lib/order',
		'text' : 'lib/text'
	}
})

var loadFiles = [
	'order!lib/jquery-1.7.1.min',




	//libraries
	'order!lib/underscore',
	'order!lib/backbone',
	'order!lib/jquery/ui/js/jquery-ui.min',	
	'order!lib/leaflet/leaflet',
	'order!lib/popcorn_flash',

	//core
	'order!app/lossures',
	'order!lib/bootstrap',


	
	
	//zeega
	'order!app/zeega.project-viewer',
	'order!app/zeega.player',
	
	'order!helpers/zeega.helpers',
	'order!helpers/zeega.extends',
	
	'order!lib/spin',
	'order!lib/jquery/plugins/spin',
	
	

	'order!app/views/editor.layer/editor.view.layer.layer-list',
	'order!app/views/editor.layer/editor.view.layer.visual-editor',
	'order!app/models/editor.model.layer',

	'order!plugins/layers/video/video',
	'order!plugins/layers/audio/audio',
	'order!plugins/layers/image/image',
	'order!plugins/layers/geo/geo',
	'order!plugins/layers/text/text',
	'order!plugins/layers/mapbox/mapbox',

	'order!plugins/layers/rectangle/rectangle',

	       
	'order!plugins/players/plyr',
		
	
	'order!plugins/popcorn.zeega',
	
	
	//app
		
	'order!app/index',
	

	];

require(loadFiles, function(jquery)
{
    console.log('ALL JS LOADED');
    zeega.app.init();
});
