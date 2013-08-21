define(['models/EntriesCollection'], function(EntriesCollection) {
  var Vinbook = Backbone.Model.extend({
  	urlRoot: '/accounts/' + this.accountId + '/vinbook' 

  });

  return Vinbook;
});
