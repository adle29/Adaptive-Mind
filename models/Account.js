module.exports = function(config, mongoose, nodemailer) {
  var crypto = require('crypto');

    var Vinbook = new mongoose.Schema({
      AccountId: { type: mongoose.Schema.ObjectId },
      title: { type: String, default: 'empty todo...' },
      subject: { type: String, default: 'empty todo...' },
      description: { type: String  }, 
      date: {
        creation: { type: Date },
        lastUpdate: { type: Date }
      },
      Entries: [Entry]
    });

  var Entry = new mongoose.Schema({
        att: { type: String }
   });

  var AccountSchema = new mongoose.Schema({
    email:     { type: String, unique: true },
    password:  { type: String },
    name: {
      first:   { type: String },
      last:    { type: String }
    },
    birthday: {
      day:     { type: Number, min: 1, max: 31, required: false },
      month:   { type: Number, min: 1, max: 12, required: false },
      year:    { type: Number }
    },
    photoUrl:  { type: String },
    biography: { type: String },
    vinbooks: [Vinbook]
  });

  var Account = mongoose.model('Account', AccountSchema);

  var registerCallback = function(err) {
    if (err) {
      return console.log(err);
    };
    return console.log('Account was created');
  };

  var changePassword = function(accountId, newpassword) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(newpassword);
    var hashedPassword = shaSum.digest('hex');
    Account.update({_id:accountId}, {$set: {password:hashedPassword}},{upsert:false},
      function changePasswordCallback(err) {
        console.log('Change password done for account ' + accountId);
    });
  };

  var forgotPassword = function(email, resetPasswordUrl, callback) {
    var user = Account.findOne({email: email}, function findAccount(err, doc){
      if (err) {
        // Email address is not a valid user
        callback(false);
      } else {
        var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
        resetPasswordUrl += '?account=' + doc._id;
        smtpTransport.sendMail({
          from: 'adaptivemind2012@gmail.com',
          to: doc.email,
          subject: 'Adaptive Mind Password Request',
          text: 'Click here to reset your password: ' + resetPasswordUrl
        }, function forgotPasswordResult(err) {
          if (err) {
            callback(false);
          } else {
            callback(true);
          }
        });
      }
    });
  };

  var login = function(email, password, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    Account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
      callback(doc);
    });
  };


  var register = function(email, password, firstName, lastName) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    console.log('Registering ' + email);
    var user = new Account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      password: shaSum.digest('hex')
    });
    user.save(registerCallback);
    console.log('Save command was sent');
   };

  var findById = function(accountId, callback) {
    Account.findOne({_id:accountId}, function(err,doc) {
      if (err){      console.log('not working '+ err); }
      callback(doc);
    });
  };

  var removeVinbook = function(account, vinbookId) {

    if ( null == account.vinbooks ) return;

    account.vinbooks.forEach(function(vinbook) {
      if ( vinbook._id == vinbookId ) {
        account.vinbooks.remove(vinbook);
        console.log ('removed vinbook');
      }
    });
    account.save();
  };

  var findVinbook = function(account, vinbookId, callback) {

    if ( null == account.vinbooks ) return;

    account.vinbooks.forEach(function(vinbook) {
      if ( vinbook._id == vinbookId ) {
        callback(vinbook); 
        console.log ('found vinbook');
      }
    });
  };

  var findVinbookToSave = function (account, id, entries){
    if ( null == account.vinbooks ) return;

    account.vinbooks.forEach(function(vinbook) {
      if ( vinbook._id == id ) {
        vinbook.Entries =[];
        vinbook.Entries.push(entries);
        console.log( 'ARRAY' ,vinbook.Entries);
        // vinbook.Entries.push(entries);
        // console.log ('ENTRIES SAVED');
      }
    });
    account.save();
  };


  return {
    register: register,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    findById: findById, 
    removeVinbook: removeVinbook, 
    findVinbook: findVinbook, 
    findVinbookToSave: findVinbookToSave, 
    login: login,
    Account: Account
  }
}
