define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/profile',
     'views/vinbookDoc', 'models/Account', 'models/Vinbook', 'models/vinBooksCollection'],

  function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView, 
                        vinbookDocView,  Account, Vinbook, vinBooksCollection) {
  
  var SocialRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      "index": "index",
      "login": "login",
      "desk/:id": "desk",
      "profile/:id": "profile",
      "register": "register",
      "forgotpassword": "forgotpassword",
      "vinbook/:id": "showVinbook"
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

    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    index: function() {
      this.changeView(new IndexView() );
    },

    desk: function (id){
      var model = new Account({id:id});
      this.changeView(new ProfileView({model:model}));
      model.fetch({ error: function(response){  console.log ('error'+JSON.stringify(response));  } });
      console.log('works');
    }, 

    profile: function (id){
      this.changeView(new IndexView() );
    }, 

    login: function() {
      this.changeView(new LoginView());
    },

    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },

    register: function() {
      this.changeView(new RegisterView());
    }
  });

  return new SocialRouter();
});


