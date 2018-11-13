var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      rotateControl: true,
      center: new google.maps.LatLng(40.7291,-73.9965),
    });
    
    var ImportantMarker = new google.maps.Marker({
                    position: {lat: 40.7291, lng: -73.9965},
                    map: map,
                    icon: "images/school.png",
                    title: 'Department of Computer Science – University of Illinois ' 
                });
    boundaries();
              }

function boundaries() {
    boundaries = new google.maps.Data();
    boundaries.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    boundaries.setStyle({fillColor: 'rgba(0, 167, 255, 0.36)' , strokeColor: 'rgba(221, 48, 154, 0.69)'});
    boundaries.setMap(map)
}