define(['models/vinBooksCollection', 'models/GroupCollection'], 
	function(VinBooksCollection, GroupCollection) {

  var Account = Backbone.Model.extend({
    urlRoot: '/accounts',

    initialize: function() {
       this.vinbooks       = new VinBooksCollection();
       this.vinbooks.url   = '/accounts/' + this.id + '/vinbook';
       this.groups 		   = new GroupCollection();
       this.groups.url     = '/accounts/' + this.id + '/group';
       this.me = this.id;
       this.fetch();
       this.bind('change', this.render, this);
    },

     render: function(){
        this.me = this.get('_id'); 
     }

  });

  return Account;
});
