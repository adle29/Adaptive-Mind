
define(['AdaptiveMindView', 'text!templates/about.html'],
function(AdaptiveMindView, aboutTemplate) {
    var aboutView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	render: function() {
      		this.$el.html(aboutTemplate);
    	}

    }); 
    
    return aboutView;
});
