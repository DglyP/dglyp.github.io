Date.prototype.format = function() {
    var month = this.getMonth();
    month = (month < 10 ? "0" : "") + month;
    var day = this.getDate();
    day = (day < 10 ? "0" : "") + day;
    return this.getFullYear() + "-" + month + "-" + day
}
var token = "eUJAFHNCGUyRKDUalOUmhFsdVBRBacCN";
var rainchart;
var snowChart;

function avg(o) {
    if (typeof o == "string") {
        return o;
    }
    return d3.mean(o) || 0;
}
function sum(acc, v, i) {
    if (isNaN(v)) {
        return acc;
    }
    return acc + v;
}
(function getWeather() {
    var endDate, startDate;
    var locationid = "CITY:US170006";
    $.ajax({
        url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GHCND",
        data: {
            locationid: locationid
        },
        headers: {
            token: token
        }
    }).done(function(d) {
        maxdate = d.maxdate.split("-");
        endDate = new Date(maxdate[0], maxdate[1], maxdate[2]);
        startDate = new Date(endDate - (24000 * 3600 * 7));
    }).always(function() {
        $.when(
            $.ajax({
                url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=PRCP&datatypeid=SNOW&datatypeid=SNWD",
                data: {
                    locationid: locationid,
                    datasetid: "GHCND",
                    startdate: startDate.format(),
                    enddate: endDate.format(),
                    limit: 1000,
                    sortfield: "date",
                    units: "metric"
                },
                headers: {
                    token: token
                }
            }),
            $.ajax({
                url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=PRCP&datatypeid=SNOW&datatypeid=SNWD",
                data: {
                    locationid: locationid,
                    datasetid: "GHCND",
                    startdate: startDate.format(),
                    enddate: endDate.format(),
                    limit: 1000,
                    sortfield: "date",
                    units: "metric",
                    offset: 1001
                },
                headers: {
                    token: token
                }
            }),
            $.ajax({
                url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=PRCP&datatypeid=SNOW&datatypeid=SNWD",
                data: {
                    locationid: locationid,
                    datasetid: "GHCND",
                    startdate: startDate.format(),
                    enddate: endDate.format(),
                    limit: 1000,
                    sortfield: "date",
                    units: "metric",
                    offset: 1601
                },
                headers: {
                    token: token
                }
            })
        ).done(function(d1, d2) {
            if (d2 && d2[0] && d2[0].results) d1[0].results.push.apply(d1[0].results, d2[0].results)
            var PRCP = ["Rain"],
                SNOW = ["Snow quantity"],
                dataCategory = ["X"],
                results = d1[0].results
                i = 0,
                j = 1;
            while (i < results.length) {
                var o = results[i];
                var date = o.date;
                PRCP[j] = [];
                SNOW[j] = [];
                dataCategory[j] = date.slice(0,10);
                do {
                    switch (o.datatype) {
                        case "PRCP":
                            PRCP[j].push(o.value);
                            break;
                        case "SNOW":
                            SNOW[j].push(o.value);
                            break;
                        default:
                    };
                    i += 1;
                    o = results[i];
                } while (o && date == o.date);
                j += 1;
            };
            PRCP = PRCP.map(avg);
            SNOW = SNOW.map(avg);
    
            rainchart = Highcharts.chart('rainchart', {
              chart: {
                type: 'column',
                zoomType: 'x',
              },
              title: {
                    text: 'Rain precipitation in Chicago'
                },
                subtitle: {
                    text: 'Click and drag in the plot area to zoom in'

                },
                xAxis: {
                   categories: dataCategory.slice(1)
                },
                yAxis: {
                   title: {
                      text: 'Precipitation (mm)'
                   }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:,.2f}</b><br/>'
                },
                series: [{
                    name: PRCP[0],
                    data: PRCP.slice(1)
                }]
            });
            
            snowChart = Highcharts.chart('snowChart', {
              chart: {
                type: 'spline',
                zoomType: 'x',
              },
              title: {
                    text: 'Snow in Chicago'
                },
                subtitle: {
                    text: 'Click and drag in the plot area to zoom in'

                },
                xAxis: {
                   categories: dataCategory.slice(1)
                },
                yAxis: {
                   title: {
                      text: 'Precipitation (mm)'
                   }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:,.2f}</b><br/>'
                },
                series: [{
                    name: SNOW[0],
                    data: SNOW.slice(1)
                }]
            });

        });
    });
})();