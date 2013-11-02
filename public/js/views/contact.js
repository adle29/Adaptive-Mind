
define(['AdaptiveMindView', 'text!templates/contact.html'],
function(AdaptiveMindView, contactTemplate) {
    var contactView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	render: function() {
      		this.$el.html(contactTemplate);
    	}

    }); 
    
    return contactView;
});
