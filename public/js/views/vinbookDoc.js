define([ 'AdaptiveMindView' , 'text!templates/vinbookDoc.html', 'text!templates/vinbookDocIphone.html', 'text!templates/blogTemplate.html','models/Vinbook',
			'models/EntriesCollection'], 
	function(AdaptiveMindView, vinbookDocTemplate, vinbookDocTemplateIphone, blogTemplate, Vinbook, EntriesCollection){
      var page = 1, newPage = 0, newImgG = '';
      var imageSearch;
      var yes = ''; 
      var mod; 
      var name = "";
    	var vinbookDocView = AdaptiveMindView.extend ({
    		el: $('#content'),
    		defaults: {
    			entries: '',
    			entryColl: ''
    		}, 

    		initialize: function() {

    			$('div.navbar.navbar-inverse').hide();
          this.gettingVinbook();

       	},

   		 events: {
   		 	'click #IMG': 'showEntryImg',
   		 	'click #VID': 'showEntryVid',
   		 	'click #TXT': 'showEntryTxt',
        'click #script': 'script',
   		 	'click #close': 'closeEntry',
   		 	'click #sub': 'mediaEntry',
        'click #search': 'mediaEntryPic', 
        'click #more': 'more', 
   		 	'click #save': 'saveDoc',
        "click #bold": "bold",
        "click #list": "list",
        "click #link": "link",
        "click #video": "video",
        "click #left": "left",
        "click #center": "center",
        "click #justify": "justify",
        "click #heading": "heading",
        'click #slide': "slide",
        'click #slideDown': "slideUp"
   		 },

   		gettingVinbook: function () {
        var that = this; 
                  yes = this;
          $('#content').html("<img class='ajax-loader' src='https://www.amrms.com/ssl/iftafoundation/bluepay/Images/Loading_Animation.gif'>");
          $.get('/vinbook', {
            vinId: this.id
          }, function(data){
            name = data[0].name.first + " " + data[0].name.last; 
            that.gettingVinbook2(data); 
          }); 
   		},

      gettingVinbook2: function  (data){

          var vinbookCollect = data[0].vinbooks;  
          var that = this;  
          for (var i = 0; i < vinbookCollect.length; i++ ) {
             mod = vinbookCollect[i]; 
             if (mod._id == that.id ) { 

                //RENDER BOOK DATA
                that.render(data[0]._id, mod, mod.Entries);
                //RENDER ENTRRIES 
                return;
              }
          }

      }, 

   		showEntryImg: function (){
        $('#myModal').modal();
   		},

   		showEntryVid: function (){
   			$("#txtUrl").prop('placeholder', 'Vid'); 
   			$('#mediaForm').toggle(function(){console.log('pancakes'); });
   		},

   		showEntryTxt: function (){
   			this.mediaEntry('yes');
   		},

   		closeEntry: function (){
   			$('#mediaForm').hide();
   		},

   		mediaEntry: function (ifText){
   			var object = $('input[name=txtUrl]').val() ;
   			var Type = ifText == 'yes' ? '' : $('input[name=txtUrl]').attr( "placeholder" ); 
   			var newEntry;
   			newEntry.render();
   		}, 

      mediaEntryPic: function(){
        var that = this; 
        imageSearch = new google.search.ImageSearch();
        imageSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET); 
        imageSearch.setSearchCompleteCallback(null, that.imgComplete, null); 
        imageSearch.execute($('#request').val());
      }, 

      more: function() {
          imageSearch.gotoPage(page); 
          page++;
      },

      imgComplete: function (){

        var contentDiv = document.getElementById('image-content');
         $('#image-content').empty();

         contentDiv.innerHTML = '';
        if (imageSearch.results && imageSearch.results.length > 0) {
            var results = imageSearch.results;
            console.log('yes5', imageSearch.results.length)
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var newImg = "<img class='imgGoogle' src='"+result.unescapedUrl+"' id='"+i+"''   />";
                $('#image-content').append(newImg); 

            } //for

          $( ".imgGoogle" ).click(function() {
              console.log(this);
              newImgG = $(this).attr('src'); 
              yes.mediaEntryImg(newImgG);
          });
        }//if     
      },

      work:function(newImgG){
        this.mediaEntryImg(newImgG);
      },

       mediaEntryImg: function(gUrl){
         var id = Math.random().toString(36).substring(7);
         var html = "<p id='"+id+"'> <img  class='pict' src='" + gUrl
         + "'  width='300' height='auto' "  + " /></p>"  ;
        console.log(html);
          $('#art').append(html);
          $('#'+id).resizable({handles: 'se'});
          $('#closeModal').trigger('click');
      }, 


   		renderEntries: function (entries){
        console.log(entries); 
        $("#art").append(entries);
   		},

   		saveDoc: function (){
        $('#save').removeClass();
        $('#save').addClass('btn btn-danger'); 
        console.log($("#myLinks").html());
   			$.post('/vinbook/:id', {
	        	ids: this.id,
	        	AccountId: this.model.me,
	        	entries: $("#art").html(),
            links: $("#myLinks").html()
	        }, function(data) {

            if (!data.error){ 
               
              setTimeout(function(){
                  $('#save').removeClass();
                  $('#save').addClass('btn btn-success'); 
              },1500);    
            }

	        }).error(function(){
	        	console.log('POST REQUEST - UPDATE - ERROR');
		    });
   		},


    bold: function(){
        document.execCommand("bold", false);
    },

    list: function(){
        document.execCommand("insertUnorderedList", false);
    },  
    
    link: function(){
        var links=prompt("Please enter the link:","Link"); 
        document.execCommand("CreateLink", false, links);
    },

    heading: function(){
        document.execCommand("formatBlock", false, "H3");
    },

    center: function(){
        document.execCommand("justifyCenter", false);
    },

    justify: function(){
        document.execCommand("justifyFull", false);
    },

    left: function(){
        document.execCommand("justifyLeft", false);
    },

    video: function(){
       var video=prompt("Please enter the video:","Video"); 
      if (video != null){
          video = getVideoString(video);       
          console.log(video); 
          var html = "<iframe  src='//" + video
             + "'  width='100%' height='315' " + " frameborder='0' scrolling='yes' ></iframe><br/><br/>"; 
          $('#art').append(html);
      }
    }, 

    script: function (){
        var id = Math.random().toString(36).substring(7); 
        var url = prompt("Please enter the URL:","url"); 
        var html = "<iframe id='"+id+"' src='" + url
         + "'  width='100%' height='315' " + " frameborder='0' scrolling='yes' ></iframe><br/><br/>"; 
        $('#art').append(html);
        $('#'+id).resizable({handles: 'se'});
    },

    slide: function (){
      $("#bar").slideToggle( "slow"); 
      $("#slideDown").removeClass("hidden");
    },

    slideUp: function (){
      $("#bar").slideToggle( "slow"); 
      $("#slideDown").addClass("hidden");
    },

		render: function (myid, model, entries) {
      console.log(model); 
      var windowWith = $(window).width();
      var that = this;
			if (model != null){
        console.log(model);
        $.ajax("/logged", {
          method: "GET",
          success: function(data) {
             if ( windowWith < 600 ){ 
                switch (model.design){
                  case "0" :
                    that.$el.html( _.template(vinbookDocTemplateIphone, model  ) );
                    break; 
                  case "1" :
                    that.$el.html( _.template(blogTemplate, model  ) );
                    break; 

                }
                
                that.options.notYou = true; 
                $(".name").append(name); 
                that.renderEntries (entries);  
                console.log("$$$$",model.links); 
                $("#myLinks").append(model.links);   
                $("#bar").hide(); 
                $("#art").attr("contenteditable", "false"); 

             } else{
                switch (model.design){
                  case "0" :
                    that.$el.html( _.template(vinbookDocTemplate, model  ) );
                    break; 
                  case "1" :
                    that.$el.html( _.template(blogTemplate, model  ) );
                    break; 

                }
                that.options.notYou = false; 
                $(".name").append(name); 
                that.renderEntries (entries);
                $("#myLinks").append(model.links); 
             }
          },
          error: function(data) {
            switch (model.design){
              case "0" :
                that.$el.html( _.template(vinbookDocTemplateIphone, model  ) );
                break; 
              case "1" :
                that.$el.html( _.template(blogTemplate, model  ) );
                break; 

            }
            that.options.notYou = false; 
            $(".name").append(name); 
            that.renderEntries (entries);

            $("#bar").hide(); 
            $("#art").attr("contenteditable", "false"); 

            $("#myLinks").append(model.links); 
          }

        });

      }//if 

      $(window).resize(function(){
        if ($(window).width() < 400){
          $("img").css("width","100%");
          $("img").css("height","auto");
        }
      });

		}//render
	});

	return vinbookDocView; 
});


function getVideoString (myUrl){
  var url = myUrl; 
    var n = url.indexOf('src=');
    
    url = url.substring(n,url.length );  
    n = url.indexOf('//');  

    url = url.substring(n+2,url.length );

    n = url.indexOf('"');
    url = url.substring(0,n); 
    return url;

}


