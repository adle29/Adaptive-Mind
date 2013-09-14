define(['models/GroupCollection'], function(GroupCollection) {
  var Group = Backbone.Model.extend({
  	urlRoot: '/accounts/me/group', 

  });


  return Group;
});
