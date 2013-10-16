
define(['AdaptiveMindView', 'text!templates/world.html'],
function(AdaptiveMindView, worldTemplate) {
    var worldView = AdaptiveMindView.extend ({
    	el: $('#content'),

    	initialize: function(){
    		this.locateDate(); 
    	},

    	locateDate: function() {
    	  var that = this; 

    	  $.get('/world', {

          }, function(data){

var myjson = {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714},
      {"name": "MergeEdge", "size": 743}
     ]
    };

            that.render(myjson); 
          }); 

	    },

    	render: function(data) {
    		if (data != null ) {
      		this.$el.html(worldTemplate);

var diameter = 960;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter - 150)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

          	console.log('here1', data);
			 root = data;
			   var nodes = tree.nodes(root),
      links = tree.links(nodes);
  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; });

d3.select(self.frameElement).style("height", diameter - 150 + "px");

		}

    	}

    }); 
    
    return worldView;
});
