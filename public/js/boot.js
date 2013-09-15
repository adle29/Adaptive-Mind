require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    jQueryAI: '/js/libs/jqueryAI', 
    bootJs: '/js/libs/bootstrap.min',
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
    'pep': ['jQuery'],
    'bootJs': ['jQuery'], 
    'Backbone': ['Underscore', 'jQuery', 'pep','jQueryAI', 'bootJs' ],
    'AdaptiveMind': ['Backbone']
  }
});

require(['AdaptiveMind'], function(AdaptiveMind) {
  AdaptiveMind.initialize();
});

//        <script src="../../src/jqtouch.min.js" type="text/javascript" charset="utf-8"></script>