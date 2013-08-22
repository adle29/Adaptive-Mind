require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryUIL: '/js/libs/jqueryUI', 
    jQueryPunch: '/js/libs/jqueryPunch', 
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    AdaptiveMindView: '/js/AdaptiveMindView'
  },

  shim: {
    'jQueryPunch': ['jQuery'],
    'jQueryUIL': ['jQuery', 'jQueryPunch'], 
    'Backbone': ['Underscore', 'jQuery', 'jQueryUIL','jQueryPunch'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});
