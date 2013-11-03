require.config({
  baseUrl: '/js', 
  paths: {
    jQuery: 'libs/jquery',
    jQueryAI: 'libs/jqueryAI', 
    bootJs: 'libs/bootstrap.min',
    d3: 'libs/d3',
    Underscore: 'libs/underscore',
    json2: 'libs/json2', 
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
    'Backbone': ['Underscore', 'jQuery', 'json2', 'doc', 'pep','jQueryAI', 'bootJs', 'd3'],
    'jQueryAI': ['jQuery'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'doc': ['jQuery']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

