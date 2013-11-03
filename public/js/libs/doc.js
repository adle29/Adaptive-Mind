// do not cache any ajax requests
      $.ajaxSetup({ cache: false });

      // needed for IE CORS support
      $.support.cors = true;