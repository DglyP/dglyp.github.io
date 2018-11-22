$( document ).ready(function() {
    console.log( "ready!" );

var makeData = function(n, min, max){
    var d = [];
    while(n--){
        d.push(min + (Math.random() * (max - min) | 0));
    }
    return d;
};

var chart = new Dalaba.Chart(document.getElementById("vis"), {
    type: "bar",
    chart: {
        height: 450,
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
            var d = [], s;
            for(var i = 0; i < n; i++){
                s = "";
                for(var j = 0; j < 5; j++)
                    s += String.fromCharCode(65 + Math.random() * (97 - 70) | 0);
                d.push(s);
            }
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
        data: makeData(10, 10, 100),
        xAxis: 0,
        yAxis: 0,
        panelIndex:  0
    }, {
        data: makeData(10, 10, 100),
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