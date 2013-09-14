
define(['AdaptiveMindView', 'text!templates/index.html',
        'views/vinbook', 'models/Vinbook'],
function(AdaptiveMindView, indexTemplate) {
    var indexView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	render: function() {
      		this.$el.html(indexTemplate);
    	}

    }); 
    
    return indexView;
});
