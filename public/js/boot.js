require.config({
  baseUrl: '/js', 
  waitSeconds: 200,
  paths: {
    jQuery: 'libs/jquery',
    jQueryAI: 'libs/jqueryAI', 
    bootJs: 'libs/bootstrap.min',
    d3: 'libs/d3',
    Underscore: 'libs/underscore',
    pep: 'libs/pep',
    Backbone: 'libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    AdaptiveMindView: 'AdaptiveMindView'
  },

  shim: {
    'jQueryAI': ['jQuery'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'Backbone': ['Underscore', 'jQuery', 'pep','jQueryAI', 'bootJs', 'd3'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

