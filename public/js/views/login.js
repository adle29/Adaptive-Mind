define(['AdaptiveMindView','text!templates/login.html'], function(AdaptiveMindView, loginTemplate) {
  var loginView = AdaptiveMindView.extend({
    requireLogin: false,

    el: $('#content'),

    events: {
      "submit form": "login"
    },

    initialize: function (){
        $.get('/login', {}, function(data){}); 
    },  

    login: function() {

      $.post('/login', {
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val()
      }, 

      function(data) {
        console.log(data);
        if (!data.error){window.location.replace('#desk/me');}
        
      }).error(function(){
        $("#error").text('Unable to login.');
        $("#error").slideDown();
      });

      return false;
    },

    render: function() {
      this.$el.html(loginTemplate);
      $("#error").hide();
    }
  });

  return loginView;
});
