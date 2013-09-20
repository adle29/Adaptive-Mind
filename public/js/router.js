define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/desk',
     'views/search', 'views/social', 'views/profile', 'views/group',  'views/edit',
     'views/vinbookDoc', 'models/Account', 'models/Vinbook', 'models/vinBooksCollection',
     'models/GroupCollection', ],

  function(IndexView, RegisterView, LoginView, ForgotPasswordView, DeskView,
                        SearchView,  SocialView, ProfileView, GroupView, EditView,
                        vinbookDocView,  Account, Vinbook, vinBooksCollection,
                        GroupCollection) {
  
  var SocialRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      "forgotpassword": "forgotpassword",
      "vinbook/:id": "showVinbook",
      "register": "register",
      "login": "login",
      "index": "index", 
      "desk/:id": "desk",
      "search": "search",
      "social/:id": "social",
      "group/:id": "group", 
      "profile/:id": "profile",
      "profile/:id/edit": "edit"
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

    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },

    register: function() {
      this.changeView(new RegisterView());
    },

    desk: function (id){
      var model = new Account({id:id});
      this.changeView(new DeskView({model:model}));
      model.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      console.log('works');
    }, 

    showVinbook: function(id) {
      var getCollection = new vinBooksCollection();
      getCollection.url = '/accounts/me/vinbook';
      this.changeView( new vinbookDocView({ 
          collection: getCollection,
          id: id
      }));
      getCollection.fetch();
    },

    search: function (){
      this.changeView(new SearchView() );
    },

    social: function (id){
      var model = new Account({id:'me'});
      this.changeView(new SocialView({model:model}));
      model.fetch({ error: function(response){  console.log ('success'+JSON.stringify(response));  } });
    },

    group: function (id){
      var model = new Account({id:'me'});
      var trial; 

      var getCollection = new GroupCollection();
      getCollection.url = '/accounts/me/group';

      getCollection.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      
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
      var model = new Account({id:id});
      model.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      this.changeView(new EditView({ model:model }) );
    }


  });

  return new SocialRouter();
});


