
define(['AdaptiveMindView', 'text!templates/group.html', 'views/status',  'models/status' ],
function(AdaptiveMindView, groupTemplate, statusView, modelStatus ) {
    var groupView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	events:{
    		"click #comment": "newComment"
    	},

    	initialize: function (){
        var that = this; 
        this.collection.on('reset', function() {
            this.gettingGroup();
            this.renderStatusCollection();
        }, this);

        this.model.on('change', function() {
           this.renderStatusCollection();
         }, this);

    	},

    	gettingGroup: function () {
   			 var groupCollect = this.collection; 
   			 var that = this; 
   			 groupCollect.each(function (group) {
   			    if (group.get('_id') == that.id ) { 
   			 		   //RENDER BOOK DATA
   			 		   that.group = group; 
   			 		   that.render(group);
               $('#disc').trigger('click');
   			 		   return;
      			}
     		 });
   		},

      refreshing: function () {
         var groupCollect = this.collection; 
         var that = this; 
         groupCollect.each(function (group) {
            if (group.get('_id') == that.id ) { 
               //RENDER BOOK DATA
               that.group = group; 
               console.log('working',that.group.get('statuses') );
               return;
            }
         });
      },

   		newComment: function (){
   			var name = this.model.get('name').first + ' ' + this.model.get('name').last;
   			var that = this; 
    		$.post('/group/:id', {
    			ids: this.group.get('_id'),
    			AccountId: this.group.get('AccountId'),
    			idOwner: this.model.get('_id'),
    			owner: name, 
    			status: $('input[name=status]').val()
    		}, function (data) {
    			 console.log('Posting: ', data);

    		});
        this.collection.fetch(  { success:  function(res){console.log(res.toJSON());} } );
    		return false;
   		}, 

   		renderStatusCollection: function (){
        $('#statusList').empty();

   			var that = this; 
        var myId =that.model.get('_id'); 

    		if ( JSON.stringify(this.group.get('statuses'))  != null){
          var statusCollection = this.group.get('statuses');
    			_.each (statusCollection, function(status){
            if ( myId != null){
              status.viewer = myId;
              status.groupId = that.group.get('_id');
            }
            var newStatusModel = new modelStatus ();
            newStatusModel.set(status); 
    				that.renderStatus(newStatusModel);
		        });
    		}
   		}, 

   		renderStatus: function (newStat){
                    console.log('come one');
   			var statusHTML = (new statusView ({ model: newStat }) ).render().el;
        	$(statusHTML).prependTo('#statusList').hide().fadeIn('slow');
   		}, 

    	render: function(model) {
      		if (model != null){
				         this.$el.html( _.template(groupTemplate, model.toJSON() ) );
                 this.renderStatusCollection();
			     }
    	}

    }); 
    
    return groupView;
});
