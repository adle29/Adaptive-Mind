var express     = require("express");
var app         = express();
var nodemailer  = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
//var dbPath      = 'mongodb://localhost/nodebackbone';
var dbPath      = 'mongodb://heroku_app17644347:cgug0p762b1rthc3aadncpgdpo@ds041208.mongolab.com:41208/heroku_app17644347';

// Import the data layer
var mongoose = require('mongoose');
var config = {
  mail: require('./config/mail')
};

// Import the models
var models = {
  Account: require('./models/Account')(config, mongoose, nodemailer)
};

app.configure(function(){
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.limit('1mb'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "AdaptiveMind secret key", store: new MemoryStore()}));
  mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
  });
});

//----------------d3.js ----------------

app.get('/world', function(req, res) {
  models.Account.findAllVinbooks(function(allVinbooks) {
    console.log('GET REQUEST - SUCCESSFUL ');
    res.send(allVinbooks);
  });

});


//----------------VINBOOKS DISPLAY AND RETRIEVAL----------------

app.get('/accounts/:id/vinbook', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;

  models.Account.findById(accountId, function(account) {
    console.log('GET REQUEST - SUCCESSFUL ');
    res.send(account.vinbooks);
  });

});

app.get('/myVinbooks', function(req, res) {
  var accountId = req.param('myId', null);

  models.Account.findById(accountId, function(account) {
    console.log('GET REQUEST - SUCCESSFUL ');
    res.send(account.vinbooks);
  });

});

app.get('/vinbook', function(req, res) {
  console.log(models.Account.vinbooks);
  var vinId = req.param('vinId', null);
  models.Account.findVinbook2( vinId, function(book) {
    console.log('GET REQUEST - SUCCESSFUL ', book);
    res.send(book);
  });

});


app.post ('/accounts/:id/vinbook', function (req,res){
  console.log('POST REQUEST - SUCCESSFUL');
  console.log('malaui');

  var accountId = req.param.id == 'me'
                  ? req.session.accountId
                  : req.params.id;

  var title = req.param('title', null);
  var subject = req.param('subject', null);
  var description = req.param('description', null);
  var AccountId = req.param('AccountId', null);
  if ( title != null){
  models.Account.findById(accountId, function(account) {
      var vinBook = {
        AccountId: AccountId, 
        title: title,
        subject: subject,
        description: description,
        date: {
          creation: new Date(),
          lastUpdate: ''
        }
      };
      account.vinbooks.push(vinBook);

      account.save(function (err) {
        if (err) {
          console.log('Error saving vinbook: ' + err);
        }
        else{
          console.log('POST REQUEST (Saving vinbook) - SUCCESSFUL');
        }
      });
      res.send(account.vinbooks);
  });
  
}
 // res.send(200);
});

app.post ('/settings', function (req,res){

  var accountId = req.param.id == 'me'
                  ? req.session.accountId
                  : req.params.id;

  var title = req.param('title', null);
  var subject = req.param('subject', null);
  var description = req.param('description', null);
  var AccountId = req.param('AccountId', null);
  var vinId = req.param('vinId', null);

  console.log('POST REQUEST - SUCCESSFUL');

  models.Account.findById(AccountId, function(account) {
    console.log( 'working here' ,account.vinbooks);
      for (var i = 0; i < account.vinbooks.length; i++){
        if (account.vinbooks[i]._id == vinId ){
            var vin = account.vinbooks[i];
            vin.title = title; 
            vin.subject = subject; 
            vin.description = description;
        }
      }

      account.save(function (err) {
        if (err) {
          console.log('Error saving vinbook: ' + err);
        }
        else{
          console.log('POST REQUEST (Updating vinbook) - SUCCESSFUL');
        }
      });
  });
  

  res.send(200);
});

app.delete('/accounts/:id/vinbook', function(req,res) {

  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;

  var vinbookId = req.param('vinbookId', null);     
  models.Account.findById(accountId, function(account) {
    
    if ( !account ) return;
    models.Account.removeVinbook(account, vinbookId);
  });
  console.log('malaui');
  res.send(200);
});

app.get('/', function(req, res){
  res.render('index.jade');
});



//----------------GROUPS DISPLAY AND RETRIEVAL----------------

app.get('/accounts/:id/group', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;

  models.Account.findById(accountId, function(account) {
    console.log('GET GROUP REQUEST - SUCCESSFUL ');
    res.send(account.groups);
  });

});

app.post('/group/:id', function (req, res) {
  var accountId = req.params.id == 'me'
  ? req.session.accountId
  : req.params.id;

   var ids = req.param('ids', null);
   var idAccount = req.param('AccountId', null);

   var status = req.param('status', null);
   var idOwner = req.param('idOwner', null);
   var owner = req.param('owner', null);

   models.Account.findById(idAccount, function(account) {
    models.Account.saveStatus(account, ids, status, idOwner, owner ); 
   });

   res.send(200);
}); 

app.delete('/accounts/:id/status', function(req,res) {

  var owner = req.param('owner', null);
   var groupId = req.param('groupId', null);
   var statusId = req.param('statusId', null);
 
  models.Account.findById(owner, function(account) {
    
    if ( !account ) return;
      models.Account.removeComment(account, groupId, statusId);
    });

  res.send(200);
});


//--------------------------------PROFILE--------------------------------


app.post('/profile/:id/edit', function(req, res) {
  var accountId = req.params.id == 'me'
  ? req.session.accountId
  : req.params.id;

  var location = req.param('location', null);
  var day = req.param('day', null);
  var month = req.param('month', null);
  var year = req.param('year', null);
  var pictureUrl1 = req.param('pictureUrl1', null);
  var story = req.param('story', null);
  var pictureUrl2 = req.param('pictureUrl2', null);
  var experience = req.param('experience', null);
  var pictureUrl3 = req.param('pictureUrl3', null);
  var participation = req.param('participation', null);
  var pictureUrl4 = req.param('pictureUrl4', null);
  var portfolio = req.param('portfolio', null);


  models.Account.findById(accountId, function(account) {
    if ( !account ) return;
    console.log('saving profile 1');
    models.Account.saveProfile(account, location, day, month, year, pictureUrl1, pictureUrl2, 
      pictureUrl3, pictureUrl4, story, experience, participation, portfolio);
  });

  res.send(200);
});


//--------------------------------GENERAL URLS--------------------------------

app.get('/accounts/:id', function(req, res) {
  var accountId = req.params.id == 'me'
  ? req.session.accountId
  : req.params.id;

  models.Account.findById(accountId, function(account) {
    res.send(account);
  });
});

app.post('/vinbook/:id', function (req, res) {
   var id = req.param('ids', null);
   var idAccount = req.param('AccountId', null);
   var entries = req.param('entries', null);
   console.log('POST REQUEST - (saving document) - SUCCESSFUL', id, idAccount);
   console.log( 'ANALYSING ENTRY', entries);

   models.Account.findById(idAccount, function(account) {
    models.Account.findVinbookToSave(account, id, entries); 
   });

   res.send(200);
}); 
//---------------SEARCH - PEOPLE, PAGES, GROUPS----------------------------------

app.post('/search', function(req, res) {
  var SearchData = req.param('searchData', null);
  var TypeOfData = req.param('typeOfData', null);
  console.log('Worked: ',SearchData, TypeOfData ); 
  if ( null == SearchData ) {
    res.send(400);
    return;
  }

  models.Account.findByString(TypeOfData, SearchData, function(err, accounts, yes) {

    if (err || accounts.length == 0) {
      console.log(err);
      res.send(404);
    } else {
      console.log('FOUND' );
      if (!yes){ res.send(accounts);}
      else { res.send(accounts.vinbooks);   }
    }


  });

});

//---------------------ADD FRIEND----------------------
app.post('/addFriend', function(req, res) {
   var userId = req.param('userId', null);
   var friendId = req.param('friendId', null);
   models.Account.addFriend(userId, friendId ); 
   res.send(200); 
});

app.delete('/addFriend/delete', function(req, res) {
   var userId = req.param('userId', null);
   var friendId = req.param('friendId', null);
   models.Account.removeFriend(userId, friendId ); 
   res.send(200); 
});


app.post('/social/:id', function (req, res) {
  var accountId = req.params.id == 'me'
  ? req.session.accountId
  : req.params.id;
  console.log('Here Group');

  var name = req.param('groupName', null);
  var subject = req.param('subject', null);
  var description = req.param('description', null);

  models.Account.findById(accountId, function(account) {
     var group = {
        AccountId: accountId, 
        name: name,
        subject: subject,
        description: description
      };

      account.groups.push(group);

      account.save(function (err) {
        if (err) {
          console.log('Error saving vinbook: ' + err);
        }
        else{
          console.log('POST REQUEST (Saving Group) - SUCCESSFUL');
        }
      });
  });


  console.log('Creating Group');
  res.send(200);
}); 


//-------------------REGISTRATION - ACCOUNT--------------------------------

app.post('/login', function(req, res) {
  console.log('login request');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if ( null == email || email.length < 1
      || null == password || password.length < 1 ) {
    res.send(400);
    return;
  }

  models.Account.login(email, password, function(account) {
    if ( !account ) {
      res.send(401);
      console.log('login was NOT successful');
      return;
    }
    req.session.loggedIn = true;
    req.session.accountId = account._id;
    res.send(200);
  });

  //res.send(200); 
});

app.post('/register', function(req, res) {
  var firstName = req.param('firstName', '');
  var lastName = req.param('lastName', '');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if ( null == email || email.length < 1
       || null == password || password.length < 1 ) {
    res.send(400);
    return;
  }

  models.Account.register(email, password, firstName, lastName, function(){
          models.Account.login(email, password, function(account) {
          if ( !account ) {
            res.send(401);
            console.log('login was NOT successful');
            return;
          }
          req.session.loggedIn = true;
          req.session.accountId = account._id;
          res.send(200);
        });
  });


});

app.get('/account/authenticated', function(req, res) {
  if ( req.session.loggedIn ) {
    res.send(200);
  } else {
    res.send(401);
  }
});

app.get('/login', function(req, res) {
    req.session.loggedIn = false;
    req.session.accountId = '';
    res.send(200);
});

app.post('/forgotpassword', function(req, res) {
  var hostname = req.headers.host;
  var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
  var email = req.param('email', null);
  if ( null == email || email.length < 1 ) {
    res.send(400);
    return;
  }

  models.Account.forgotPassword(email, resetPasswordUrl, function(success){
    if (success) {
      res.send(200);
    } else {
      // Username or password not found
      res.send(404);
    }
  });
});

app.get('/resetPassword', function(req, res) {
  var accountId = req.param('account', null);
  res.render('resetPassword.jade', {locals:{accountId:accountId}});
});

app.post('/resetPassword', function(req, res) {
  var accountId = req.param('accountId', null);
  var password = req.param('password', null);
  if ( null != accountId && null != password ) {
    models.Account.changePassword(accountId, password);
  }
  res.render('resetPasswordSuccess.jade');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

