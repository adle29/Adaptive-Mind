require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryAI: '/js/libs/jqueryAI', 
    bootJs: '/js/libs/bootstrap.min',
    d3: '/js/libs/d3',
    Underscore: '/js/libs/underscore',
    pep: '/js/libs/pep',
    Backbone: '/js/libs/backbone',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',

    AdaptiveMindView: '/js/AdaptiveMindView'
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

