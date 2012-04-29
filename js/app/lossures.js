// This contains the module definition factory function, application state,
// events, and the router.
this.lossures = {
	// break up logical components of code into modules.
	module: function()
	{
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an existing module.
		return function(name) 
		{
			// If this module has already been created, return it.
			if (modules[name]) return modules[name];

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({
	
	


	//this function is called once all the js files are sucessfully loaded
	init : function()
	{
		this.loadModules();
		this.isLoaded = true
		this.startRouter();
	},
	
	loadModules : function()
	{
	
	
	},
	
	startRouter: function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			routes: {
				""							: 'loadActOne',
				"connection/:connectionId"	: "goToConnection",

			},
			goToConnection : function( connectionId ){ _this.goToConnection( connectionId ) },
			loadActOne : function(  ){ _this.loadActOne() }
		});

		this.router = new Router();
		Backbone.history.start();
	},
	
	goToConnection : function(connectionId)
	{
		console.log('GO TO Connection: '+connectionId)
	},
	
	pulse : function(){
	
		_.delay(function(){
			$('.handle').animate({'opacity':0.1},250,'swing').animate({'opacity':0.5},250,'swing');
			
			_.delay(function(){ 
				$('.handle').animate({'opacity':0.1},250,'swing').animate({'opacity':0.5},250,'swing');
				
				_.delay(function(){
					$('.handle').animate({'opacity':0.1},250,'swing').animate({'opacity':0.5},250,'swing');
			
					_.delay(function(){ 
						$('.handle').animate({'opacity':0.1},250,'swing').animate({'opacity':0.5},250,'swing');
						},700);
				},1300);
				
				
				
				},700);
				
				
				
			},2000);
	},
	
	playTimeline: function(){
	
		var _this=this;
		var p = new Popcorn('#background-video'),
			p2;
			
		p.listen('canplayall',function(){
			p.currentTime(p.media.duration-5);
			
			
			p.play();
			document.getElementById('draggable-video').play();
			_this.pulse();
		});
		
		p.listen('ended',function(){
		
			$('.cover-overlay').html('act two').fadeIn('slow',function(){
			
			
			$('#background').fadeOut();
			$('#main').fadeOut();
			p.destroy();
			
			document.getElementById('draggable-video').pause();
			$('.cover-overlay').unbind('click').click(function(){
			
				_this.loadActTwo();
			
			});
			
			});
		
		});
		
		$('#main').draggable({axis:'x',drag:function(){
			p.volume(parseFloat($('#main').css('left'))/window.innerWidth);
			document.getElementById('draggable-video').volume=1-p.volume();
		}});
		

	},
	
	loadActTwo: function(){
		
			
			
			$('#act-two').fadeIn();
		
			
			
			p2 = new Popcorn('#act-two-video');
			
			p2.listen('canplayall',function(){
				
				p2.cue(45.16,function(){
					console.log('Loading overlay');
					$('#top-right-overlay').fadeIn()
					var v=document.getElementById('top-right-overlay-video');
					v.play();
					v.addEventListener('ended',function(){
						p2.play();
						$('#top-right-overlay-video').fadeOut();
					});
					
				});
				
				p2.cue(49.7,function(){
					p2.pause();
					
					
				});
				p2.zeega({start:64.7, end:100, target:'zeega-container', id:798, css: {'left':'50px', 'top':'50px' }});
		
				p2.cue(64.7,function(){
					p2.pause();	
				});
				
				p2.currentTime(40);
				p2.play();
			
			});
	
	
	
	},

	loadActOne : function( frame )
	{

		console.log('Loading Main');
		var _this=this;
		
		$('.cover-overlay').click(function(){
			_this.playTimeline();
			$(this).fadeOut('fast');
			return false;
		});
		
		
		
		
		
		$('body').keydown(function(e){
			if(e.keyCode==37){
				_this.draggableVideo.playVideo();
			}
			else if(e.keyCode==39){
				_this.backgroundVideo.playVideo();
			}
			else if(e.keyCode==38){
				$('#main').animate({'left':366},1500);
			}
		});
		
		
		
		/*
		zeega.app.load('tah-zeega-player',true);
		
		zeega.app.loadProject(796,function(){this.getFrameCount();},function(){});
		
		
	   
		var _this =this;
		
		
		var p = new Popcorn('#main-video');
		p.listen( 'canplay', function(){
			p.currentTime(10);
			p.play();
			});
			
		
		
		
		 */
		
	
	},
	

	
	loadPlayer: function(connection){
	
	
		/*
	
		var _this=this;
		var Connections = lossures.module("connections");
		
		
		
		
		
		this.navMaps=[
			new Connections.Views.NavMap({
				collection:connection.itemCollections[0],
				center_lat:connection.get('begin_lat'),
				center_lng:connection.get('begin_lng')
			}),
			new Connections.Views.NavMap({
				collection:connection.itemCollections[1],
				center_lat:connection.get('end_lat'),
				center_lng:connection.get('end_lng')
			})
		];
			
		
		$('#tah-map-top').append(this.navMaps[0].render());
		$('#tah-map-bottom').append(this.navMaps[1].render());
		
		$('#tah-player').fadeIn('fast',function(){
			_this.navMaps[0].addMap();
			_this.navMaps[1].addMap();
		});
		
		zeega.app.loadProject(796);
		_.each( _.toArray(this.navMaps[0].collection), function(itemModel){		
			itemModel.on('selected',function(){
				console.log(itemModel.id);
				if(itemModel.id%2==0)zeega.app.loadProject(80);
				else zeega.app.loadProject(796);
		});
		
		});
		
		*/
	
	},
	
	
	
}, Backbone.Events)


};
