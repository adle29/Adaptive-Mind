
define(['AdaptiveMindView', 'text!templates/edit.html'],
function(AdaptiveMindView, editTemplate) {
    var editView = AdaptiveMindView.extend ({
    	el: $('#content'),

        events: {
            'submit form': 'saveProfile'
        },

    	initialize: function() {
	       this.model.bind('change', this.render, this);
	    },

        saveProfile: function(){
            $.post('/profile/me/edit', {
                pictureUrl1: $('input[name=pictureUrl1]').val(),
                story: $('textarea[name=story]').val(),
                pictureUrl2: $('input[name=pictureUrl2]').val(),
                experience: $('textarea[name=experience]').val(),
                pictureUrl3: $('input[name=pictureUrl3]').val(),
                participation: $('textarea[name=participation]').val(),
                pictureUrl4: $('input[name=pictureUrl4]').val(),
                portfolio: $('textarea[name=portfolio]').val()

            }, function(data) {
                console.log(data);
                var html = '<div class="alert alert-success fade in"> <button type="button" '+
                            'class="close" data-dismiss="alert" aria-hidden="true">&times;'+
                            '</button>Profile was saved. </div><'; 

                $('html, body').animate({ scrollTop: 0 }, 0);
                if (!data.error){ $('.row').prepend(html); $(".alert").alert(); }
            });
            return false;
        },

        renderText: function(model){
            if (this.model.get('story').photoUrl != null){
                $('input[name=pictureUrl1]').val(this.model.get('story').photoUrl   );
                $('textarea[name=story]').val( this.model.get('story').text   );
                $('input[name=pictureUrl2]').val( this.model.get('experience').photoUrl   );
                $('textarea[name=experience]').val( this.model.get('experience').text  );
                $('input[name=pictureUrl3]').val( this.model.get('participation').photoUrl );
                $('textarea[name=participation]').val(this.model.get('participation').text )
                $('input[name=pictureUrl4]').val( this.model.get('portfolio').photoUrl );
                $('textarea[name=portfolio]').val( this.model.get('portfolio').text);
            }
        }, 

    	render: function() {
    		if (this.model.get('email') != null){
      		    this.$el.html(_.template(editTemplate, this.model.toJSON()));
                this.renderText(this.model); 
      	    }
    	}

    }); 
    
    return editView;
});
