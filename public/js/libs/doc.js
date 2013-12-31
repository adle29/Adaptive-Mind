(function() {
// do not cache any ajax requests
     // $.ajaxSetup({ cache: false });

      // needed for IE CORS support
    //  $.support.cors = true;

      	
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

// ------------------------------RESPONSIVE------------------------------------------

  $( window ).resize(function() {
      var theGoodHeight = $( "html").height(); 

      if ( $(window).height() < 600){
          $( ".paper").height(theGoodHeight); 
          $( ".backColor").height(theGoodHeight); 
      }
  });

}());