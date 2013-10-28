
define(['AdaptiveMindView', 'text!templates/search.html'],
function(AdaptiveMindView, searchTemplate) {
    var indexView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	events: {
    		"keyup #submit": "search",
    		"click #submit2": "search"
    	},

    	search: function (){
    		console.log('ONE');
    		var that = this; 
    		var typeSearch = $('input[name=typeOfData]:checked').val(); 
    		var srchData = $('input[name=searchData]').val(); 

    		if (srchData != null ){
	    		$.post('/search', {
		          typeOfData: $('input[name=typeOfData]:checked').val(),
		          searchData: $('input[name=searchData]').val()

		        }, function (data){ 
		        	that.renderData(typeSearch, data, srchData);

		        }).error(function(){
		        	$('#itemList li').remove(); 
		        	$("#results").text('No contacts found.');
					$("#results").slideDown();
		        });
	    	}

	    	else {
	    		$('#itemList li').remove(); 
	    	}
    	}, 

    	renderData: function (typeSearch, data, srchData){
    		$("#results").slideUp();
    		$('#itemList li').remove(); 
    		var mtch = new RegExp(srchData,"gi"); 
            var that = this; 

    		if (typeSearch == '0'){
    			for (var i = 0; i <= data.length; i++ ){
    				if(data[i] != null){
    					var book = data[i]; 
    					for (var j= 0; j <= book.vinbooks.length; j++ ){
    						if(book.vinbooks[j] != null && srchData != '' ){
    							var nameBook = book.vinbooks[j].title;
    							console.log(nameBook);
    							var mat = nameBook.match(mtch); 
    							if ( mat != null ){
			    					var html = '<li class="list-group-item" > <a href="#vinbook/'+book.vinbooks[j]._id +'"  >'+ book.vinbooks[j].title +'</a></li>';
				    				$(html).prependTo('#itemList').hide().fadeIn('slow');
			    				}
		    				}
		    			}
	    			}
	    		}
    		}

    		else if (typeSearch == '1'){	
	    		for (var i = 0; i <= data.length; i++ ){
	    			if(data[i] != null){
	    				console.log(data[i]);
                        var myId =data[i]._id; 
		    			var html = '<li class="list-group-item" > <a href="#profile/'+data[i]._id  +'">'+ data[i].name.first +' '+ data[i].name.last  +'</a>'+
                      '<span class="pull-right" ><button id="'+myId+'">+</button></span>' +  '</li>';
		    			$(html).prependTo('#itemList').hide().fadeIn('slow');
                        
                        $('#'+myId).click(function(){
                            that.addFriend(this.id); 
                        });
	    			}
	    		}
    		}
    		else{
    			for (var i = 0; i <= data.length; i++ ){
                    if(data[i] != null){
                        console.log(data[i]);
                        var html = '<li class="list-group-item" > <a href="#group/'+data[i]._id  +'">'+ data[i].groups[i].name +'</a></li>';
                        $(html).prependTo('#itemList').hide().fadeIn('slow');
                    }
	    		}
    		}
    	},

        addFriend: function(ids){
            console.log(this.model.me, ids);
            $.post('/addFriend', {
              userId: this.model.me,
              friendId: ids
            }, function(data) {
                console.log(data);
            });
        },

    	render: function() {
      		this.$el.html(searchTemplate);
    	}

    }); 
    
    return indexView;
});
