define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "txt",
		    ids: Math.random().toString(36).substring(7) + Date.now(), 
		    content: 'Write Here',
		    width: 30,
			height: 20,
			x: 50,
			y: 50
		},


		events: {
		  "click button": "removeImg",
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

		render: function (showcase) {
			this.set({'ids': Math.random().toString(36).substring(7) + Date.now()  });
			var id = " id='"+this.get('ids') + "'";
			var ids2 = " id='"+this.get('ids') + "2'"+'';
			var ids3 = " id='"+this.get('ids') + "3'"+'';
			var xfinal = Math.round( this.get('x')*.01*$(window).width() );
			var yfinal = Math.round( this.get('y')*.01*$(window).height());
			var widthFinal = Math.round( this.get('width')*.01*$(window).width()); 
			var heightFinal = Math.round( this.get('height')*.01*$(window).height()); 

			var style = " style='display:inline-block;  position:absolute; top:"+yfinal + "px; left:"
				+ xfinal + "px;"+ " width:"+widthFinal+"px; height:"+ 
				heightFinal + "px;'"; 

			var html = '<div '+id+style+' >'+
				'<div '+ids3+' class="txta"><button class="close txtclose">×</button></div>'+ 
				'<p '+ids2+' class="txtFormat" contenteditable="true">'+
				this.get('content') +
				'</p></div>';

			if ($(window).width() < 600){
				style = " style='width:100%;'"; 

				 html = '<div '+id+style+' >'+
					'<div '+ids3+'class="txta"><button class="close txtclose">×</button></div>'+ 
					'<p '+ids2+' class="txtFormat" contenteditable="true">'+
					this.get('content') +
					'</p></div>';

				console.log('smaller devices');
			}

			$('#art').append(html);

			var ids = '#'+this.get('ids');
			ids2 = '#'+this.get('ids')+'2';
			ids3 = '#'+this.get('ids')+'3';

			 console.log(html);


			// $(ids2).inflateText({ 
			// 		maxFontSize: 14, minFontSize: 10, scale: 0.8 
			// }); 

			$('p').inflateText({ maxFontSize: 12, minFontSize: 8, scale: 0.4 });


			//ADDING JQUERY
			$(ids3).css('visibility', 'visible' );

			if (showcase || showcase == null || $(window).width() > 600 ){
				console.log('less');
				var that = this;
				$(ids).draggable();

				$(ids).mouseover(function(){
					$(ids3).css('visibility', 'visible' );
					$(ids).css('border', '1px solid black' );
					save(); 
				})

				$(ids).mouseout(function(){
					$(ids3).css('visibility', 'hidden' );
					$(ids).css('border', '0px solid black' );
					save();
				})

				$(ids2).on("mousedown", function (e) {
					console.log('here');
				    e.stopPropagation();
				    save(); 
				    return ;
				});

				$(ids2).on("touchleave", function (e) {
				    e.stopPropagation();
				    save(); 
				    return ;
				});

				$(ids).resizable({
			      helper: "ui-resizable-helper"
			    });

			    $( ids3 ).on( "resize", function( event, ui ) {save(); } );
		

				$(ids).click(function() {
					save(); 
				});

				 function save (){
				 	var position = $(ids).position();
					that.set({'width': Math.round( $(ids).width()*100 / $(window).width() ) });
					that.set({'height': Math.round( $(ids).height()*100 / $(window).height() ) });
					that.set({'x':     Math.round( position.left*100 / $(window).width() )  });
					that.set({'y':     Math.round( position.top *100 / $(window).height() ) });
					that.set({'content': $(ids2).text()  });
				 }
		

				// $(id).mouseover(function(){ $('.del').show();  });
				// $(id).mouseout(function(){ $('.del').hide();  });
				 $(ids3 + ' button').click(function(){ that.removeImg();   } );
				// $(id).click(function(){ $(id).focus();  } );
		}

		else {
			$('p').attr("contentEditable", "false");
			console.log('true');
		}

      }


	});
});