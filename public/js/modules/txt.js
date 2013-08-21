define([], function (){
	return Backbone.Model.extend ({
		defaults: {
		    module: "txt",
		    ids: Math.random().toString(36).substring(7) , 
		    content: 'Write here...',
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

			var html = '<div class=""'+id+ position +'>' + 
					   "<p" +"  class='drag txta' >" + this.get('content') +
					   "</p>" + '</div>'  ;


			$('#cont').append(html);
			console.log(html);

			//ADDING JQUERY
			var id = '#'+this.get('ids'); 
			var id2 = '#'+this.get('ids') + ' ' + 'textarea'; 
			var that = this;

			// Delay dragging for a bit (100 ms)
			$(id).draggable({delay: 100});

			$(id).on("click", function(e) {
			    // Don't do anything if already editing
			    var $this = $(this);
			    if($(this).find("textarea").length) return;

			    // Replace paragraph with textarea
			    var $p = $this.find("p");
			    var $textarea =  $('<textarea/>').val($p.text());
			    $p.replaceWith($textarea);
			    console.log($textarea);
			    $textarea.addClass( "drag " );
			    // Focus textarea
			    $textarea.focus();

			});

			$(id).on("blur", "textarea", function() {
			    // Replace textarea with paragraph
			    var $textarea = $(this);
			    var value = $textarea.val();
			    var $p = $('<p/>').text($textarea.val());
    			$textarea.replaceWith($p);
    			$p.addClass( " txta" );
			    // var change = "<p" +"  class='drag txta' >" + value+ "</p>" 
			     that.set({'content': $textarea.val()  });
			    // $textarea.replaceWith(change);
			});

			$(id).dblclick(function(){ that.removeImg();   } );

			 $(id).draggable();
			 $(id).resizable({ helper: "ui-resizable-helper"  });



			// $('.del').hide(); 


 		// 	

			$(id).mouseup(function() {
				var position = $(id).position();
				that.set({'x': position.left });
				that.set({'y': position.top });
				that.set({'width': $(id).width() });
				that.set({'height': $(id).height()  });
				console.log ('moving');
			});

			// $(id).mouseover(function(){ $('.del').show();  });
			// $(id).mouseout(function(){ $('.del').hide();  });
			// $(id).dblclick(function(){ that.removeImg();   } );
			// $(id).click(function(){ $(id).focus();  } );

      	}


	});
});