define(['text!templates/register.html'], function(registerTemplate) {
  var registerView = Backbone.View.extend({
    el: $('#content'),

    events: {
      "submit form": "register"
    },


    alert: function (message){
      var html = '<div class="alert alert-danger fade in"> <button type="button" '+
            'class="close" data-dismiss="alert" aria-hidden="true">&times;'+
            '</button> '+ message + ' </div>'; 
 
      $('.errorAlert').empty(); 
      $('.errorAlert').prepend(html); 
      $(".alert").alert(); 
    }, 

    verification: function (){

      //VERIFICATION PROCEDURE
      if ( $('input[name=firstName]').val() == "" ) {
        this.alert ("Please enter you name. ");
        return false;
      }
      else if ( $('input[name=lastName]').val() == "" ){
        this.alert ("Please enter you last name. ");
        return false;
      }
      else if ( $('input[name=email]').val() == "" ){
        this.alert ("Please enter email. ");
        return false;
      }
      else if ( $('input[name=cemail]').val() == "" ){
        this.alert ("Please enter  email confirmation. ");
        return false;
      }
      else if ( $('input[name=password]').val() == "" ){
        this.alert ("Please enter you password. ");
        return false;
      }
      else if ( $('input[name=cpassword]').val() == ""){
        this.alert ("Please enter password confirmation. ");
        return false;
      }
      //confirmation not the same 
      else if ( $('input[name=cpassword]').val() != $('input[name=password]').val()){
        this.alert ("Password confirmation does not match. ");
        return false;
      }
      else if ( $('input[name=email]').val() != $('input[name=cemail]').val()){
        this.alert ("Email confirmation does not match. ");
        return false;
      }
      else 
        return false; 
    },

    register: function() { //POST REQUEST TO SAVE USER
      if ( !this.verification() ) { 
        console.log('YES IT SHOULD WORK');
        $.post('/register', {
          firstName: $('input[name=firstName]').val(),
          lastName: $('input[name=lastName]').val(),
          email: $('input[name=email]').val(),
          password: $('input[name=password]').val()
        }, function(data) {
          console.log(data);
          if (!data.error){ console.log('logged', data); window.location.replace('#desk/me');}
        });
      }//end if 
       
      return false;
    },

    render: function() {
      this.$el.html(registerTemplate);
    }
  });

  return registerView;
});
