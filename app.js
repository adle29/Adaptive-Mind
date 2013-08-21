var express     = require("express");
var app         = express();
var nodemailer  = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var dbPath      = 'mongodb://localhost/nodebackbone';

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



app.get('/accounts/:id/vinbook', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;

  models.Account.findById(accountId, function(account) {
    console.log('GET REQUEST - SUCCESSFUL ');
    res.send(account.vinbooks);
  });

});


app.post ('/accounts/:id/vinbook', function (req,res){
  console.log('POST REQUEST - SUCCESSFUL');
  var accountId = req.param.id == 'me'
                  ? req.session.accountId
                  : req.params.id;

  var title = req.param('title', null);
  var subject = req.param('subject', null);
  var description = req.param('description', null);
  var AccountId = req.param('AccountId', null);
  
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

  res.send(200);
});

app.get('/', function(req, res){
  res.render('index.jade');
});

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

//REGISTRATION - ACCOUNT

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

models.Account.register(email, password, firstName, lastName);
  req.session.loggedIn = true;
  // req.session.accountId = account._id;
  res.send(200);
});

app.get('/account/authenticated', function(req, res) {

  if ( req.session.loggedIn ) {
    res.send(200);
  } else {
    res.send(401);
  }
});

app.get('/login', function(req, res) {
  console.log('trial1');
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

app.listen(8080);
console.log("AdaptiveMind is listening to port 8080.");
