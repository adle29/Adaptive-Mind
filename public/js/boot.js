require.config({
  baseUrl: '/js', 
  paths: { 
    jQuery: 'libs/jquery',
    jQueryAI: 'libs/jqueryAI', 
    bootJs: 'libs/bootstrap.min',
    d3: 'libs/d3',
    doc: 'libs/doc',
    pep: 'libs/pep',
    models: 'models',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    text: 'libs/text',
    templates: '../templates',
    AdaptiveMindView: 'AdaptiveMindView'
  },
//  waitSeconds: 200,

  shim: {
    'jQueryAI': ['jQuery'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'doc': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery', 'doc', 'pep','jQueryAI', 'bootJs', 'd3'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

