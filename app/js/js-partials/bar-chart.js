// d3 Bar chart tutorial: https://bost.ocks.org/mike/bar/

var d3 = require('d3');
var $ = require('jquery'); 

var dataset;

var height = 1000; 
var width = $(window).innerWidth() * .5;


var chart = d3.select('.chart').attr('width', width).attr('height', height);


d3.csv('http://localhost:3000/data.csv', type, function(error, data){
    
    dataset = data;
    
    var y = d3.scaleLinear().domain([0, d3.max(data,function(d){ return d.value; })]).range([height, 0]);
    
    
    var barWidth = width / data.length;
    
   
    
    var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
    
    
   bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1);

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
});

function type(d){
    d.value = +d.value;
    return d;
}



