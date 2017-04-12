var map;
var ILatLng = {lat: 41.8708, lng: -87.6505}; 

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(41.8708,-87.6505),
      mapTypeId: 'terrain'
    });
    
    var ImportantMarker = new google.maps.Marker({
                    position: {lat: 41.8708, lng: -87.6505},
                    map: map,
                    title: 'Department of Computer Science – University of Illinois' 
                });
    
    map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/e9ef-hrzb?method=export&format=GeoJSON')
    
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    ;
    
              }

function fillRentHouses( ) {
    var houserent = [];
    $.ajax({
        url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
        type: "GET",
        dataset: {
          "$$app_token" : "9C7IslWfsQG71dzCSk9EOIhoT"
        }
            }).success(function(data) {
                                    for (var i = 0; i <= dataset.length; i++) {
                                        if (dataset[i]){
                                    var marker = new google.maps.Marker({
                                       position: new google.maps.LatLng(dataset[i].latitude,dataset[i].longitude),
                                       map: map,
                                       title: dataset[i].address,
                                     });
                                      houserent.push(marker);
                                        }
                                    };
            });

}