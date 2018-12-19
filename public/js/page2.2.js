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
        ['(1) 2x6 @24 OC(R21)+ R9.6 c.i.', 18, -4.27],
        ['(2) 2x4 staggered studs on 2x6 sill plate (R19)', 10, -4.17],
        ['(3) 2x4 staggered studs on 2x8 sill plate (R26)', 4, -4.37],
        ['(4) SIPs R28', 0, -6.01],
        ['(5) SIPs R40', 0, -6.90],
        ['(6) SIPs R50', 0, -8.07],
        ['(7) ICF 9 in', 0, -12.05],
        ['(8) ICF 11 in', 0, -11.86],
        ['(9) ICF 13 in', 0, -12.23]
    ];
    var chart = Dalaba.Chart(document.getElementById("vis"),                 {

        title: { enabled: true, text:" "},
        type: "bar",

        chart: {
            height: containerHeight
        },
        xAxis: {
            labels: {
                formatter: function () {                
                    return Math.abs(this.value) ;
                }},
            title: { enabled: false, 
                    text: "Construction Cost [$/ft^2]",style: {
                        fontSize: '15px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: containerHeight * -2,
                    verticalAlign: 'top',
                    y: -191},

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
            title: { enabled: true, text: "Construction Cost [$/ft^2]", style: {
                fontSize: '15px'},},
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
            enabled: false,
        },
        series: [{
            type: "bar",
            name: " ",
            color: "#0086F8",
            //            data: data.map(function(t){
            //                return t[2]
            //            }),
            data: [{y:-12.23, color:'black'}, -11.86, -12.05, -8.07, -6.90, -6.01, -4.37, -4.17, {y:-4.27, color:'green'}],


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
            name: " ",            
            color: "#0013f8",
            //            data: data.map(function(t){
            //                return t[1]
            //            }),
            data: [0, 0, 0, 0, 0, 0, 4, 10, {y:18, color:'green'}],
            yAxis: 1
        }
                ]

    });   


}); //end of doc ready

   var data = [
        ['(1) 2x6 @24 OC(R21)+ R9.6 c.i.', 18, -4.27],
        ['(2) 2x4 staggered studs on 2x6 sill plate (R19)', 10, -4.17],
        ['(3) 2x4 staggered studs on 2x8 sill plate (R26)', 4, -4.37],
        ['(4) SIPs R28', 0, -6.01],
        ['(5) SIPs R40', 0, -6.90],
        ['(6) SIPs R50', 0, -8.07],
        ['(7) ICF 9 in', 0, -12.05],
        ['(8) ICF 11 in', 0, -11.86],
        ['(9) ICF 13 in', 0, -12.23]
    ];