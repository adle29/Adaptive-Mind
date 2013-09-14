define(['AdaptiveMindView', 'text!templates/status.html', 'text!templates/status2.html' ], 
	function(AdaptiveMindView, statusTemplate, statusTemplate2) {
	var vinBookView = AdaptiveMindView.extend({
		tagName : 'li',
		className   :'list-group-item',

		events: {
			'click #close': 'deleteVinbook'
		},

		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.bind("destroy", this.remove, this);

		},

		render: function (){

			if (this.model.toJSON().viewer  == this.model.toJSON().owner ){
				$(this.el).html(_.template(statusTemplate,this.model.toJSON() ));
			}
			else {
				$(this.el).html(_.template(statusTemplate2,this.model.toJSON() ));
			}
			return this;		
		},

		deleteVinbook: function (){
			if (this.model != null){
				console.log( this.model  );
				 $.ajax({
			        url: '/accounts/me/status' ,
			        type: 'DELETE',
			        data: {
			          groupId: this.model.toJSON().groupId ,
			          statusId: this.model.toJSON()._id, 
			          owner: this.model.toJSON().owner
			        }}).fail(function onError() {
			          	console.log('error deleting status');
		     		});
			    this.model.destroy ();
				console.log('deleting');
			}
		},

		remove: function(){
        	this.$el.remove().fadeOut('slow');  
    	}


	});

	return vinBookView; 
 });