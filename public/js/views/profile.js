define(['AdaptiveMindView', 'text!templates/profile.html', 'text!templates/profile2.html'],
function(AdaptiveMindView, profileTemplate, profile2Template) {
    var profileView = AdaptiveMindView.extend ({
    	el: $('#content'),

      events: {
        "click #share": "share"
      },

    	initialize: function() {
	       this.model.bind('change', this.render, this);
         $(window).on("resize", this.render, this);
	    },

      share: function(){
        alert("Share this link of your profile with others! " +
          "adaptivemind.heroku.com/#profile/" + this.model.get('_id' )) ; 
      }, 

      renderText: function(model){
            if (this.model.get('story').photoUrl != null){

                var name = this.model.get('name').first + ' ' + this.model.get('name').last;
                var birthday = this.model.get('birthday').month + ' '
                               + this.model.get('birthday').day + ', ' +
                                this.model.get('birthday').year;

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

                var myVinbooks = this.model.get('vinbooks');
                var html = "<div class='bigTitle' > <h3>Adaptive Mind Pages</h3></div>"+
                           "<hr class='stLine'><div id='pages'><dl></dl></div>";
                           console.log("here", myVinbooks);
                if ( myVinbooks.length != 0){
                  $('#leftColumn').append(html); 
                  for (var i = 0; i < myVinbooks.length; i++){
                    var page = myVinbooks[i]; 
                    var des = page.description == "" ? "-No description available" : page.description ; 
                    html = " <dt> <a class='cap' href='#vinbook/"+ page._id +"'>"+page.title+"</a></dt>"+
                      "<dd>"+page.subject+"</dd>"+
                      "<dd><p class='text-muted'> "+ des +"</p></dd><hr class='stLine' >";
                    $('#pages dl').append(html); 

                  }
                }//end iff
            }
      }, 


    	render: function() {

    		  if (this.model.get('email') != null){

            if (this.model.get('id') == 'me'){

        			this.$el.html(_.template(profileTemplate, this.model.toJSON()));
              this.renderText(this.model); 
      		  }
            else {
              this.$el.html(_.template(profile2Template, this.model.toJSON()));
              this.renderText(this.model); 
              //$('#owner').remove(); 
            }

          }//if 

    	}//render

    }); // end
    
    return profileView;
});
