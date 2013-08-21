define([ 'AdaptiveMindView' , 'text!templates/vinbookDoc.html', 'models/Vinbook',
			'models/EntriesCollection','modules/img', 'modules/vid', 'modules/txt'], 
			function(AdaptiveMindView, vinbookDocTemplate, Vinbook, EntriesCollection, Img, Vid, Txt){

	var vinbookDocView = AdaptiveMindView.extend ({
		el: $('#content'),
		defaults: {
			entries: '',
			entryColl: ''
		}, 

		initialize: function() {
			this.collection.on('reset', this.gettingVinbook, this);
			$('div.navbar.navbar-inverse').hide();


   		 },

   		 events: {
   		 	'click #IMG': 'showEntryImg',
   		 	'click #VID': 'showEntryVid',
   		 	'click #TXT': 'showEntryTxt',
   		 	'click #close': 'closeEntry',
   		 	'click #sub': 'mediaEntry',
   		 	'click #save': 'saveDoc'

   		 },

   		gettingVinbook: function () {
   			 var vinbookCollect = this.collection; 
   			 var that = this; 
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
   			$("#txtUrl").prop('placeholder', 'Img'); 
   			$('#mediaForm').toggle(function(){console.log('pancakes'); });
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
			if (model != null){
				this.$el.html( _.template(vinbookDocTemplate, 
					model.toJSON()
				) );
				$('#mediaForm').hide();
				console.log('rendering' );
			}

		}
	});

	return vinbookDocView; 
});
