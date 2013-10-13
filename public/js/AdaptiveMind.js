define(['router'], function(router) {
  var initialize = function() {
    checkLogin(runApplication);
  };

  var checkLogin = function(callback) {
    $.ajax("/account/authenticated", {
      method: "GET",
      success: function() {
        return callback(true);
      },
      error: function(data) {
        return callback(false);
      }
    });
  };

  var runApplication = function(authenticated) {

    //  if  (!authenticated ) {
    //   window.location.hash = 'login';
    // } 
         if  (!authenticated  ) {
      if (window.location.hash != 'profile' && window.location.hash != 'vinbook'  ){
              window.location.hash = 'login';

      }
    } 
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
