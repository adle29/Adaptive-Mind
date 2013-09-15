
define(['AdaptiveMindView', 'text!templates/profile.html'],
function(AdaptiveMindView, profileTemplate) {
    var profileView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	initialize: function() {
	       this.model.bind('change', this.render, this);
	    },

    	render: function() {
    		if (this.model != null){
    			console.log(this.model);
      			this.$el.html(_.template(profileTemplate, this.model.toJSON()));
      		}

      		$('.slider').pep({

			  axis: 'x',
			  useCSSTranslation: false,
			  shouldPreventDefault: false,
			  constrainTo: [0, 0, 0, ($('.slider').width() - $(".text").width()) * -1]
			  
			});


    	}

    }); 
    
    return profileView;
});
