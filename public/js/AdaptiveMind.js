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


     if  (window.location.hash == '#profile/me' || window.location.hash == '#search' || window.location.hash == '#desk/me'  || window.location.hash == '#social/me'   ) {
          if (!authenticated  ){
                window.location.hash = 'login';
                //router.navigate('login', true);
                console.log('you may not use this2', window.location.hash);
          }
     } 
     
     //if (window.location.hash = '#null' ){ window.location.hash = 'index';   }
              Backbone.history.start();

  };

  return {
    initialize: initialize
  };
});
