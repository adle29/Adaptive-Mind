
define(['AdaptiveMindView', 'text!templates/profile.html'],
function(AdaptiveMindView, profileTemplate) {
    var profileView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	initialize: function() {
	       this.model.bind('change', this.render, this);
         $(window).on("resize", this.render, this);
	    },

      renderText: function(model){
            if (this.model.get('story').photoUrl != null){

                var name = this.model.get('name').first + ' ' + this.model.get('name').last;
                var birthday = this.model.get('birthday').month + ' '
                               + this.model.get('birthday').day + ', ' +
                                this.model.get('birthday').year;
                console.log(birthday);

                //$('#story').val(this.model.get('story').photoUrl   );
               // $('#fullname').append(name); 
                $('#birthday').append(birthday);
                $('#location').append(this.model.get('country'));

                $('#story').append('<p>'+ this.model.get('story').text + '</p>'  );
                //$('input[name=pictureUrl2]').val( this.model.get('experience').photoUrl   );
                $('#experience').append('<p>'+  this.model.get('experience').text + '</p>'  );
                //$('input[name=pictureUrl3]').val( this.model.get('participation').photoUrl );
                $('#participation').append('<p>'+ this.model.get('participation').text + '</p>' );
                //$('input[name=pictureUrl4]').val( this.model.get('portfolio').photoUrl );
                $('#portfolio').append('<p>'+  this.model.get('portfolio' ).text + '</p>' );
            }
      }, 


    	render: function() {
        console.log('yes', this.model.get('email'));
    		  if (this.model.get('email') != null){
            console.log(this.model.get('id'));
            if (this.model.get('id') == 'me'){
      			  console.log(this.model);
        			this.$el.html(_.template(profileTemplate, this.model.toJSON()));
              this.renderText(this.model); 
      		  }
            else {
              console.log(this.model);
              this.$el.html(_.template(profileTemplate, this.model.toJSON()));
              this.renderText(this.model); 
              $('#owner').remove(); 
            }

          }//if 

    	}//render

    }); // end
    
    return profileView;
});
