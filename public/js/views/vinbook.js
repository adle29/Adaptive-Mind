define(['AdaptiveMindView', 'text!templates/vinbook.html', ], function(AdaptiveMindView, vinbookTemplate) {
	var vinBookView = AdaptiveMindView.extend({
		tagName : 'li',
		className   :'list-group-item',

		events: {
			'click #close': 'deleteVinbook'
		},

		initialize: function(){
			this.model.bind("change", this.render, this);
			this.model.bind("destroy", this.remove, this);
		},

		render: function (){
			console.log('Third Step', this.model.toJSON() );

			$(this.el).html(_.template(vinbookTemplate,this.model.toJSON()));
			return this;		
		},

		deleteVinbook: function (){
			if (this.model != null){
			 $.ajax({
		        url: '/accounts/me/vinbook' ,
		        type: 'DELETE',
		        data: {
		          vinbookId: this.model.get('_id')
		        }}).fail(function onError() {
		          	console.log('error deleting vinbook');
        		});
		    this.model.destroy ();
			console.log('deleting');
			}
		},

		remove: function(){
        	this.$el.remove().fadeOut('slow');  // 4. Calling Jquery remove function to remove that HTML li tag element..
    	}


	});

	return vinBookView; 
 });