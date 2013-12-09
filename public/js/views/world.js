
define(['AdaptiveMindView', 'text!templates/world.html'],
function(AdaptiveMindView, worldTemplate) {
    var worldView = AdaptiveMindView.extend ({
      el: $('#content'),

      initialize: function(){
        var that = this; 
       // setInterval(function(){  that.locateDate(); },3000);
       that.locateDate();
      },

      locateDate: function() {
        var that = this; 
        $('#myDiv').css('height', $(window).height());

        $.get('/world', {}, 
          function(data){
            var json = {}; 
            var count = 7; 
            var nodes = [{name:'Arts', value:1 },{name:'Literature', value:1 }, {name:'Biology',value:1}, {name:'History', value:1},
                        {name: 'Mathematics',value:1}, {name: 'Physics',value:1},
                        {name: 'Programming',value:1}  ];
            
            var links = [{"source":0,"target":0},{"source":1,"target":1},{"source":2,"target":2},
                        {"source":3,"target":3},{"source":4,"target":4},{"source":5,"target":5},{"source":6,"target":6} ];  

            for (var i = 0; i < data.length; i++){
              var newPerson = data[i]; 

              if (newPerson.vinbooks.length != 0 ){
                for (var j = 0; j < newPerson.vinbooks.length; j++){
                  var newBook = newPerson.vinbooks[j];
                  var newObject = {
                    name:newBook.title,
                    value: 0,
                    id: newBook._id
                  };
                     switch(newBook.subject)
                      {
                      case "Arts":
                          links.push({"source":count,"target":0});
                        break;
                      case "Literature":
                          links.push({"source":count,"target":1});
                        break;
                      case "Biology":
                          links.push({"source":count,"target":2});
                        break;
                      case "History":
                          links.push({"source":count,"target":3});
                        break;
                        case "Mathematics":
                          links.push({"source":count,"target":4});
                        break;
                        case "Physics":
                          links.push({"source":count,"target":5});
                        break;
                        case "Programming":
                          links.push({"source":count,"target":6});
                        break;
                      default:
         
                      }//end switch

                  nodes.push(newObject);
                  count++; 
                }//end for
              }//end if

            }//end for
            json.links = links; 
            json.nodes = nodes; 
            that.render(json); 
          }); //end get

      },

      render: function(json) {
          if (json != null ) {
            this.$el.html(worldTemplate);
            var width = $(window).width(),
                height = $(window).height();

            var svg = d3.select("#myDiv").append("svg")
                .attr("width", width)
                .attr("height", height);

            var force = d3.layout.force()
                .gravity(.05)
                .distance(100)
                .charge(-100)
                .size([width, height])
                .nodes(json.nodes)
                .links(json.links)
                .start();


          var link = svg.selectAll(".link")
          .data(json.links)
          .enter().append("line")
          .attr("class", "link");

            // Add one circle in each group
            var node = svg.selectAll(".node")
              .data(json.nodes)
              .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

            // Append the labels to each group
            //10
            var circle = node.append("circle")  
              .attr("r", function(d) { return d.value == 1 ? 40 : 8})
              .attr("class", function(d) { return d.value == 1 ? 'leaf' : 'branch' }   ); 


              var labels = node
              
              .attr("dy", function(d) { if (d.value ==1){ return 0;} else {  return ".50em";  } } )
              .attr("text-anchor", function(d) { if (d.value ==1) return "middle"; } )
              .append("svg:a").attr("xlink:href", function(d) { return d.value == 0 ? '#vinbook/'+d.id : ''; })
              .append("svg:text").text(function(d) { return d.name; })
              .attr("x", function(d) { if (d.value ==1){ return 0;} else {  return "13px";  } });


            force.on("tick", function() {
              // Update the links
              link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
              // Translate the groups
              node.attr("transform", function(d) { 
                return 'translate(' + [d.x, d.y] + ')'; 
              });    

            });

          }//end if
      }//end render

    }); //end object
    
    return worldView;
});

