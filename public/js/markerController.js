function addMarker(markerAdd) {
    var marker = new google.maps.Marker({
        position: markerAdd.position,
        icon: markerAdd.icon,
        map: map,
        title: markerAdd.title
    });
    marker.setVisible(true);
    return marker;
}

function distanceMarkers(position1, position2) {
    var radians = function (angle) {
        return angle * Math.PI / 180;
    };

    var radius = 6371e3; // metres
    var Lat1Rad = radians(position1.lat);
    var Lat2Rad = radians(position2.lat);
    var dLatRad = radians(position2.lat - position1.lat);
    var dLonRad = radians(position2.lng - position1.lng);

    var a = Math.pow(Math.sin(dLatRad / 2), 2) + Math.cos(Lat1Rad) * Math.cos(Lat2Rad) * Math.pow(Math.sin(dLonRad / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}

function loadHouses(pin) {
    loadHousesData();
}

function deleteMarker(marker) {
    marker.setMap(null);
    marker = null;
}

function deleteAllMarkers() {
    $.each(markers, function (i, rental) {
        deleteMarker(rental.marker);
    });
    markers = {};
}
