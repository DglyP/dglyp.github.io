//function tornadoChart() {
//    var margin = {top: 20, right: 30, bottom: 40, left: 100},
//        width = 600 - margin.left - margin.right,
//        height = 300 - margin.top - margin.bottom;
//
//    var x = d3.scale.linear()
//    .range([0, width]);
//
//    var y = d3.scale.ordinal()
//    .rangeRoundBands([0, height], 0.1);
//
//    var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom")
//    .ticks(10)
//
//
//    var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")
//    .tickSize(0)
//
//    var svg = d3.select("#example").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//    var maxvalue;
//
//
//    function chart(selection) {
//        selection.each(function(data) {
//
//            maxvalue = (Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) > Math.abs(d3.extent(data, function(d) { return d.interactions; })[1])) ? Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) : Math.abs(d3.extent(data, function(d) { return d.interactions; })[1]);
//
//            x.domain([maxvalue*-1.4, maxvalue]);
//            y.domain(data.map(function(d) { return d.age; }));
//
//            var minInteractions = Math.max.apply(Math, data.map(function(o){return o.interactions;}))*-1;
//            yAxis.tickPadding(Math.abs(x(minInteractions) - x(0)) + 10);
//
//            var bar = svg.selectAll(".bar")
//            .data(data)
//
//            bar.enter().append("rect")
//                .attr("class", function(d) { return "bar bar--" + (d.interactions < 0 ? "negative" : "positive"); })
//                .attr("x", function(d) { return x(Math.min(0, d.interactions)); })
//                .attr("y", function(d) { return y(d.age); })
//                .attr("width", function(d) { return Math.abs(x(d.interactions) - x(0)); })
//                .attr("id", function(d){ return d.age})
//                .attr("style", function(d){ return d.colour == null ? "" : "fill:" + d.colour;})
//                .attr("height", y.rangeBand())
//
//            bar.enter().append('text')
//                .attr("text-anchor", "end")
//                .attr("x", function(d,i) {
//
//                var titlePlacement = Math.abs(x(d.interactions) - x(0)) + x(Math.min(0, d.interactions))-5;
//                if( Math.abs(x(d.interactions) - x(0)) < 30 && d.interactions > 0)
//                    titlePlacement += 30;
//                else if(d.interactions < 0) //Negative placement
//                {
//                    titlePlacement = x(Math.min(0, d.interactions))-5;
//
//                }
//
//
//                return titlePlacement;
//            })
//                .attr("y", function(d,i) {
//                return y(d.age) + (y.rangeBand() / 2);
//            })
//                .attr("dy", ".35em")
//                .text(function (d) { return d.interactions; })
//
//            svg.append("g")
//                .attr("class", "x axis")
//                .attr("transform", "translate(0," + height + ")")
//                .call(xAxis);
//            svg.append("g")
//                .attr("class", "y axis")
//                .attr("transform", "translate(" + x(0) + ",0)")
//                .call(yAxis);
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height / 2) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 200 + "," + 380 + ")")
//                .attr('text-anchor', 'middle')
//                .text('Return on Investment')
//
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 500 + "," + 380 + ")")
//                .attr('text-anchor', 'right')
//                .text('$/ft^2')
//
//        });
//
//    }
//
//    return chart;
//}
//
//function tornadoChart1() {
//    var margin = {top: 20, right: 30, bottom: 40, left: 100},
//        width = 600 - margin.left - margin.right,
//        height = 300 - margin.top - margin.bottom;
//
//    var x = d3.scale.linear()
//    .range([0, width]);
//
//    var y = d3.scale.ordinal()
//    .rangeRoundBands([0, height], 0.1);
//
//    var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom")
//    .ticks(10)
//
//
//    var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")
//    .tickSize(0)
//
//    var svg = d3.select("#example1").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//    var maxvalue;
//
//
//    function chart(selection) {
//        selection.each(function(data) {
//
//            maxvalue = (Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) > Math.abs(d3.extent(data, function(d) { return d.interactions; })[1])) ? Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) : Math.abs(d3.extent(data, function(d) { return d.interactions; })[1]);
//
//            x.domain([maxvalue*-1.4, maxvalue]);
//            y.domain(data.map(function(d) { return d.age; }));
//
//            var minInteractions = Math.max.apply(Math, data.map(function(o){return o.interactions;}))*-1;
//            yAxis.tickPadding(Math.abs(x(minInteractions) - x(0)) + 10);
//
//            var bar = svg.selectAll(".bar")
//            .data(data)
//
//            bar.enter().append("rect")
//                .attr("class", function(d) { return "bar bar--" + (d.interactions < 0 ? "negative" : "positive"); })
//                .attr("x", function(d) { return x(Math.min(0, d.interactions)); })
//                .attr("y", function(d) { return y(d.age); })
//                .attr("width", function(d) { return Math.abs(x(d.interactions) - x(0)); })
//                .attr("id", function(d){ return d.age})
//                .attr("style", function(d){ return d.colour == null ? "" : "fill:" + d.colour;})
//                .attr("height", y.rangeBand())
//
//            bar.enter().append('text')
//                .attr("text-anchor", "end")
//                .attr("x", function(d,i) {
//
//                var titlePlacement = Math.abs(x(d.interactions) - x(0)) + x(Math.min(0, d.interactions))-5;
//                if( Math.abs(x(d.interactions) - x(0)) < 30 && d.interactions > 0)
//                    titlePlacement += 30;
//                else if(d.interactions < 0) //Negative placement
//                {
//                    titlePlacement = x(Math.min(0, d.interactions))-5;
//
//                }
//
//
//                return titlePlacement;
//            })
//                .attr("y", function(d,i) {
//                return y(d.age) + (y.rangeBand() / 2);
//            })
//                .attr("dy", ".35em")
//                .text(function (d) { return d.interactions; })
//
//            svg.append("g")
//                .attr("class", "x axis")
//                .attr("transform", "translate(0," + height + ")")
//                .call(xAxis);
//            svg.append("g")
//                .attr("class", "y axis")
//                .attr("transform", "translate(" + x(0) + ",0)")
//                .call(yAxis);
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height / 2) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 200 + "," + 380 + ")")
//                .attr('text-anchor', 'middle')
//                .text('Return on Investment')
//
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 500 + "," + 380 + ")")
//                .attr('text-anchor', 'right')
//                .text('$/ft^2')
//
//        });
//
//    }
//
//    return chart;
//}
//
//function tornadoChart2() {
//    var margin = {top: 20, right: 30, bottom: 40, left: 100},
//        width = 600 - margin.left - margin.right,
//        height = 300 - margin.top - margin.bottom;
//
//    var x = d3.scale.linear()
//    .range([0, width]);
//
//    var y = d3.scale.ordinal()
//    .rangeRoundBands([0, height], 0.1);
//
//    var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom")
//    .ticks(10)
//
//
//    var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")
//    .tickSize(0)
//
//    var svg = d3.select("#example2").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//    var maxvalue;
//
//
//    function chart(selection) {
//        selection.each(function(data) {
//
//            maxvalue = (Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) > Math.abs(d3.extent(data, function(d) { return d.interactions; })[1])) ? Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) : Math.abs(d3.extent(data, function(d) { return d.interactions; })[1]);
//
//            x.domain([maxvalue*-1.4, maxvalue]);
//            y.domain(data.map(function(d) { return d.age; }));
//
//            var minInteractions = Math.max.apply(Math, data.map(function(o){return o.interactions;}))*-1;
//            yAxis.tickPadding(Math.abs(x(minInteractions) - x(0)) + 10);
//
//            var bar = svg.selectAll(".bar")
//            .data(data)
//
//            bar.enter().append("rect")
//                .attr("class", function(d) { return "bar bar--" + (d.interactions < 0 ? "negative" : "positive"); })
//                .attr("x", function(d) { return x(Math.min(0, d.interactions)); })
//                .attr("y", function(d) { return y(d.age); })
//                .attr("width", function(d) { return Math.abs(x(d.interactions) - x(0)); })
//                .attr("id", function(d){ return d.age})
//                .attr("style", function(d){ return d.colour == null ? "" : "fill:" + d.colour;})
//                .attr("height", y.rangeBand())
//
//            bar.enter().append('text')
//                .attr("text-anchor", "end")
//                .attr("x", function(d,i) {
//
//                var titlePlacement = Math.abs(x(d.interactions) - x(0)) + x(Math.min(0, d.interactions))-5;
//                if( Math.abs(x(d.interactions) - x(0)) < 30 && d.interactions > 0)
//                    titlePlacement += 30;
//                else if(d.interactions < 0) //Negative placement
//                {
//                    titlePlacement = x(Math.min(0, d.interactions))-5;
//
//                }
//
//
//                return titlePlacement;
//            })
//                .attr("y", function(d,i) {
//                return y(d.age) + (y.rangeBand() / 2);
//            })
//                .attr("dy", ".35em")
//                .text(function (d) { return d.interactions; })
//
//            svg.append("g")
//                .attr("class", "x axis")
//                .attr("transform", "translate(0," + height + ")")
//                .call(xAxis);
//            svg.append("g")
//                .attr("class", "y axis")
//                .attr("transform", "translate(" + x(0) + ",0)")
//                .call(yAxis);
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height / 2) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 200 + "," + 380 + ")")
//                .attr('text-anchor', 'middle')
//                .text('Return on Investment')
//
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 500 + "," + 380 + ")")
//                .attr('text-anchor', 'right')
//                .text('$/ft^2')
//
//        });
//
//    }
//
//    return chart;
//}
//
//function tornadoChart3() {
//    var margin = {top: 20, right: 30, bottom: 40, left: 100},
//        width = 600 - margin.left - margin.right,
//        height = 300 - margin.top - margin.bottom;
//
//    var x = d3.scale.linear()
//    .range([0, width]);
//
//    var y = d3.scale.ordinal()
//    .rangeRoundBands([0, height], 0.1);
//
//    var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom")
//    .ticks(10)
//
//
//    var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")
//    .tickSize(0)
//
//    var svg = d3.select("#example3").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//    var maxvalue;
//
//
//    function chart(selection) {
//        selection.each(function(data) {
//
//            maxvalue = (Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) > Math.abs(d3.extent(data, function(d) { return d.interactions; })[1])) ? Math.abs(d3.extent(data, function(d) { return d.interactions; })[0]) : Math.abs(d3.extent(data, function(d) { return d.interactions; })[1]);
//
//            x.domain([maxvalue*-1.4, maxvalue]);
//            y.domain(data.map(function(d) { return d.age; }));
//
//            var minInteractions = Math.max.apply(Math, data.map(function(o){return o.interactions;}))*-1;
//            yAxis.tickPadding(Math.abs(x(minInteractions) - x(0)) + 10);
//
//            var bar = svg.selectAll(".bar")
//            .data(data)
//
//            bar.enter().append("rect")
//                .attr("class", function(d) { return "bar bar--" + (d.interactions < 0 ? "negative" : "positive"); })
//                .attr("x", function(d) { return x(Math.min(0, d.interactions)); })
//                .attr("y", function(d) { return y(d.age); })
//                .attr("width", function(d) { return Math.abs(x(d.interactions) - x(0)); })
//                .attr("id", function(d){ return d.age})
//                .attr("style", function(d){ return d.colour == null ? "" : "fill:" + d.colour;})
//                .attr("height", y.rangeBand())
//
//            bar.enter().append('text')
//                .attr("text-anchor", "end")
//                .attr("x", function(d,i) {
//
//                var titlePlacement = Math.abs(x(d.interactions) - x(0)) + x(Math.min(0, d.interactions))-5;
//                if( Math.abs(x(d.interactions) - x(0)) < 30 && d.interactions > 0)
//                    titlePlacement += 30;
//                else if(d.interactions < 0) //Negative placement
//                {
//                    titlePlacement = x(Math.min(0, d.interactions))-5;
//
//                }
//
//
//                return titlePlacement;
//            })
//                .attr("y", function(d,i) {
//                return y(d.age) + (y.rangeBand() / 2);
//            })
//                .attr("dy", ".35em")
//                .text(function (d) { return d.interactions; })
//
//            svg.append("g")
//                .attr("class", "x axis")
//                .attr("transform", "translate(0," + height + ")")
//                .call(xAxis);
//            svg.append("g")
//                .attr("class", "y axis")
//                .attr("transform", "translate(" + x(0) + ",0)")
//                .call(yAxis);
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height / 2) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 200 + "," + 380 + ")")
//                .attr('text-anchor', 'middle')
//                .text('Return on Investment')
//
//
//            svg.append('text')
//                .attr('class', 'label')
//                .attr('x', -(height) - margin)
//                .attr('y', 0)
//                .attr('transform', "translate(" + 500 + "," + 380 + ")")
//                .attr('text-anchor', 'right')
//                .text('$/ft^2')
//
//        });
//
//    }
//
//    return chart;
//}
//
//
//
//
//var data6 = {
//    "Roof Insulation - Flat Roof":[
//        {"age":"R25 c.i.","gender":"male","interactions":-1.61,"colour":"#4264FF"},{"age":"R25 c.i.","gender":"female","interactions":458,"colour":"#ecf"},{"age":"R30 c.i.","gender":"male","interactions":-1.59,"colour":"#4264FF"},{"age":"R30 c.i.","gender":"female","interactions":32,"colour":"#ecf"},{"age":"R35 c.i.","gender":"male","interactions":-1.59,"colour":"#4264FF"},{"age":"R35 c.i.","gender":"female","interactions":29,"colour":"#ecf"}],
//};
//
//var data1 = {
//    "Roof Insulation - Piched Roof":[{"age":"R38","gender":"male","interactions":-1.60,"colour":"#4264FF"},{"age":"R38","gender":"female","interactions":45,"colour":"#ecf"},{"age":"R38+4'' rigid","gender":"male","interactions":-1.59,"colour":"4264FF"},{"age":"R38+4'' rigid","gender":"female","interactions":18,"colour":"#ecf"},{"age":"R49","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R49","gender":"female","interactions":64,"colour":"#ecf"},{"age":"R60","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R60","gender":"female","interactions":46,"colour":"#ecf"}],
//
//};
//
//var data2 = {
//    "Exterior Wall":[{"age":"2x6 @24 OC(R21)+ R9.6 c.i.","gender":"female","interactions":-4.27,"colour":"#ecf"},{"age":"2x6 @24 OC(R21)+ R9.6 c.i.","gender":"male","interactions":18,"colour":"#4264FF"},{"age":"2x4 staggered studs on 2x6 sill plate (R19)","gender":"male","interactions":10,"colour":"#4264FF"},{"age":"2x4 staggered studs on 2x6 sill plate (R19)","gender":"female","interactions":-4.17,"colour":"#ecf"},{"age":"2x4 staggered studs on 2x6 sill plate (R26)","gender":"male","interactions":4,"colour":"#4264FF"},{"age":"2x4 staggered studs on 2x6 sill plate (R26)","gender":"female","interactions":-4.37,"colour":"#ecf"},{"age":"SIPs R28","gender":"male","interactions":0,"colour":"4264FF"},{"age":"SIPs R28","gender":"female","interactions":-6.01,"colour":"#ecf"},{"age":"SIPs R40","gender":"male","interactions":0,"colour":"#4264FF"},{"age":"SIPs R40","gender":"female","interactions":-6.90,"colour":"#ecf"},{"age":"SIPs R50","gender":"male","interactions":0,"colour":"#4264FF"},{"age":"SIPs R50","gender":"female","interactions":-8.07,"colour":"#ecf"},{"age":"ICF 9 in","gender":"male","interactions":0,"colour":"#4264FF"},{"age":"ICF 9 in","gender":"female","interactions":-12.05,"colour":"#ecf"},{"age":"ICF 11 in","gender":"male","interactions":0,"colour":"#4264FF"},{"age":"ICF 11 in","gender":"female","interactions":-11.86,"colour":"#ecf"},{"age":"ICF 13 in","gender":"male","interactions":0,"colour":"#4264FF"},{"age":"ICF 13 in","gender":"female","interactions":-12.23,"colour":"#ecf"}],
//
//};
//
//var data4 = {
//    "Residential Window Properties":[
//        {"age":"Option 4: U=0.30 SHGC=0.25","gender":"male","interactions":-37,"colour":"#4264FF"},{"age":"Option 4: U=0.30 SHGC=0.25","gender":"female","interactions":52,"colour":"#ecf"},{"age":"Option 5: U=0.2 5SHGC=0.4","gender":"male","interactions":-37.50,"colour":"#4264FF"},{"age":"Option 5: U=0.2 5SHGC=0.4","gender":"female","interactions":39,"colour":"#ecf"}],
//};
//
//var data = {
//    "Residential Lighting":[
//        {"age":"CFL","gender":"female","interactions":-0.02,"colour":"#4264FF"},{"age":"CFL","gender":"male","interactions":807,"colour":"#4264FF"},{"age":"LED","gender":"female","interactions":-0.03,"colour":"#ecf"},{"age":"LED","gender":"male","interactions":342,"colour":"#4264FF"}],
//};
//
//var data5 = {
//    "Corridor Lighting":[
//        {"age":"LED","gender":"female","interactions":-0.30,"colour":"#ecf"},{"age":"LED","gender":"male","interactions":547,"colour":"#4264FF"}],
//};
//
//var data3 = {
//    "Corridor Lighting":[
//        {"age":"Residential Unit Plug load","gender":"female","interactions":-1.20,"colour":"#ecf"},{"age":"Residential Unit Plug load","gender":"male","interactions":41,"colour":"#4264FF"}],
//};
//
//

$( document ).ready(function() {
//    for (var i in data) {
//        var chart = tornadoChart()
//        d3.select("#example")
//            .datum(data[i])
//            .call(chart);
//    }
//
//    for (var i in data1) {
//        var chart = tornadoChart1()
//        d3.select("#example1")
//            .datum(data1[i])
//            .call(chart);
//    }
//
//    for (var i in data2) {
//        var chart = tornadoChart2()
//        d3.select("#example2")
//            .datum(data2[i])
//            .call(chart);
//    }
//
//    for (var i in data3) {
//        var chart = tornadoChart3()
//        d3.select("#example3")
//            .datum(data3[i])
//            .call(chart);
//    }
//



function rPop () { return _.random(50, 100); }

var data = [
  { grade: 'K',  female: rPop(), male: rPop() },
  { grade: '1',  female: rPop(), male: rPop() },
  { grade: '2',  female: rPop(), male: rPop() },
  { grade: '3',  female: rPop(), male: rPop() },
  { grade: '4',  female: rPop(), male: rPop() },
  { grade: '5',  female: rPop(), male: rPop() },y
];

var chart = d3.select('#chart')
var margin = {
  top: 50,
  right: 0,
  bottom: 20,
  left: 30,
};
var width = chart.attr('width') - margin.left - margin.right;
var height = chart.attr('height') - margin.top - margin.bottom;
var innerChart = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var pFormat = d3.format('.2r');

var total = d3.sum(data, function(d) { return d.female + d.male; });

data.map(function(d) {
  d.female = d.female / total;
  d.male = d.male / total;
});

var x = d3.scaleLinear()
  .domain([0, d3.max([
    d3.max(data, function(d) { return d.female; }),
    d3.max(data, function(d) { return d.male; })
   ])])
  .rangeRound([0, width / 2]);

var y = d3.scaleBand()
  .domain(data.map(function(d) { return d.grade; }))
  .rangeRound([0, height]);

var grade = innerChart.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function(d, i) {
    return 'translate(0, ' + (i * y.bandwidth()) + ')';
  });

grade.append('rect')
  .attr('class', 'bar bar--female')
  .attr('x', function(d) { return (width / 2) - x(d.female); })
  .attr('width', function(d) { return x(d.female); })
  .attr('height', y.bandwidth());

grade.append('text')
  .attr('class', 'label')
  .attr('alignment-baseline', 'middle')
  .attr('x', function(d) { return (width / 2) - x(d.female) + 4; })
  .attr('y', y.bandwidth() / 2)
  .text(function(d) {
    return pFormat(d.female * 100);
  });

grade.append('rect')
  .attr('class', 'bar bar--male')
  .attr('x', width / 2)
  .attr('width', function(d) { return x(d.male); })
  .attr('height', y.bandwidth());

grade.append('text')
  .attr('class', 'label')
  .attr('alignment-baseline', 'middle')
  .attr('text-anchor', 'end')
  .attr('x', function(d) { return (width / 2) + x(d.male) - 4; })
  .attr('y', y.bandwidth() / 2)
  .text(function(d) {
    return pFormat(d.male * 100);
  });

innerChart.append('g')
  .attr('class', 'axis axis--y')
  .call(d3.axisLeft(y));

chart.append('text')
  .attr('class', 'axis axis--x')
  .attr('x', width / 4)
  .attr('y', height + margin.top + margin.bottom)
  .attr('text-anchor', 'middle')
  .text('Return on Investment');

chart.append('text')
  .attr('class', 'axis axis--x')
  .attr('x', width * .75)
  .attr('y', height + margin.top + margin.bottom)
  .attr('text-anchor', 'middle')
  .text('$/ft^2');

chart.append('text')
  .attr('class', 'title')
  .attr('x', width / 2)
  .attr('y', 25)
  .attr('text-anchor', 'middle')
  .text('Roof Type');

});