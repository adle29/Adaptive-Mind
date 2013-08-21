
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

// define(['text!templates/index.html', 'models/vinBooksCollection'], function(indexTemplate) {
//   var indexView = Backbone.View.extend({
//     el: $('#content'),
//     collection: bookList,

//     events: {
//     	"click button": "create",
//     	"click #enter": "createShow"
//     },

//     initialize: function() {
//     	this.collection.on('add', this.addOne, this);

//     	bookList.fetch({
//     		success: function(lists){ console.log(lists.model);},
//     		error: function(lists){console.log("Not fetching " + JSON.stringify(lists) ); }
//     	}); 
    	
//     	this.displayFunction();
//     },

//     //ACTION TO CREATE A NOTEBOOK
//     create: function (){
//     	$('#notebookCreaterForm').slideDown(); 
//     },

//     createShow: function (){
//     	$('#notebookCreaterForm').slideUp(); 
//     	var newNoteBook = new NoteBook();
//     	newNoteBook.set({title: $('input[name=title]').val(), date: new Date(), subject: $('input[name=subject]').val() } );
//     	bookList.add(newNoteBook);
//     	console.log(JSON.stringify(bookList));

//     	$.post('/', {
// 	        title: $('input[name=title]').val(),
// 	        subject: $('input[name=subject]').val()
//       	}, function(data) {
//         	console.log(data);
//      	});
//       	return false;
    	
//     },

//     displayFunction: function (){
//     	 this.collection.each(this.addOne, this);
//          console.log('something1 ' + this.collection.length);
//     },

//     addOne: function (title){
//     	var noteView = new NoteView( {model:title} );
//         $('#displayingBooks').append(noteView.render().el );
//         $('#vinBookNum').html(bookList.length);   

//         console.log('something2' );

//     }, 

//     render: function() {
//       this.$el.html(indexTemplate);
//       $("#notebookCreaterForm").hide();
//       $('#vinBookNum').html(bookList.length);  
//     }

//   });

//   return indexView;
// });
