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
			p.play(0.2);
			document.getElementById('draggable-video').play();
			_this.pulse();
		});

		p.listen('ended',function(){

			$('.cover-overlay').fadeIn('slow',function(){


			$('#background').fadeOut();
			$('#main').fadeOut();
			p.destroy();

			document.getElementById('draggable-video').pause();
			$('.cover-overlay').unbind('click').click(function(){
        $(this).fadeOut('fast', function(){
          $(this).html( "Experiment Three" );
        });
				_this.loadActTwo();

			});

			});

		});

	},

	loadActThree: function(){

			$('#act-three').fadeIn();
      $('#draggable-video').attr("src", "media/stairs.mp4" );

			p2 = new Popcorn('#act-three-video');

			p2.listen('canplayall',function(){

				p2.cue(45.16,function(){
					console.log('Loading overlay');
					$('#top-right-overlay').fadeIn();
					var v=document.getElementById('top-right-overlay-video');
					v.play();
					v.addEventListener('ended',function(){
						$('#top-right-overlay').fadeOut("slow",function() {
						  p2.play();
						  v.src = "media/chris.mp4";
						  $(this).css({"left": "50px" });
						});
					});

				});

				p2.cue(49.75,function(){
					p2.pause();

				});

				p2.zeega({start:64.7, end:65.7, target:'los-sures-zeega-container', id:798, css: {'left':'0px', 'top':'0px' }, noEnd: true});

        document.getElementById( 'marta_audio' ).addEventListener( 'ended', function() {
          $( '#los-sures-zeega-container' ).fadeOut("slow");
          p2.play();
          p2.zeega({start:103, end: 125, target:'los-sures-zeega-container-2', id:800, css: {'left':'50px', 'top':'50px' }});

        });

				p2.cue(64.7,function(){
				  //console.log( "called!!!!!" );
				  document.getElementById( 'marta_audio' ).play();
					p2.pause();
				});

				p2.cue( 178.3, function() {
				  $('#top-right-overlay').fadeIn();
					var v=document.getElementById('top-right-overlay-video');
					v.play();
					this.pause();
					v.addEventListener('ended',function(){
						$('#top-right-overlay-video').fadeOut("slow");
						p2.play();
					});
				});

				p2.cue( 212, function() {
				  $('#main').css({"left":"30%", "z-index": "1002"}).fadeIn("slow", function() {
				    document.getElementById('draggable-video').play();
				  });
				  $('#main').draggable({axis:'x',drag:function(){
            p2.volume(Math.min( Math.max( parseFloat($('#main').css('left'))/window.innerWidth, 0), 1));
            document.getElementById('draggable-video').volume=1-p2.volume();
		      }});
		      this.cue( 223, function() {
		        if ( !document.getElementById('draggable-video').paused ) {
		          this.currentTime( 213 );
		        }
		      });
		      document.getElementById('draggable-video').addEventListener("ended", function() {
		        $("#main").fadeOut();
		        p2.volume(1);
		      });
				});

				p2.play();

			});



	},

	loadActOne : function( frame )
	{

		console.log('Loading Main');
		var _this=this;

		$('.cover-overlay').click(function(){
			_this.playTimeline();
			$(this).fadeOut('fast', function(){
			  $(this).html( "Experiment Two" );
			});
			return false;
		});

		$('#main').draggable({axis:'x', containment: [ parseInt(window.innerWidth*0.02),0,parseInt(window.innerWidth*0.72),0 ]});

	},

	loadActTwo : function( frame )
	{

	  var _this = this;
    $('#act-two').fadeIn();

    var r = new Ratiator( "video-right", "video-left");

    document.getElementById('video-right').play();
    document.getElementById('video-left').play();

    document.getElementById("video-right").addEventListener( "ended", function() {
      r.destroy();
      document.getElementById('video-right').pause();
      document.getElementById('video-left').pause();
      $('.cover-overlay').fadeIn("slow", function() {
        $('#act-two').fadeOut();
        $(this).unbind( "click").click(function() {
          $(this).fadeOut();
          console.log("asdf");
          _this.loadActThree();
        })
      });
    })
  }


}, Backbone.Events)


};
