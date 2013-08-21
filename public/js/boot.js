require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryUIL: '/js/libs/jqueryUI', 
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    AdaptiveMindView: '/js/AdaptiveMindView'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery', 'jQueryUIL'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});
