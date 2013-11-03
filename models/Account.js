module.exports = function(config, mongoose, nodemailer) {
  var crypto = require('crypto');

  //-----------------------SCHEMAS---------------------------------

  var Vinbook = new mongoose.Schema({
    AccountId: { type: mongoose.Schema.ObjectId },
    title: { type: String, default: 'empty todo...' },
    subject: { type: String, default: 'empty todo...' },
    description: { type: String  }, 
    date: {
      creation: { type: Date },
      lastUpdate: { type: Date }
    },
    height: { type: String },
    Entries: [Entry]
  });

  var Entry = new mongoose.Schema({
        att: { type: String }
   });

  var Friend = new mongoose.Schema ({
        id: { type: Object },
        firstName: { type: String },
        lastname: { type: String }
  });

  var StatusSchema = new mongoose.Schema ({
        text:  { type: String },
        owner: { type: mongoose.Schema.ObjectId }, 
        name:  { type: String }
  });

  var Group = new mongoose.Schema ({
      AccountId:   { type: mongoose.Schema.ObjectId },
      name:        { type: String },
      subject:     { type: String, default: 'empty todo...' },
      description: { type: String  }, 
      members:     { type: String },
      open:        { type: Boolean },
      files:       { type: String },
      statuses:    [Status]
    
  });

  var AccountSchema = new mongoose.Schema({
    email:     { type: String, unique: true },
    password:  { type: String },
    name: {
      first:   { type: String },
      last:    { type: String }
    },
    birthday: {
      day:     { type: String},
      month:   { type: String},
      year:    { type: String }
    },
    school: { type: String}, 
    country: { type: String}, 
    story: { 
      text: { type: String, default: '' },
      photoUrl: { type: String }
    },
    experience: { 
      text: { type: String, default: ''  },
      photoUrl: { type: String }
    },
    portfolio: { 
      text: { type: String, default: ''  },
      photoUrl: { type: String }
    },
    participation: { 
      text: { type: String, default: ''    },
      photoUrl: { type: String }
    },
    photoUrl:  { type: String },
    biography: { type: String },
    vinbooks: [Vinbook],
    friends: [Friend],
    groups: [Group]
  });

  //-----------------------INSTANCES---------------------------------

  var Account = mongoose.model('Account', AccountSchema);
  var Status = mongoose.model('Status', StatusSchema);

  //-----------------------MAKING ACCOUNT FUNCTIONS---------------------------------

  var registerCallback = function(err) {
    if (err) {
      return console.log( 'this is it', err);
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


  var register = function(email, password, firstName, lastName, callback) {
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
    user.save(function (err){
        if (err) {
          return console.log( 'this is it', err);
        }
        else {
          callback(); 
          return console.log('Account was created');
        }
    });

   };

  var findById = function(accountId, callback) {
    Account.findOne({_id:accountId}, function(err,doc) {
      if (err){      console.log('not working '+ err); }
      callback(doc);
    });
  };


  //-----------------------PROFILE SAVE REQUEST---------------------------------

   var saveProfile = function(account, location, day, month, year, pictureUrl1, pictureUrl2, pictureUrl3, pictureUrl4, story, experience, participation, portfolio ) {
      console.log('saving profile 2');

/*

    account.school: school; */
    account.country = location; 
    account.birthday.day = day;
    account.birthday.month = month;
    account.birthday.year = year;

    console.log(year); 
      account.story.text = story; 
      account.story.photoUrl = pictureUrl1; 
      account.experience.text = experience; 
      account.experience.photoUrl = pictureUrl2; 
      account.participation.text = participation; 
      account.participation.photoUrl = pictureUrl3; 
      account.portfolio.text = portfolio; 
      account.portfolio.photoUrl = pictureUrl4; 

      account.save();
      console.log('USER PROFILE SAVED');
  };


  //-----------------------GROUPS-STATUS---------------------------------


  var saveStatus = function (account, id, status, idOwner, ownerName){
    if ( null == account.groups ) return;

    account.groups.forEach(function(group) {
      console.log (group._id, id); 
      if ( group._id == id ) {
        var newStatus = new Status ({
            text: status,
            owner: idOwner,
            name: ownerName
        });

        group.statuses.push(newStatus);
        console.log( 'status saved',group, newStatus );
      }
    });
    account.save();
  };

  var removeComment  = function (account, groupId, statusId ){
    if ( null == account.groups ) return;
    
    account.groups.forEach(function(group) {
      if ( groupId == group._id ) {
         for ( var i =0; i< group.statuses.length; i++  ){
            if (group.statuses[i]._id ==  statusId ){
              group.statuses.splice(i, 1);
            }
         }
      }
    });
    account.save();
  }; 

  //-----------------------VINBOOKS---------------------------------


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

  var findVinbook2 = function(id,callback) {
    console.log(Account.vinbooks);
      Account.find({'vinbooks._id':id },function(err,doc){
        console.log(err, doc, 'id:' +id);
        callback(doc);
      });
  };

  var findAllVinbooks = function(callback) {
    console.log(Account.vinbooks);
      Account.find({},function(err,doc){
        console.log(err, doc);
        callback(doc);
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


  //-----------------------SEARCH---------------------------------

  var findByString = function(dataType, searchStr, callback ) {
    var searchRegex = new RegExp(searchStr, 'i');
    if (dataType == '0'){
      Account.find({
        $or: [
          { 'vinbooks.title': { $regex: searchRegex } },
          { 'vinbooks.subject': { $regex: searchRegex } },
          { 'vinbooks.description': { $regex: searchRegex } }
        ]
      }, callback);
    }

    else if (dataType == '1'){
      Account.find({
        $or: [
          { 'name.first': { $regex: searchRegex } },
          { 'name.last': { $regex: searchRegex } },
          { email: { $regex: searchRegex } }
        ]
      }, callback);
    }

    else{
      Account.find({
        $or: [
          { 'groups.name': { $regex: searchRegex } }
        ]
      }, callback);
    }

  };



  //-----------------------ADD FRIEND---------------------------------

 var addFriend = function (userId, friendId){
    console.log('adding friend');
    var user, friend; 
    findById(friendId, function(friend) {
      findById(userId, function(user) {
        var newFriend = {
          id: friend._id,
          firstName: friend.name.first,
          lastname: friend.name.last
        }

        user.friends.push(newFriend);
        user.save();
        console.log('friend saved', friend.name.first, user.name.first );
      }); 
    }); 
 };

  var removeFriend = function (userId, friendId){
    console.log('deleting friend');
    var user, friend; 
      findById(userId, function(user) {
        var getIndex = 0; 

        for (var i = 0; i< user.friends.length;i++){
          if (user.friends[i].id = friendId ) {
            getIndex  = i;
            break; 
          }
        }
        user.friends.splice(getIndex, 1);
        user.save();
      }); 
  }; 

  //-----------------------FUNCTION AVAILABLE---------------------------------

  return {
    register: register,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    findById: findById, 
    removeVinbook: removeVinbook, 
    findVinbook: findVinbook, 
    findVinbook2: findVinbook2, 
    findAllVinbooks: findAllVinbooks,
    findVinbookToSave: findVinbookToSave, 
    saveStatus:saveStatus, 
    saveProfile:saveProfile, 
    addFriend:addFriend,
    removeFriend:removeFriend, 
    removeComment: removeComment, 
    findByString: findByString, 
    login: login,
    Account: Account
  }
}
