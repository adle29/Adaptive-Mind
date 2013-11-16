require.config({
  baseUrl: '/js', 
  paths: { 
    jQuery: 'libs/jquery',
    jQueryAI: 'libs/jqueryAI', 
    bootJs: 'libs/bootstrap.min',
    d3: 'libs/d3',
    doc: 'libs/doc',
    pep: 'libs/pep',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    text: '/js/libs/text',
    templates: '../templates',
    AdaptiveMindView: 'AdaptiveMindView'
  },
  waitSeconds: 200,

  shim: {
    'jQueryAI': ['jQuery'],
    //'d3': ['jQuery'], 
    'bootJs': ['jQuery'], 
    'doc': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery'],
    'AdaptiveMind': ['Backbone',  'd3', 'doc', 'jQueryAI', 'bootJs']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

