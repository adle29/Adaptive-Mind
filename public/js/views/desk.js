define(['AdaptiveMindView', 'text!templates/desk.html',
         'models/Vinbook','views/vinbook'],


function(AdaptiveMindView,  deskTemplate,  Vinbook, vinBookView ) {
  var profileView = AdaptiveMindView.extend({
    el: $('#content'),

    events: {
      "click #newVinbook": "create",
      "submit form": "createShow"
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.vinbooks.on('add', this.render, this);
      $('div.navbar.navbar-inverse').show();
    },

    //ACTION TO CREATE A NOTEBOOK
    create: function (){
      $('#notebookCreaterForm').slideDown(); 
    },

    createShow: function (){
      $('#notebookCreaterForm').slideUp(); 
      var vinBooksCollection = this.model.vinbooks; 
      var that = this;
      $.post('/accounts/' + this.model.get('_id')+'/vinbook', {
          AccountId: this.model.get('_id'),
          title: $('input[name=title]').val(),
          subject: $('select[name=subject]').val(),
          description: $('input[name=description]').val()

        }, function(data) {
          vinBooksCollection.add(new Vinbook ({  title: $('input[name=title]').val(), subject: $('input[name=subject]').val() }));
          //that.prependVinbook(new Vinbook ({  title: $('input[name=title]').val(), subject: $('input[name=subject]').val() })); 
        });
        this.model.fetch();
        return false;
    },

     prependVinbook: function(vinBookModel) {  
      console.log('mistake');
      if (vinBookModel != null) {
        var vinBookHtml = (new vinBookView ({ model: vinBookModel }) ).render().el;
        $(vinBookHtml).prependTo('#vinBookListUl').hide().fadeIn('slow');
      }
     },

     onVinbookCollectionReset: function() {      
      var that = this; 
      var vinbooksCollection = this.model.get('vinbooks');

      if (null != JSON.stringify(vinbooksCollection) ){
        _.each (vinbooksCollection, function(vinbookJson){
           var vinbookModel = new Vinbook (vinbookJson);
           that.prependVinbook(vinbookModel);
          
        });
      }
    },

    render: function() {

      var that = this;
      console.log('AQUI',this.model.me ,this.model.me == 'me');
     // if ( this.model.me != 'me'  ){
        this.$el.html(
          _.template(deskTemplate, this.model.toJSON() )
        );
        this.onVinbookCollectionReset();     
    }

  });

  return profileView;

});
