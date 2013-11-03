require.config({
  baseUrl: '/js', 
  paths: {
    jQuery: 'libs/jquery',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    text: '/js/libs/text',
    bootJs: 'libs/bootstrap.min',
    d3: 'libs/d3',
    jQueryAI: 'libs/jqueryAI', 
    //json2: 'libs/json2', 
    pep: 'libs/pep',
   // doc: 'libs/doc', 
    models: 'models',
    templates: '../templates',
    AdaptiveMindView: 'AdaptiveMindView'
  },
  waitSeconds: 200,

  shim: {
    'jQueryAI': ['jQuery'],
    'd3': ['jQuery'], 
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
   // 'doc': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery',  'pep','jQueryAI', 'bootJs', 'd3'],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

