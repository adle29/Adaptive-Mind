define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/desk',
     'views/search', 'views/social', 'views/profile', 'views/group',  'views/edit',
     'views/vinbookDoc', 'views/world', 'views/about', 'views/contact', 'views/settings',
     'models/Account', 'models/Vinbook', 'models/vinBooksCollection','models/GroupCollection' ],

  function(IndexView, RegisterView, LoginView, ForgotPasswordView, DeskView,
                        SearchView,  SocialView, ProfileView, GroupView, EditView,
                        vinbookDocView, worldView, aboutView, contactView, settingsView,
                        Account, Vinbook, vinBooksCollection, GroupCollection) {
  
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

    checkLogin: function (){
        var areYouIn; 
        $.ajax("/account/authenticated", {
        method: "GET",
        success: function() {
          areYouIn = true;
        },
        error: function(data) {
          areYouIn = false;
        }
      });
        if (!areYouIn) { window.location.hash = 'login'; }

    }, 


    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    login: function() {
      this.changeView(new LoginView());
    },

    index: function() {
      this.changeView(new IndexView());
    },

    about: function() {
      this.changeView(new aboutView());
    },

    contact: function() {
      this.changeView(new contactView());
    },

    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },

    register: function() {
      this.changeView(new RegisterView());
    },

    desk: function (id){
     // this.checkLogin(); 
      var model = new Account({id:id});
      this.changeView(new DeskView({model:model}));
      model.fetch({ error: function(response){ window.location.hash = 'login';    } });
    }, 

    showVinbook: function(id) {
  //      this.checkLogin(); 

      var model = new Account({id:'me'}); 
      this.changeView( new vinbookDocView({ 
          id: id,
          model : model
      }));
      model.fetch({ error: function(response){  }  });
    },

    settings: function(id){
     // this.checkLogin(); 

      var model = new Account({id:'me'}); 
      this.changeView( new settingsView({ 
          id: id,
          model : model
      }));
      model.fetch({ error: function(response){  }  });
    },

    search: function (){
      var model = new Account({id:'me'});
      this.changeView(new SearchView({model:model}) );
    },

    social: function (id){
      var model = new Account({id:'me'});
      this.changeView(new SocialView({model:model}));
      model.fetch({ success: function(response){ if (response.me =='me'){window.location.hash = 'login'; }      } });
    },

    group: function (id){
      var model = new Account({id:'me'});
      var trial; 

      var getCollection = new GroupCollection();
      getCollection.url = '/accounts/me/group';

      getCollection.fetch({ error: function(response){   window.location.hash = 'login'; } });
      
      model.fetch({ error: function(response){  trial =JSON.stringify(response); }  });
      this.changeView( new GroupView({ 
          model: model, 
          collection: getCollection,
          id: id
      }));
    }, 


    profile: function (id){
      var model = new Account({id:id});
      model.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      this.changeView(new ProfileView({ model:model }) );
    },

    edit: function(id){
      this.checkLogin(); 

      var model = new Account({id:id});
      model.fetch({ success: function(response){ if (response.me =='me'){window.location.hash = 'login'; }   } });
      this.changeView(new EditView({ model:model }) );
    },

    world: function (){
      this.changeView(new worldView());
    },

    defaultRoute: function(path) {
      this.changeView(new IndexView());
    }


  });

  return new SocialRouter();
});


