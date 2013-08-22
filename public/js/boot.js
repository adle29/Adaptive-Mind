require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryPunch: '/js/libs/jqueryPunch', 
    jQueryUIL: '/js/libs/jqueryUI', 
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    AdaptiveMindView: '/js/AdaptiveMindView'
  },

  shim: {
    'jQueryUIL': ['jQuery'], 
    'jQueryPunch': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery', 'jQueryPunch', 'jQueryUIL'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});
