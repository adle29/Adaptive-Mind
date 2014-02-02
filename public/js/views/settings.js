
define(['AdaptiveMindView', 'text!templates/settings.html'],
function(AdaptiveMindView, settingsTemplate) {
    var settingsView = AdaptiveMindView.extend ({
    	el: $('#content'),

        events: {
            'submit': 'save',
        },

    	initialize: function() {
           this.gettingVinbook(); 
	    },

        gettingVinbook: function () {
        var that = this; 
                  yes = this;
          $('#content').html("<img class='ajax-loader' src='https://www.amrms.com/ssl/iftafoundation/bluepay/Images/Loading_Animation.gif'>");
          $.get('/vinbook', {
            vinId: this.id
          }, function(data){
            that.gettingVinbook2(data); 
          }); 
        },

      gettingVinbook2: function  (data){

          var vinbookCollect = data[0].vinbooks;  
          var that = this;  
          for (var i = 0; i < vinbookCollect.length; i++ ) {
             mod = vinbookCollect[i]; 
             if (mod._id == that.id ) { 
                console.log('first here');
                that.render(mod); 
                return;
             }
          }

      }, 

        save: function(){
            var that = this; 
            console.log($('input[name=description]').val());
            $.post('/settings', {
                title: $( "input[name=title]" ).val(),
                subject: $('select[name=subject]').val(),
                description: $('input[name=description]').val(),
                design: $('input[name=design]:checked').val(),
                AccountId: that.model.me,
                vinId: that.id
              //  height: $('input[name=height]').val()

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
                $('input[name=title]').val(model.title);
                $('input[name=description]').val(model.description);
                $('select[name=subject]').val(model.subject);
                $('input[name=design][value=' + model.design + ']').prop('checked',true);

        }, 

    	render: function(model) {
            var that = this; 
            if (model != null){ 
                 $.ajax("/logged", {
                  method: "GET",
                  success: function(data) {
                    console.log(model);
                      that.$el.html(_.template(settingsTemplate, that.model.toJSON()));
                      that.renderText(model); 
                  },
                  error: function(data) {
                      window.location.replace('#desk/me');
                  }

                });
            }
    	}//end render

    }); 
    
    return settingsView;
});
