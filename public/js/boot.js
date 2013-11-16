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
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'doc': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery'],
  //  'Backbone': ['Underscore', 'jQuery', 'doc', 'pep','jQueryAI', 'bootJs', 'd3'],
    'AdaptiveMind': ['Backbone',  'd3', 'doc', 'pep','jQueryAI', 'bootJs']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

