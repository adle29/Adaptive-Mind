
define(['AdaptiveMindView', 'text!templates/profile.html'],
function(AdaptiveMindView, profileTemplate) {
    var indexView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	render: function() {
      		this.$el.html(profileTemplate);
    	}

    }); 
    
    return indexView;
});
