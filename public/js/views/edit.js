
define(['AdaptiveMindView', 'text!templates/edit.html'],
function(AdaptiveMindView, editTemplate) {
    var editView = AdaptiveMindView.extend ({
    	el: $('#content'),

        events: {
            'click #save': 'saveProfile',
            'click #bold': 'bold',
            'click #list': 'list' 
        },

    	initialize: function() {
	       this.model.bind('change', this.render, this);
	    },

        formatize: function(text){

            return;
        },

        bold: function(){
                        console.log('here');
            document.execCommand("bold", false);
        },

        list: function(){
                        console.log('here');
            document.execCommand("insertUnorderedList", false);
        },  


        saveProfile: function(){
            $.post('/profile/me/edit', {
                pictureUrl1: $('input[name=pictureUrl1]').val(),
                story: $( "#story" ).html(),
                pictureUrl2: $('input[name=pictureUrl2]').val(),
                experience: $( "#experience" ).html(),
                pictureUrl3: $('input[name=pictureUrl3]').val(),
                participation: $( "#participation" ).html(),
                pictureUrl4: $('input[name=pictureUrl4]').val(),
                portfolio: $( "#portfolio" ).html()

            }, function(data) {
                console.log(data);
                var html = '<div class="alert alert-success fade in"> <button type="button" '+
                            'class="close" data-dismiss="alert" aria-hidden="true">&times;'+
                            '</button>Profile was saved. </div>'; 

                $('html, body').animate({ scrollTop: 0 }, 0);
                if (!data.error){ $('.row').prepend(html); $(".alert").alert(); }
            });
            return false;
        },

        renderText: function(model){
            if (this.model.get('story').photoUrl != null){

                $('#story').append('<p>'+ this.model.get('story').text +'</p>'  );
                $('#experience').append('<p>'+ this.model.get('experience').text +'</p>'  );
                $('#participation').append('<p>'+ this.model.get('participation').text +'</p>'  );
                $('#portfolio').append('<p>'+ this.model.get('portfolio').text +'</p>'  );
 
                $('input[name=pictureUrl1]').val(this.model.get('story').photoUrl   );
                $('input[name=pictureUrl2]').val( this.model.get('experience').photoUrl   );
                $('input[name=pictureUrl3]').val( this.model.get('participation').photoUrl );
                $('input[name=pictureUrl4]').val( this.model.get('portfolio').photoUrl );

            }
        }, 

    	render: function() {
    		if (this.model.get('email') != null){
      		    this.$el.html(_.template(editTemplate, this.model.toJSON()));
                this.renderText(this.model); 

      	    }//end if
    	}//end render

    }); 
    
    return editView;
});
