define([], function (){
  function initPage(callback) {
    require(['AdaptiveMindView', 'text!templates/index.html'], function(AdaptiveMindView, indexTemplate) {
    
      var indexView = AdaptiveMindView.extend ({
        el: $('#content'),
    
        render: function() {
          this.$el.html(indexTemplate);
        }
    
      });//var
    
      callback( new indexView);
    });
  }//function
  return {initPage: initPage};
});//define
