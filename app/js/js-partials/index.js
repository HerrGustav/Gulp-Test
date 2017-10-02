var $ = require('jquery');
var d3 = require('d3');

$('h2').html('Hello').on('click', function () {
    alert('What up!');
});

d3.selectAll("p").style("color", function (d, i) {
    return i % 2 ? "#fff" : "#eee";
});

// d3 Tutorials:
var barChart = require('./bar-chart.js');
