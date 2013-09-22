define([], function (){
	return Backbone.Model.extend ({
		 defaults: {
		    module: "img",
		    ids: Math.random().toString(36).substring(7) , 
		    Ourl: '', 
		    width: 200,
			height: 200,
			x: 100,
			y: 150
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

		render: function () {

			var that = this;

			//IMAGE HTML 
			// var deleteButton = '<button id="del" style="position:absolute; top:-15px; right:-5px;" type="button" class="del">'+
			// 				   '&#10006; </button>';

		

			var id = " id='"+this.get('ids') + "'";

			var position = " style='position:absolute; top:"+this.get('y') + "px; left:"
							+ this.get('x') + "px;"+ " width:"+this.get('width')+"px; height:"+ 
							this.get('height') + "px;'"; 

			var html = '<div class="pict"'+ id + position +'>' + "<img src='" + this.get('Ourl') 
					   +"' class='drag' " + " />" + '</div>'  ;


			console.log(html);
			//RENDERING IMAGE
			$('#cont').append(html);

			//ADDING JQUERY
			var id = '#'+this.get('ids'); 
			$('.del').hide(); 

			$(id).draggable({ containment: "#cont" });

 			$(id).resizable();

			$(id).mouseup(function() {
				var position = $(id).position();
				that.set({'x': position.left });
				that.set({'y': position.top });
				that.set({'width': $(id).width() });
				that.set({'height': $(id).height()  });

			});

			$(id).mouseover(function(){ $('.del').show();  });
			$(id).mouseout(function(){ $('.del').hide();  });
			$(id).dblclick(function(){ that.removeImg()   } );


      	}


	});
});