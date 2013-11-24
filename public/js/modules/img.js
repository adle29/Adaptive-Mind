define([], function (){
	return Backbone.Model.extend ({
		 defaults: {
		    module: "img",
		    ids: Math.random().toString(36).substring(7) , 
		    Ourl: '', 
		    width: 10,
			height: 'auto',
			x: 10,
			y: 30
		  },

		  events: {
		  	"click button": "removeImg"
		  },


		initialize: function(att) {
			if (att != null) {
				this.set({'module': att.module});
				this.set({'Ourl': att.Ourl});
				this.set({'width': att.width});
				this.set({'height': att.height});
				this.set({'x': att.x});
				this.set({'y': att.y});
			}

		},

		removeImg: function (){
			var objectImg = '#'+ this.get('ids'); 
			 this.destroy ();
			 $(objectImg).remove().fadeOut('slow'); 
			 console.log('removing');
		},



		render: function (showcase) {

			var that = this, widthFinal, yfinal, xfinal, yinitial, xinitial;
			var id = " id='"+this.get('ids') + "'";
			var id2 = " id='"+this.get('ids') + "2'";
			var idEliminate = " id='"+this.get('ids') + "eliminate'";
			//IMAGE HTML 

			xfinal = Math.round( this.get('x')*.01*$(window).width() );
			yfinal = Math.round( this.get('y')*.01*600 );
			widthFinal = Math.round( this.get('width')*.01*$(window).width()); 
			heightFinal = Math.round( this.get('height')*.01*$(window).width()) ; 

	

			var position = " style='display:inline-block; position:absolute; left:"+xfinal +"px; top:" 
							+yfinal+ "px;'";

			var deleteIcon = "<button"+idEliminate+" class='btn btn-xs btn-danger imgClose'>X</button> ";



			if (showcase || showcase == null && $(window).width() > 600  ){
			var html = "<div   "+ id + position + "> <img class='pict' "+ id2 +" src='" + this.get('Ourl') 
					   + "' style='width:"+ widthFinal +"px;  height:auto; ' />"+deleteIcon+"  </div> "  ;

		    }
		    else {
			var html = "<div   "+ id + position + "> <img class='pict' "+ id2 +" src='" + this.get('Ourl') 
					   + "' style='width:"+ widthFinal +"px;  height:auto; ' />  </div> "  ;		    	
		    }
		    
		    if ($(window).width() < 600){
			 html = "<div"+ id + "> <img "+ id2 +" src='" + this.get('Ourl') 
					   + "'  width='100%' height='auto' "  + " />"  ;
					   console.log('smaller display');
			}

			//RENDERING IMAGE
			$('#art').append(html);
			console.log( 'showcase', showcase);
			//ADDING JQUERY
			if (showcase || showcase == null && $(window).width() > 600  ){
				id = '#'+this.get('ids'); 
				id2 = '#'+this.get('ids')+'2'; 
				idEliminate = '#'+this.get('ids') + "eliminate";
				$('.del').hide(); 


				$(id2).resizable({handles: 'se'});
				$(id).draggable({
				    appendTo: 'body',
				    containment: "#art", cursor: "crosshair", 
				    start: function(event, ui) {
				        isDraggingMedia = true;
				    },
				    stop: function(event, ui) {
				        isDraggingMedia = false;
				    }
				});

	                $(".ui-wrapper").css('position', 'absolute');
	                $(id2).css('height', 'auto');
	                $(id).css('position', 'absolute');
	                $(".ui-wrapper").css('height', 'auto');
	                $(id).css('height', 'auto');

				$(id).mouseup(function() {
					save();
				});

				$(id).mouseover(function(){ 
					save();
				  });

				$(id).mouseout(function(){ $('.del').hide();  });
				$(idEliminate).click(function(){ that.removeImg()   } );


				function save(){
										var position = $(id).position();
					that.set({'x':     Math.round( position.left*100 / $(window).width() )  });
					that.set({'y':     Math.round( position.top *100 / 600 ) });
					that.set({'width': Math.round( $(id2).width()*100 / $(window).width() ) });
					that.set({'height': Math.round( $(id2).height()*100 / 600 ) });
				}



			}
      	}


	});
});