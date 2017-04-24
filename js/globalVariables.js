var map;
var parks;
var radiusSearch = 3e3;
var radiusPolice = 3e3;
var maxPrice = 10e6;
var boundaries;
var markers = {};
var token = "eUJAFHNCGUyRKDUalOUmhFsdVBRBacCN";

var hospitalPin = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    draggable: true,
    title: "hospital",
};

var pinUser = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    title: "user",
};

var rentalPin = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    draggable: true,
    title: "rent",
};

var crimePin = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    draggable: true,
    title: "crime",
};

var policePin = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    draggable: true,
    title: "police",
};