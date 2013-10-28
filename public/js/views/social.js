
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
    		var html =  '<li class="list-group-item" ><a href="#group/'+group._id+'">'+ group.name+'</a>'+
            '<button id="close" type="button" class="close pull-right" >&times;</button></li> ';
    		$(html).prependTo('#groupList').hide().fadeIn('slow');
    	},

        renderFriends: function (friend){
            var myId = friend._id; 
            var that = this; 
            var html =  '<li id="'+myId +'2" class="list-group-item" ><a href="#profile/'
                        +friend.id+'">'+ friend.firstName + ' ' + friend.lastname +'</a>'+
            '<button id="'+friend._id+'" type="button" class="close pull-right" >&times;</button></li> ';
            $(html).prependTo('#friendList').hide().fadeIn('slow');

            console.log(friend);
            $('#'+myId ).click(function(){
                that.removeFriend(myId); 
            });
        },  

        removeFriend: function (id){
             $.ajax({
                url: '/addFriend/delete' ,
                type: 'DELETE',
                data: {
                  userId: this.model.me,
                  friendId: id
                }}).fail(function onError() {
                    console.log('error deleting friend');
                });
                $('#'+id +'2').remove().fadeOut('slow');
        },  

    	renderGroups: function (){
    		 var that = this; 
    		 var groupCollection = this.model.get('groups');
             var friendCollection = this.model.get('friends');
    		if ( JSON.stringify(groupCollection)  != null){
    			_.each (groupCollection, function(group){
    				that.renderGroup(group);
		        });

                _.each (friendCollection, function(friend){
                    that.renderFriends(friend);
                });   
    		}

    	}, 

    	render: function() {

      		this.$el.html(socialTemplate);
    	}

    }); 
    
    return indexView;
});
