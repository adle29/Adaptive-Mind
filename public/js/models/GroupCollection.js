define(['models/Group'], function(Group) {
  var GroupList = Backbone.Collection.extend({
    model: Group
  });

  return GroupList;
});
