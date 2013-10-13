define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "txt",
		    ids: Math.random().toString(36).substring(7) , 
		    content: 'Write Here',
		    width: 30,
			height: 20,
			x: 50,
			y: 50
		},


		events: {
		  "click button": "removeImg"
		},

		initialize: function(att) {
			if (att != null) {
				this.set({'module': att.module});
				this.set({'content': att.content});
				this.set({'width': att.width});
				this.set({'height': att.height});
				this.set({'x': att.x});
			}
		},

		removeImg: function (){
			var objectImg = '#'+ this.get('ids'); 
			 this.destroy ();
			 $(objectImg).remove().fadeOut('slow'); 
			 console.log('removing');
		},

		render: function () {
			var id = " id='"+this.get('ids') + "'";
			var xfinal = Math.round( this.get('x')*.01*$(window).width() );
			var yfinal = Math.round( this.get('y')*.01*$(window).height());
			var widthFinal = Math.round( this.get('width')*.01*$(window).width()); 
			var heightFinal = Math.round( this.get('height')*.01*$(window).height()); 

			var style = " style='position:absolute; top:"+yfinal + "px; left:"
				+ xfinal + "px;"+ " width:"+widthFinal+"px; height:"+ 
				heightFinal + "px;'"; 

			var html = '<div contenteditable="true" '+id+ style +'>' 
					   + this.get('content') +  '</div> '  ;

			$('#art	').append(html);


			//ADDING JQUERY
			var ids = '#'+this.get('ids'); 
			var that = this;

			// Delay dragging for a bit (100 ms)
			 //$(ids).draggable({delay: 10});
			 $('#example').tooltip('hello'); 
			 $(ids).dblclick(function(){      } );

			$(ids).dblclick(function(){ that.removeImg();   } );

			 



			$(ids).inflateText({ 
				maxFontSize: 14, minFontSize: 10, scale: 0.8 }); 

			  $(ids).mouseover(function(){
			  	$(ids).pep({
				  disableSelect: true
				}) 
				// $(ids).draggable({ disabled: true });
			    
			  });

			  $(ids).click(function(){
			  	$(ids).trigger( "focus" );
			  	$.pep.toggleAll(false);
			  }); 

			  $(ids).focusout(function(){
			  	$.pep.toggleAll(true); 
			  }); 

			 $(ids).resizable({ helper: "ui-resizable-helper", delay: 10,
			 	start: function( event, ui ) { console.log('here'); $.pep.toggleAll(false);},
			 	stop: function( event, ui ) {$.pep.toggleAll(true);}
			 });

			//$(id).tooltip('show');
			// // $('.del').hide(); 

			$(ids).click(function() {
				var position = $(ids).position();
				that.set({'x':     Math.round( position.left*100 / $(window).width() )  });
				that.set({'y':     Math.round( position.top *100 / $(window).height() ) });
				that.set({'width': Math.round( $(ids).width()*100 / $(window).width() ) });
				that.set({'height': Math.round( $(ids).height()*100 / $(window).height() ) });
				that.set({'content': $(ids).text()  });
			});

			$(ids).mouseover(function() {
				var position = $(ids).position();
				that.set({'x':     Math.round( position.left*100 / $(window).width() )  });
				that.set({'y':     Math.round( position.top *100 / $(window).height() ) });
				that.set({'width': Math.round( $(ids).width()*100 / $(window).width() ) });
				that.set({'height': Math.round( $(ids).height()*100 / $(window).height() ) });
				that.set({'content': $(ids).text()    });

			});




			// $(id).mouseover(function(){ $('.del').show();  });
			// $(id).mouseout(function(){ $('.del').hide();  });
			// $(id).dblclick(function(){ that.removeImg();   } );
			// $(id).click(function(){ $(id).focus();  } );

      	}


	});
});