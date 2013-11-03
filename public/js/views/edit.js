
define(['AdaptiveMindView', 'text!templates/edit.html'],
function(AdaptiveMindView, editTemplate) {
    var editView = AdaptiveMindView.extend ({
    	el: $('#content'),

        events: {
            'click #save': 'saveProfile',
            'click #bold': 'bold',
            'click #list': 'list' ,
            'click #link': 'link' 
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

        link: function(){
            console.log('here');
            var links=prompt("Please enter the link:","Link")
            document.execCommand("CreateLink", false, links);
        },

        color: function(){

            document.execCommand('ForeColor', false, '0000FF');
        },

        saveProfile: function(){
            $.post('/profile/me/edit', {
                pictureUrl1: '', //$('input[name=pic]').val(),
                location: $('input[name=location]').val(),
                day: $('select[name=day]').val(),
                month: $('select[name=month]').val(),
                year: $('select[name=year]').val(), 
                story: $( "#story" ).html(),
                pictureUrl2: '',
                experience: $( "#experience" ).html(),
                pictureUrl3: '',
                participation: $( "#participation" ).html(),
                pictureUrl4: '',
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
               // $('input[name=pic]').val(this.model.get('experience').photoUrl);
                $('input[name=location]').val(this.model.get('country'));
                $('select[name=day]').val(this.model.get('birthday').day);
                $('select[name=month]').val(this.model.get('birthday').month);
                $('select[name=year]').val(this.model.get('birthday').year);

                $('#story').append('<p>'+ this.model.get('story').text +'</p>'  );
                $('#experience').append('<p>'+ this.model.get('experience').text +'</p>'  );
                $('#participation').append('<p>'+ this.model.get('participation').text +'</p>'  );
                $('#portfolio').append('<p>'+ this.model.get('portfolio').text +'</p>'  );
            console.log(this.model);
                // $('input[name=pictureUrl1]').val(this.model.get('story').photoUrl   );
                // $('input[name=pictureUrl2]').val( this.model.get('experience').photoUrl   );
                // $('input[name=pictureUrl3]').val( this.model.get('participation').photoUrl );
                // $('input[name=pictureUrl4]').val( this.model.get('portfolio').photoUrl );

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
