$(document).ready(function() {      

    /////////////////////////////////////HIGH


    var containerHeight = +d3.select('.carda').style('height').slice(0, -2)

    var data = [
        ['Best ROI', 15.06, -9.17],
        ['Final Selection', 8.08, -9.73],
        ['Baseline', 0, -7.31]
    ];

    var data1 = [
        ['Best ROI', 4, -0.32],
        ['Final Selection', 10, -0.09],
        ['Baseline', 18, -0.37]
    ];

    var data2 = [
        ['Best ROI', 4, -0.05],
        ['Final Selection', 10, -0.08],
        ['Baseline', 18, -0.13]
    ];

    var data3 = [
        ['Best ROI', 4, -0.12],
        ['Final Selection', 10, -0.12],
        ['Baseline', 18, -0.14]
    ];

    var data4 = [
        ['Best ROI', 4, -0.41],
        ['Final Selection', 10, -0.50],
        ['Baseline', 18, -0.50]
    ];

    var data5 = [
        ['Best ROI', 4, -0.01],
        ['Final Selection', 10, -0.01],
        ['Baseline', 18, -0.06]
    ];

    var data6 = [
        ['Best ROI', 4, -0],
        ['Final Selection', 10, -0.04],
        ['Baseline', 18, -0]
    ];

    var data7 = [
        ['Best ROI', 4, -0.29],
        ['Final Selection', 10, -0.41],
        ['Baseline', 18, -0.41]
    ];

    var data8 = [
        ['Best ROI', 4, -1.21],
        ['Final Selection', 10, -1.25],
        ['Baseline', 18, -1.61]
    ];

    Dalaba.Chart(document.getElementById("vis"),                 {

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
            title: { enabled: false, 
                    text: "Utility Cost [$/ft^2]",style: {
                        fontSize: '13px'
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
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data.map(function(t){
                return t[0];
            }),
            tickAmount: data.length,
            labels: {
                enabled: false,
            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
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
    Dalaba.Chart(document.getElementById("vis2"),                 {

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
                    text: "Heating",
                    style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data1.map(function(t){
                return t[0];
            }),
            tickAmount: data1.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data1.map(function(t){
                return t[0];
            }),
            tickAmount: data1.length,
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
            data: data1.map(function(t){
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
            data: data1.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });    
    Dalaba.Chart(document.getElementById("vis3"),                 {

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
                    text: "Cooling",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data2.map(function(t){
                return t[0];
            }),
            tickAmount: data2.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data2.map(function(t){
                return t[0];
            }),
            tickAmount: data2.length,
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
            data: data2.map(function(t){
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
            data: data2.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   
    Dalaba.Chart(document.getElementById("vis4"),                 {

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
                    text: "Interior Lighting",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data3.map(function(t){
                return t[0];
            }),
            tickAmount: data3.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data3.map(function(t){
                return t[0];
            }),
            tickAmount: data3.length,
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
            data: data3.map(function(t){
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
            data: data3.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   
    Dalaba.Chart(document.getElementById("vis5"),                 {

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
                    text: "Interior Equipment",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data4.map(function(t){
                return t[0];
            }),
            tickAmount: data4.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data4.map(function(t){
                return t[0];
            }),
            tickAmount: data4.length,
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
            data: data4.map(function(t){
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
            data: data4.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   
    Dalaba.Chart(document.getElementById("vis6"),                 {

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
                    text: "Fans",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data5.map(function(t){
                return t[0];
            }),
            tickAmount: data5.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data5.map(function(t){
                return t[0];
            }),
            tickAmount: data5.length,
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
            data: data5.map(function(t){
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
            data: data5.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });  
    Dalaba.Chart(document.getElementById("vis7"),                 {

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
                    text: "Pumps",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data6.map(function(t){
                return t[0];
            }),
            tickAmount: data6.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data6.map(function(t){
                return t[0];
            }),
            tickAmount: data6.length,
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
            data: data6.map(function(t){
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
            data: data6.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   

    Dalaba.Chart(document.getElementById("vis8"),                 {

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
                    text: "Water Systems",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data7.map(function(t){
                return t[0];
            }),
            tickAmount: data7.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data7.map(function(t){
                return t[0];
            }),
            tickAmount: data7.length,
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
            data: data7.map(function(t){
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
            data: data7.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   

    Dalaba.Chart(document.getElementById("vis9"),                 {

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
            title: { enabled:true, 
                    text: "Total End Uses",style: {
                        fontSize: '17px'
                    },
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 0,
                    verticalAlign: 'top',
                    y: 0},

            type: "linear",
        },
        yAxis: [ {
            //            side of label
            opposite: true,

            title: { enabled: true, text: "Simple Annualized ROI [%]", style: {
                fontSize: '13px', fontWeight: 'bold' },},

            categories: data8.map(function(t){
                return t[0];
            }),
            tickAmount: data8.length,
            labels: {
                enabled: false,

            }
        }, {
            title: { enabled: true, text: "Utility Cost [$/ft^2]",style: {
                fontSize: '13px', fontWeight: 'bold' },},
            categories: data8.map(function(t){
                return t[0];
            }),
            tickAmount: data8.length,
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
            data: data8.map(function(t){
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
            data: data8.map(function(t){
                return t[1]
            }),
            yAxis: 1
        }
                ]

    });   

    ////////////////////////////////////

    $('a').tooltip({placement: 'top'});

    $( "#toggle1" ).click(function() {
        $("#widget-body1").slideToggle( "slow" );

        $('#toggle1').toggleClass(function() {
            if ($(this).is('.fa fa-chevron-down')) {
                return '.fa fa-chevron-up';
            } else {
                return '.fa fa-chevron-down';
            }
        })
    });  

    $( "#toggle2" ).click(function() {
        $("#widget-body2").slideToggle( "slow" );

        $('#toggle2').toggleClass(function() {
            if ($(this).is('.fa fa-chevron-down')) {
                return '.fa fa-chevron-up';
            } else {
                return '.fa fa-chevron-down';
            }
        })
    }); 

    // https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
    const sample = [
        {
            language: 'January',
            value: 0.14,
            color: '#000000'
        },
        {
            language: 'February',
            value: 0.12,
            color: '#00a2ee'
        },
        {
            language: 'March',
            value: 0.11,
            color: '#fbcb39'
        },
        {
            language: 'April',
            value: 0.10,
            color: '#007bc8'
        },
        {
            language: 'May',
            value: 0.10,
            color: '#65cedb'
        },
        {
            language: 'June',
            value: 0.10,
            color: '#ff6e52'
        },
        {
            language: 'July',
            value: 0.11,
            color: '#f9de3f'
        },
        {
            language: 'August',
            value: 0.10,
            color: '#5d2f8e'
        },
        {
            language: 'September',
            value: 0.09,
            color: '#008fc9'
        },
        {
            language: 'October',
            value: 0.10,
            color: '#507dca'
        },
        {
            language: 'November',
            value: 0.10,
            color: '#008fc9'
        },
        {
            language: 'December',
            value: 0.13,
            color: '#008fc9'
        }
    ];

    const svg = d3.select('svg');
    const svgContainer = d3.select('#container');

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.language))
    .padding(0.4)

    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 0.2]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
    .scale(yScale)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart.append('g')
        .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
              .tickSize(-width, 0, 0)
              .tickFormat('')
             )

    const barGroups = chart.selectAll()
    .data(sample)
    .enter()
    .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.language))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
            .attr('opacity', 0)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.language) - 5)
            .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)

        barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
        })

    })
        .on('mouseleave', function () {
        d3.selectAll('.value')
            .attr('opacity', 1)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.language))
            .attr('width', xScale.bandwidth())
        chart
            .selectAll('#limit').remove()
        chart
            .selectAll('.divergence').remove()
    })

    barGroups.append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}%`)

    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('$/ft^2')

    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Monthly Electricity Consumption [$/ft^2]')

    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Monthly Chart with $/ft^2 units')

    svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')
        .text('')    

    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });
    $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
    });
    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    }); 
});