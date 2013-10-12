define([ 'AdaptiveMindView' , 'text!templates/vinbookDoc.html', 'text!templates/vinbookDocIphone.html', 'models/Vinbook',
			'models/EntriesCollection','modules/img', 'modules/vid', 'modules/txt'], 
			function(AdaptiveMindView, vinbookDocTemplate, vinbookDocTemplateIphone, Vinbook, EntriesCollection, Img, Vid, Txt){
  var page = 1, newPage = 0, newImgG = '';
  var imageSearch;
  var yes; 
	var vinbookDocView = AdaptiveMindView.extend ({
		el: $('#content'),
		defaults: {
			entries: '',
			entryColl: ''
		}, 

		initialize: function() {
			this.collection.on('reset', this.gettingVinbook, this);
			$('div.navbar.navbar-inverse').hide();
                       // var dropbox = document.getElementById('#cont');
   	},

   		 events: {
   		 	'click #IMG': 'showEntryImg',
   		 	'click #VID': 'showEntryVid',
   		 	'click #TXT': 'showEntryTxt',
   		 	'click #close': 'closeEntry',
   		 	'click #sub': 'mediaEntry',
        'click #search': 'mediaEntryPic', 
        'click #more': 'more', 
   		 	'click #save': 'saveDoc'

   		 },

   		gettingVinbook: function () {
   			 var vinbookCollect = this.collection; 
   			 var that = this; 
         yes = this; 
   			 vinbookCollect.each(function (model) {
   			 	if (model.get('_id') == that.id ) { 

   			 		 //RENDER BOOK DATA
   			 		 that.model = model; 
   			 		 that.render(model);

   			 		 //RENDER ENTRRIES 
   			 		 that.renderEntries (model.get('Entries'));
   			 		 return;
      			}
     		 });
   		},

   		showEntryImg: function (){
   			// $("#txtUrl").prop('placeholder', 'Img'); 
			// $('#mediaForm').toggle(function(){console.log('pancakes'); });
        $('#myModal').modal();
   		},

   		showEntryVid: function (){
   			$("#txtUrl").prop('placeholder', 'Vid'); 
   			//$("#form1").prop('name', 'videoUrl'); 
   			$('#mediaForm').toggle(function(){console.log('pancakes'); });
   		},

   		showEntryTxt: function (){
   			this.mediaEntry('yes');
   		},

   		closeEntry: function (){
   			$('#mediaForm').hide();
   		},

   		mediaEntry: function (ifText){

   			var object = $('input[name=txtUrl]').val() ;
   			var Type = ifText == 'yes' ? '' : $('input[name=txtUrl]').attr( "placeholder" ); 
   			var newEntry;
   			if (Type == "Img") {
   				newEntry = new Img ();
   				newEntry.set( {Ourl: object, ids: Math.random().toString(36).substring(7)  } );
   			}
   			else if (Type == "Vid")  {
   				newEntry = new Vid ({Ourl: object, ids: Math.random().toString(36).substring(7)  }   );
   			}
   			else {
   				console.log('text',ifText, Type);
   				newEntry = new Txt ();
   			}
   			this.entries.add(newEntry);
   			newEntry.render();
   		}, 

      mediaEntryPic: function(){
        var that = this; 
        imageSearch = new google.search.ImageSearch();
        imageSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET); 
        imageSearch.setSearchCompleteCallback(null, that.imgComplete, null); 
        imageSearch.execute($('#request').val());
      }, 

      more: function() {
          imageSearch.gotoPage(page); 
          page++;
      },

      imgComplete: function (){
        var contentDiv = document.getElementById('image-content');
         $('#image-content').empty();
         contentDiv.innerHTML = '';
        if (imageSearch.results && imageSearch.results.length > 0) {
            var results = imageSearch.results;
            console.log('yes5', imageSearch.results.length)
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var newImg = "<img class='imgGoogle' src='"+result.unescapedUrl+"' id='"+i+"''   />";
                $('#image-content').append(newImg); 

            } //for
          $( ".imgGoogle" ).click(function() {
              newImgG =$(this).attr('src'); 
              yes.mediaEntryImg(newImgG);
          });
        }//if     
      },

      work:function(newImgG){
        this.mediaEntryImg(newImgG);
      },

       mediaEntryImg: function(gUrl){
          var newEntry = new Img ();
          newEntry.set( {Ourl: gUrl, ids: Math.random().toString(36).substring(7)  } );
                      newEntry.render();
            this.entries.add(newEntry);
            $('#closeModal').trigger('click');
      }, 


   		renderEntries: function (entries){

   			this.entries = new EntriesCollection();
   			if (entries != 0) {
   				console.log('here', entries);
		 		 var entrada = entries[0];
		 		 for (var i = 0; i < entrada.length; i++){
		 		 	var gettingEntry = entrada[i]; 
		 		 	if (gettingEntry.module == "img"){
		 		 		var newEntry = new Img (gettingEntry);
		 		 		newEntry.render();
		 		 		this.entries.add(newEntry);
		 		 	}
		 		 	else if (gettingEntry.module == "vid")  {
		 		 		var newEntry = new Vid (gettingEntry);
		 		 		newEntry.render();
		 		 		this.entries.add(newEntry);
		 		 	}
		 		 	else {
		 		 		var newEntry = new Txt (gettingEntry);
		 		 		newEntry.render();
		 		 		this.entries.add(newEntry);
		 		 	}



		 		 }

   			}
   		},

   		saveDoc: function (){

   			$.post('/vinbook/:id', {
	        	ids: this.model.get('_id'),
	        	AccountId: this.model.get('AccountId'),
	        	entries: this.entries.toJSON() 
	        }, function(data) {
	      		console.log(data);
	        }).error(function(){
	        	console.log('POST REQUEST - UPDATE - ERROR');
		    });
   		},

		render: function (model) {
      var windowWith = $( window ).width(); 
      console.log( 'width: ' ,windowWith);
			if (model != null){

        if ( windowWith < 600){
          this.$el.html( _.template(vinbookDocTemplateIphone, 
            model.toJSON()        ) );
        }
        else {
  				this.$el.html( _.template(vinbookDocTemplate, 
  					model.toJSON()       ) );
        }


            console.log('rendering');
			}

		}
	});

	return vinbookDocView; 
});


