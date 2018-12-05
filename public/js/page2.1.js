$( document ).ready(function() {

    $(document).on("click",".btn",function(){
        var text = $(this).text();
        alert("You selected: " + text );
    });

    function myFunction() {
        return p1 * p2;              // The function returns the product of p1 and p2
    }

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

    var containerHeight = +d3.select('.rightSide').style('height').slice(0, -2)


    //        {
    //    "Roof Insulation - Piched Roof":[{"age":"R38","gender":"male","interactions":-1.60,"colour":"#4264FF"},{"age":"R38","gender":"female","interactions":45,"colour":"#ecf"},{"age":"R38+4'' rigid","gender":"male","interactions":-1.59,"colour":"4264FF"},{"age":"R38+4'' rigid","gender":"female","interactions":18,"colour":"#ecf"},{"age":"R49","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R49","gender":"female","interactions":64,"colour":"#ecf"},{"age":"R60","gender":"male","interactions":-1.55,"colour":"#4264FF"},{"age":"R60","gender":"female","interactions":46,"colour":"#ecf"}],
    //    }


    var data = [
        ['Flat Roof', 0, 0],
        ['Piched Roof with attic', 0, 0],
    ];
    
    var chart = Dalaba.Chart(document.getElementById("vis"),                 {

        title: { enabled: true, text:" "},
        type: "bar",

        chart: {
            height: containerHeight,

        },
        xAxis: {
            labels: {
                formatter: function () {                
                    return Math.abs(this.value) ;
                }},
            title: { enabled: true, 
                    text: "Utility Costs [$/ft^2/year]",style: {
                        fontSize: '15px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: -130,
                    verticalAlign: 'top',
                    y: -320},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '15px'},},

            categories: data.map(function(t){
                return t[0];
            }),
            tickAmount: data.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: false},
            categories: data.map(function(t){
                return t[0];
            }),
            tickAmount: data.length,
            visible: false,
            labels: {

                maxWidth: 90
            }
        }],
        legend:{
            enabled: false
        },
        series: [{
            type: "bar",
            name: "$/ft^2/year",
            data: data.map(function(t){
                return t[2]
            }),

            zones: [{
                value: 0,
                color: '#f7a35c'
            }, {
                value: 10,
                color: '#7cb5ec'
            }, {
                color: '#90ed7d'
            }],

            events: {
                click: function (event) {
                    console.log(this);
                    this.series.color = "green";
                    this.color = "#f80000"; 
                    var text = this.key;
                    alert("You selected: " + text );

                }
            }
        }, {
            name: "ROI %",            
            data: data.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   


}); //end of doc ready


