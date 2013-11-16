define(['models/vinBooksCollection'], 
	function(VinBooksCollection, GroupCollection) {

  var Account = Backbone.Model.extend({
    urlRoot: '/accounts',

    initialize: function() {
       this.vinbooks       = new VinBooksCollection();
       this.vinbooks.url   = '/accounts/' + this.id + '/vinbook';
       this.me = this.id;
       this.fetch();
       this.bind('change', this.render, this);
    },

     render: function(){
      if (this.me != null){
        this.me = this.get('_id'); 
      }
     }

  });

  return Account;
});
