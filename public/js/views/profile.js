
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
                //$('#story').val(this.model.get('story').photoUrl   );
                $('#story').append('<p>'+ this.model.get('story').text + '</p>'  );
                //$('input[name=pictureUrl2]').val( this.model.get('experience').photoUrl   );
                $('#experience').append('<p>'+  this.model.get('experience').text + '</p>'  );
                //$('input[name=pictureUrl3]').val( this.model.get('participation').photoUrl );
                $('#participation').append('<p>'+ this.model.get('participation').text + '</p>' )
                //$('input[name=pictureUrl4]').val( this.model.get('portfolio').photoUrl );
                $('#portfolio').append('<p>'+  this.model.get('portfolio' ).text + '</p>' );
            }
      }, 


    	render: function() {
    		  if (this.model.get('email') != null){
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

            //set picture to the window frame can set the complete window to that value
            $('.cap-bot').css('width', function () {return $(window).width(); });
            $('.cap-right').css('width', function () {return $(window).width(); });
            $('.cap-left').css('width', function () {return $(window).width(); });
            $('.cap-top').css('width', function () {return $(window).width(); });
            $('.text .slide-container .slider').css('width', function () {return $(window).width()*4+5; });
            console.log($('.slider').width() ); 

            $('.slider').pep({
              axis: 'x',
              useCSSTranslation: false,
              shouldPreventDefault: false,
              constrainTo: [0, 0, 0, ($('.slider').width() - $(".text").width()) * -1]
            });

          }

    	}

    }); 
    
    return profileView;
});
