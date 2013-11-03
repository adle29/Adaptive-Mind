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
    doc: 'libs/doc', 
    Backbone: 'libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    AdaptiveMindView: 'AdaptiveMindView'
  },

  shim: {
    'AdaptiveMind': ['Backbone'],
    'jQueryAI': ['jQuery'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'doc': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery', 'doc', 'pep','jQueryAI', 'bootJs', 'd3']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

