var width = 1000;
var height = 800;

d3.json("/static/data/backbones.json", function(data) {

	//Force, nodes and links loaded in and force started
	var force = d3.layout.force()
	    .charge(-100)
	    .linkDistance(300)
	    .size([width, height])
	    .nodes(data.nodes)
	    .links(data.links)
	    .on("tick", tick)
	    .start();

	//Add the svg
	var svg = d3.select("body").append("svg")
	    //.style("border-style", "solid")
	    .attr("width", width)
	    .attr("height", height)
	    .call(d3.behavior.zoom().on("zoom", function () {
	    	svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
	    }))
	    .append("g");

	//Links
	var link = svg.selectAll(".link")
	    .data(data.links)
	    .enter().append("line")
	    .attr("class", "link")
	    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

	//Nodes
	var node = svg.selectAll(".node")
	    .data(data.nodes)
	    .enter().append("g")
	    .attr("class", "node")
	    .call(force.drag);

    	node.append("circle")
            .attr("r","12")
	    .style("fill", function(d){ return d.color; });
	//node.append("title")
	//    .text(function(d) { return d.hostname; });
	node.append("text")
	    .attr("dx", 12)
      	    .attr("dy", ".35em")
	    .text(function(d) { return d.name });

	var tip;
	var clickFlag = false;
	node.on("click", function(d) {
	    if (tip) tip.remove();
    	    tip = svg.append("g").attr("transform", "translate(" + d.x  + "," + d.y + ")");
    	    tip.append("text")
      	       .text(d.hostname)
      	       .attr("dy", "2em")
               .attr("x", 5);
    	    tip.append("text")
      	       .text(d.ip)
      	       .attr("dy", "3em")
               .attr("x", 5);
	    if (clickFlag) tip.remove();
	    return clickFlag = !clickFlag;
	    /*
	    var rect = tip.append("rect")
      			  .style("fill", "white")
      			  .style("stroke", "steelblue");
    	    var bbox = tip.node().getBBox();
    	    rect.attr("width", bbox.width + 5)
        	.attr("height", bbox.height + 5)
	    */
	});

	function tick() {
	  link.attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  //node.attr("cx", function(d) { return d.x; })
	  //    .attr("cy", function(d) { return d.y; });
	  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}

});
