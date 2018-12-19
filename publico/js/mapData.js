function loadHousesData() {
    var rentalMarkerBest;
    var minDistance = 10e6;
    var maxDistance = 0;
    var minUnits = 10e6;
    var maxUnits = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, house) {
                var dataset = {
                    rental: house[1],
                    community_area: house[8],
                    community_area_number: house[9],
                    propertyType: house[10],
                    propertyName: house[11],
                    address: house[12],
                    zip_code: house[13],
                    phoneNumber: house[14],
                    management_company: house[15],
                    units: Number(house[16]),
                    position: {
                        lat: Number(house[19]),
                        lng: Number(house[20])
                    },
                    distance: distanceMarkers({
                        lat: Number(house[19]),
                        lng: Number(house[20])
                    }, pinUser.position)
                };
                if (dataset.units > maxUnits) {
                    maxUnits = dataset.units;
                }
                if (dataset.distance > maxDistance) {
                    maxDistance = dataset.distance;
                }
                if (dataset.distance < radiusSearch && dataset.units < maxPrice) {
                    if (dataset.distance < minDistance && dataset.units < minUnits) {
                        rentalMarkerBest = dataset.rental;
                        minUnits = dataset.units;
                        minDistance = dataset.distance;
                    }
                    rentalPin.title = dataset.propertyName;
                    rentalPin.position = dataset.position;
                    rentalPin.icon = "images/house.png"
                    markers[rentalPin.title] = {
                        marker: addMarker(rentalPin)
                    };
                }

            });
            }
        }
    };


function loadCrimeData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET',"https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, crime) {
                var dataset = {
                    id: crime[1],
                    address: crime[12],
                    zip_code: crime[13],
                    position: {
                        lat: Number(crime[17]),
                        lng: Number(crime[18])
                    },
                    
                };
                    crimePin.title = dataset.address;
                    crimePin.position = dataset.position;
                    crimePin.icon = "images/crimes.png"
                    markers[crimePin.title] = {
                        marker: addMarker(crimePin)
                    };
                }

            );
            }
        }
    };

function loadHospitalData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET',"https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, hospital) {
                var dataset = {
                    id: hospital[1],
                    name: hospital[8],
                    address: hospital[12],
                    zip_code: hospital[15],
                    position: {
                        lat: Number(hospital[27]),
                        lng: Number(hospital[28])
                    },
                    
                };
                    hospitalPin.title = dataset.name;
                    hospitalPin.position = dataset.position;
                    hospitalPin.icon = "images/hospitals.png"
                    markers[hospitalPin.title] = {
                        marker: addMarker(hospitalPin)
                    };
                }

            );
            }
        }
    };

function loadPoliceData() {
    boundaries();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET',"https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, police) {
                var dataset = {
                    id: police[1],
                    address: police[10],
                    zip_code: police[13],
                    position: {
                        lat: Number(police[20]),
                        lng: Number(police[21])
                    },
                    
                };
                    policePin.title = dataset.address;
                    policePin.position = dataset.position;
                    policePin.icon = "images/police.png"
                    markers[policePin.title] = {
                        marker: addMarker(policePin)
                    };
                }

            );
            }
        }
    };

function loadParksData(){
   parks = new google.maps.Data();
   parks.loadGeoJson('https://data.cityofchicago.org/api/geospatial/e9ef-hrzb?method=export&format=GeoJSON');
    
    parks.setStyle({
        icon:"images/parks.png"
    });
    parks.setMap(map)
    }

function boundaries() {
    boundaries = new google.maps.Data();
    boundaries.loadGeoJson('https://data.cityofchicago.org/api/geospatial/24zt-jpfn?method=export&format=GeoJSON');
    boundaries.setMap(map)
}

function hideboundaries() {
    boundaries.setMap(null)
    document.getElementById("show").style.visibility = "visible";
}

function showboundaries() {
    boundaries.setMap(map)
    
}

function clearMap() {
    parks.setMap(null);
    boundaries.setMap(null);
    deleteAllMarkers();
}

          