require.config({
  baseUrl: '/js/libs',
  paths: {
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    AdaptiveMindView: '/js/AdaptiveMindView'
  },

  shim: {
    'jQueryAI': ['jQuery'],
    'rangyCore': ['jQuery','jQueryAI'],
    'hallo': ['jQuery','jQueryAI'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'Backbone': ['Underscore', 'jQuery', 'pep','jQueryAI', 'rangyCore', 'hallo', 'bootJs', 'd3'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

