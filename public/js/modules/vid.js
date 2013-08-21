define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "vid",
		    ids: Math.random().toString(36).substring(7) , 
		    Ourl: '', 
		    width: 560,
			height: 315,
			x: 0,
			y: 100
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

			var id = " id='"+this.get('ids') + "'";

			var position = " style='position:absolute; top:"+this.get('y') + "px; left:"
							+ this.get('x') + "px;"+ " width:"+this.get('width')+"px; height:"+ 
							this.get('height') + "px;'"; 

			var html = '<div class="pict2" '+ id + position +'>' + "<iframe src='" + this.get('Ourl') 
					   +"' class='drag ' " + " allowfullscreen></iframe>" + '</div>'  ;


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
				console.log(that.get('width'),that.get('height'));
			});

			$(id).mouseover(function(){ $('.del').show();  });
			$(id).mouseout(function(){ $('.del').hide();  });
			$(id).dblclick(function(){ that.removeImg()   } );



      	}

		// render: function () {
  //       	var html = "<iframe width='"+this.jsonObject.width+"' height='"+this.jsonObject.height+"' src='"+ this.jsonObject.url +
  //       			   "' class='"+ this.jsonObject.classess +"' allowfullscreen></iframe>";

		// 	$('#cont').append(html);
		// 	$('.drag').draggable({ containment: "#cont" });
  //       	console.log('I am an image ', this.jsonObject.x, this.jsonObject.y, this.url );
  //     	}


	});
});