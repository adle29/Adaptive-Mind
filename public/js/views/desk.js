define(['AdaptiveMindView', 'text!templates/desk.html',
         'models/Vinbook','views/vinbook'],


function(AdaptiveMindView,  deskTemplate,  Vinbook, vinBookView ) {
  var profileView = AdaptiveMindView.extend({
    el: $('#content'),

    events: {
      "submit form": "createShow"
    },

    initialize: function() {
      
      this.model.bind('change', this.render, this);

    },

    //ACTION TO CREATE A NOTEBOOK

    alert: function (){
      var html = '<div class="alert alert-danger fade in"> <button type="button" '+
            'class="close" data-dismiss="alert" aria-hidden="true">&times;'+
            '</button> Your page needs to have a title. </div>'; 
 
      $('.errorAlert').empty(); 
      $('.errorAlert').prepend(html); 
      $(".alert").alert(); 
    }, 

    createShow: function (){
        console.log('two');
      if ( $('input[name=title]').val() != "" ) {

  
        var vinBooksCollection = this.model.vinbooks; 
        var that = this;
        $.post('/accounts/' + this.model.get('_id')+'/vinbook', {
            AccountId: this.model.get('_id'),
            title: $('input[name=title]').val(),
            subject: $('select[name=subject]').val(),
            description: $('input[name=description]').val(),
            design: $('input[name=design]:checked').val()

          }, function(data) {
           console.log('triple point');
            if (data.length >= 1){
              var vinbookModel = new Vinbook (data[data.length-1] );
              that.prependVinbook( vinbookModel); 
            }
            console.log(data);
          });

          $('input[name=title]').val('');  
          return false; 
      }
      else {
        this.alert(); 
         return false;
      }
      return false;
    },

     prependVinbook: function(vinBookModel) {  
      if (vinBookModel != null) {
        console.log('yeap', vinBookModel);
        var vinBookHtml = (new vinBookView ({ model: vinBookModel }) ).render().el;
        $(vinBookHtml).prependTo('#vinBookListUl').hide().fadeIn('slow');
      }
     },

     onVinbookCollectionReset: function() {      
      var that = this; 
      if (that.model.get('_id') != null){ 
        $.get('myVinbooks', {
          myId: that.model.get('_id')
        }, 
        function(data) {
          var vinbooksCollection = data; 
                  for (var i = 0; i< vinbooksCollection.length; i++){
             var vinbookModel = new Vinbook (data[i]);
             that.prependVinbook(vinbookModel);

          }
          console.log(data);


        }).error(function(){

        });

    }//end if 

    },

    render: function() {
      var that = this;
        this.$el.html(
          _.template(deskTemplate, this.model.toJSON() )
        );
       this.onVinbookCollectionReset(); 
   
    }

  });

  return profileView;

});
