$( document ).ready(function() {
var makeData = function(n, min, max){
    var d = [];
    while(n--){
        d.push(min + (Math.random() * (max - min) | 0));
    }
    return d;
};
    
    var leftSide = [18, 
                    10,
                    4,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0]
    var rightSide = [4.27, 
                    4.17,
                    4.37,
                    6.01,
                    6.90,
                    8.07,
                    12.05,
                    11.86,
                    12.23]
        
        
//        {
//    "Roof Insulation - Piched Roof":[{"age":"R38","gender":"male","interactions":-1.60,"colour":"#4264FF"},{"age":"R38","gender":"female","interactions":45,"colour":"#ecf"},{"age":"R38+4'' rigid","gender":"male","interactions":-1.59,"colour":"4264FF"},{"age":"R38+4'' rigid","gender":"female","interactions":18,"colour":"#ecf"},{"age":"R49","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R49","gender":"female","interactions":64,"colour":"#ecf"},{"age":"R60","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R60","gender":"female","interactions":46,"colour":"#ecf"}],
//    }
    

var chart = new Dalaba.Chart(document.getElementById("vis"), {
    type: "bar",
    chart: {
        height: 350,
        animation: {
            duration: 200
        },
        events: {
            ready: function(){
                //var data = this.series[0].data;
                //data[0] = makeData(1, 10, 100)[0];
                setTimeout(function(){
                    chart.series.forEach(function(series, i){
                        series.update({
                            data: makeData(10, 10, 100)
                        }, !(chart.series.length ^ i + 1));
                    });
                }, 1000);
            }
        }
    },
    title: {
        enabled: false
    },
    xAxis: [{
        type: "linear",
        opposite: true,
        reversed: true,
        panelIndex: 0,
        isLast: true,
        isFirst: true
    }, {
        type: "linear",
        opposite: true,
        panelIndex: 1
    }],
    yAxis: [{
        panelIndex: 0,
        title: { enabled: false},
        enabled: false,
        isLast: true,
        isFirst: true
    }, {
        title: { enabled: false},
        categories: (function(n){
            var d = ["2x6 @24 OC(R21)+ R9.6 c.i.", 
                     "2x4 staggered studs on 2x6 sill plate (R19)",
                    "2x4 staggered studs on 2x8 sill plate (R26)",
                    "SIPs R28",
                    "SIPs R40",
                    "SIPs R50",
                    "ICF 9 in",
                    "ICF 11 in",
                    "ICF 13 in"]
            return d;
        })(10),
        tickAmount: 10,
        tickLength: 0,
        lineWidth: 0,
        panelIndex: 1,
        labels: {
            x: -10,
            align: "center"
        }
    }],
    plotOptions: {
        bar: {
            groupPadding: 0.2
        }
    },
    legend: { enabled: false},
    series: [{
        data: leftSide,
        xAxis: 0,
        yAxis: 0,
        panelIndex:  0
    }, {
        data: rightSide,
        xAxis: 1,
        yAxis: 1,
        panelIndex: 1
    }],
    layout: {
        grid: {
            col: 2,
            row: 1,
            margin: [0, 10, 0, 10]
        }
    }
});
    
    
});