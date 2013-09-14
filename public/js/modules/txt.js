define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "txt",
		    ids: Math.random().toString(36).substring(7) , 
		    content: '',
		    width: 300,
			height: 200,
			x: 0,
			y: 100
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

			var position = " style='position:absolute; top:"+this.get('y') + "px; left:"
				+ this.get('x') + "px;"+ " width:"+this.get('width')+"px; height:"+ 
				this.get('height') + "px;'"; 

			var html = '<div '+id+ position +'> <div contenteditable="true" class="editable drag" data-placeholder="Enter some text">' 
					   + this.get('content') + ' </div> </div> '  ;

			$('#cont').append(html);
			console.log(html);

			//ADDING JQUERY
			var ids = '#'+this.get('ids'); 
			var that = this;

			// Delay dragging for a bit (100 ms)
			// $(ids).draggable({delay: 100});

			 $(ids).dblclick(function(){      } );

			// //$(id).dblclick(function(){ that.removeImg();   } );

			//  $(id).draggable();
			  $(ids).resizable({ helper: "ui-resizable-helper"  });



			// // $('.del').hide(); 

			// $(id).mouseup(function() {
			// 	var position = $(id).position();
			// 	that.set({'x': position.left });
			// 	that.set({'y': position.top });
			// 	that.set({'width': $(id).width() });
			// 	that.set({'height': $(id).height()  });
			// 	console.log ('moving');
			// });

			// $(id).mouseover(function(){ $('.del').show();  });
			// $(id).mouseout(function(){ $('.del').hide();  });
			// $(id).dblclick(function(){ that.removeImg();   } );
			// $(id).click(function(){ $(id).focus();  } );

      	}


	});
});