require.config({
  baseUrl: '/js', 
  paths: { 
    jQuery: 'libs/jquery',
    jQueryAI: 'libs/jqueryAI', 
    bootJs: 'libs/bootstrap.min',
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
    'bootJs': ['jQuery'],
    'jQueryAI': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery'],
    'AdaptiveMind': ['Backbone',  'doc',  'bootJs', 'jQueryAI']

  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

