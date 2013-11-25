define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "vid",
		    ids: Math.random().toString(36).substring(7) , 
		    Ourl: '', 
		    width: 42.0,
			height: 31.5,
			x: 30,
			y: 60
		},

		events: {
		  	"click button": "removeImg"
		},


		initialize: function(att) {
			if (att != null) {
				this.set({'module': 'vid'});
				this.set({'Ourl': att.Ourl });
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
			console.log(this); 
			var that = this, widthFinal, yfinal, xfinal, yinitial, xinitial;
			var id = " id='"+this.get('ids') + "'";
			var id2 = " id='"+this.get('ids') + "2'";
			var url = this.get('Ourl') ; 
			var idEliminate = " id='"+this.get('ids') + "eliminate'";

			//IMAGE HTML 

			xfinal = Math.round( this.get('x')*.01*$(window).width() );
			yfinal = Math.round( this.get('y')*.01*600 );
			widthFinal = Math.round( this.get('width')*.01*$(window).width()); 
			heightFinal = Math.round( this.get('height')*.01*600) ; 
			//url = getVideoString(this.get('Ourl')); 
			var deleteIcon = "<button"+idEliminate+" class='btn btn-xs btn-danger imgClose'>X</button> ";


			var position = " style='display:inline-block; position:absolute; left:"+xfinal +"px; top:" 
							+yfinal+ "px; width:"+ widthFinal +"px;  height:"+heightFinal+"px; '" 


		    console.log(html);

		    if (showcase || showcase == null && $(window).width() > 600  ){
			var html = "<div  class='pict' "+ id + position + ">"+deleteIcon+" <iframe  "+ id2 +" src='//" + url
					   + "' style='width:100%;  height:100%;  padding:15px;'"  + " frameborder='0' allowfullscreen ></iframe>"  ;

		    }
		    else {
			var html = "<div  class='pict' "+ id + position + "> <iframe  "+ id2 +" src='//" + url
					   + "' style='width:100%;  height:100%;  '"  + " frameborder='0' allowfullscreen ></iframe>"  ;    	
		    }
		    
		    if ($(window).width() < 600 ){
			 		html = "<iframe  src='//" + this.get('Ourl') 
					   + "'  width='100%' height='315' " + " frameborder='0' allowfullscreen ></iframe>" 
					   console.log('smaller display');
			}

			//RENDERING IMAGE
			$('#art').append(html);

			//ADDING JQUERY
			if (showcase || showcase == null && $(window).width() > 600  ){
				id = '#'+this.get('ids'); 
				id2 = '#'+this.get('ids')+'2'; 
				idEliminate = '#'+this.get('ids') + "eliminate";
				$('.del').hide(); 


				$(id).resizable({handles: 'se'});
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

		
					//$(id).pep(); 
		 		//$(id).draggable({ containment: "#art", cursor: "crosshair" });

	                $(".ui-wrapper").css('position', 'absolute');
	               // $(id2).css('height', 'auto');
	                $(id).css('position', 'absolute');

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
					that.set({'width': Math.round( $(id).width()*100 / $(window).width() ) });
					that.set({'height': Math.round( $(id).height()*100 / 600 ) });

				}

				//work please


			}
      	}


	});
});




	
