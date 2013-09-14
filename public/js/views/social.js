
define(['AdaptiveMindView', 'text!templates/social.html'],
function(AdaptiveMindView, socialTemplate) {
    var indexView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	events: {
    		"submit form": 'createGroup'
    	},

    	initialize: function() {
	       this.model.bind('change', this.renderGroups, this);
	       this.model.groups.on('add', this.render, this);
	    },

    	createGroup: function () {
    		var that = this; 
    		$.post('/social/me', {
    			groupName: $('input[name=name]').val(),
		        subject: $('select[name=subject]').val(),
		        description: $('input[name=description]').val()

    		}, function (data) {
    			console.log('here1', data);
    		});
    		this.model.fetch();
    		return false;
    	},

    	renderGroup: function (group){
    		var html =  '<li class="list-group-item" ><a href="#group/'+group._id+'">'+ group.name+'</a></li> ';
    		$(html).prependTo('#groupList').hide().fadeIn('slow');
    	}, 

    	renderGroups: function (){
    		 var that = this; 
    		 var groupCollection = this.model.get('groups');
    		if ( JSON.stringify(groupCollection)  != null){
    			_.each (groupCollection, function(group){
    				that.renderGroup(group);
		        });
    		}

    	}, 

    	render: function() {
      		this.$el.html(socialTemplate);
    	}

    }); 
    
    return indexView;
});
