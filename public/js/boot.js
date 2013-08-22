require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryPunch: '/js/libs/jqueryPunch', 
    jQueryAI: '/js/libs/jqueryAI', 
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    AdaptiveMindView: '/js/AdaptiveMindView'
  },

  shim: {
    'jQueryAI': ['jQuery', 'jQueryPunch'], 
    'jQueryPunch': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery', 'jQueryAI'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});
