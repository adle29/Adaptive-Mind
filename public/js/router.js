define(['models/Account'],

  function(Account ) {
  
  var SocialRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      "forgotpassword": "forgotpassword",
      "vinbook/:id": "showVinbook",
      "settings/:id": "settings", 
      "register": "register",
      "login": "login",
      "index": "index",
      "about": "about", 
      "contact": "contact",
      "desk/:id": "desk",
      "search": "search",
      "social/:id": "social",
      "group/:id": "group", 
      "profile/:id": "profile",
      "profile/:id/edit": "edit", 
      "world": "world", 
      "": "defaultRoute"
    },

    about: function() {
      this.changeView('about');
    },

    changeView: function(view, model, id) {
      var that = this; 
      if (this.currentView != null) {
        this.currentView.undelegateEvents();
        //objView.undelegateEvents();
        console.log('MXAAA');
      }
      console.log('MXAAA2', this.currentView);

      require(['views/' + view], function(View) {
        if ( model == null && id == null ){
          that.currentView = new View();
              that.currentView.render(); 
        }
        else if ( model == null && id != null){
          that.currentView = new View({id: id});
              that.currentView.render(); 
        }
        else{
         that.currentView = new View({model:model, id: id});
              that.currentView.render(); 
        }
      }); 
    },

    contact: function() {
      this.changeView('contact');
    },

    defaultRoute: function() {
      this.changeView('index'); 
    },

    edit: function(id){
      var model = new Account({id:id});
      model.fetch({ success: function(response){ if (response.me =='me'){window.location.hash = 'login'; }   } });
      this.changeView('edit', model );
    },

    login: function() {
      this.changeView('login'); 
    },

    index: function() {
      this.changeView('index'); 
    },

    forgotpassword: function() {
      this.changeView('forgotpassword'); 
    },

    register: function() {
      this.changeView('register');
    },

    desk: function (id){
      var model = new Account({id:id});
      this.changeView('desk', model );
      model.fetch({ error: function(response){ window.location.hash = 'login';    } });
    }, 

    showVinbook: function(id) {
      var model = new Account({id:'me'}); 
      this.changeView('vinbookDoc', model, id);
      model.fetch({ error: function(response){  }  });
    },

    settings: function(id){
      var model = new Account({id:'me'}); 
      this.changeView('settings', model, id);
      model.fetch({ error: function(response){  }  });
    },

    search: function (){
      var model = new Account({id:'me'});
      this.changeView('search', model );
    },

    social: function (id){
      var model = new Account({id:'me'});
      this.changeView('social', model);
      model.fetch({ success: function(response){ if (response.me =='me'){window.location.hash = 'login'; }      } });
    },

    profile: function (id){
      var model = new Account({id:id});
      model.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      this.changeView('profile', model );
    },

    world: function (){
      this.changeView('world');
    }


  });

  return new SocialRouter();
});


    // group: function (id){
    //   var model = new Account({id:'me'});
    //   var trial; 

    //   var getCollection = new GroupCollection();
    //   getCollection.url = '/accounts/me/group';

    //   getCollection.fetch({ error: function(response){   window.location.hash = 'login'; } });
      
    //   model.fetch({ error: function(response){  trial =JSON.stringify(response); }  });
    //   this.changeView( new GroupView({ 
    //       model: model, 
    //       collection: getCollection,
    //       id: id
    //   }));
    // }, 


