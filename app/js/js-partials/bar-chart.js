// d3 Bar chart tutorial: https://bost.ocks.org/mike/bar/

var d3 = require('d3');


var width = 420; var barHeight = 20;

// scale Factor:
var x = d3.scale.linear()
    //.domain([d3.min(data), d3.max(data)])
    .range([0, width]);

var chart = d3.select('.chart')
.attr('width', width);

console.log(chart);

d3.csv('data.csv', type, function(error, data){
    x.domain([0, d3.max(data,function(d){ return d.value; })]);
    
    chart.attr('height', barHeight * data.length);
    
    var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i){ return "translate(0," + i * barHeight + ")"; });
    
    bar.append('rect').attr('width', function(d){ return x(d.value); }).attr('height', barHeight - 1);
    
    bar.append('text').attr('x', function(d){ return x(d.value) - 3;}).attr('y', barHeight / 2).attr('dy', '.35em').text(function(d){return d.value;});
});

function type(d){
    d.value = +d.value;
    return d;
}




var div = document.createElement("div");
div.innerHTML = "Hello, world!";
document.body.appendChild(div);