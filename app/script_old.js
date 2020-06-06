// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [44.969219, -93.262510],
    zoom: 12
});


/* Pull in basemap layers from
/* Basemap #1: Esri Dark Gray */
// var EsriDarkGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
// 	maxZoom: 16
// }).addTo(map);
//
// /* Basemap #2: Esri Dark Gray Reference */
// var EsriDarkGrayCanvasRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
// 	maxZoom: 16
// }).addTo(map);

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});


function onEachFeature(feature, circle) {
        circle.bindPopup("<b>" + feature.properties.Name + "</b><br />" + feature.properties.Snippet + "<br />"+
    '<a href="' + feature.properties.Insta_link+ '" target="_blank" >Visit Instagram Post</a>' +"<br />"+
    "<img src='photos/" + feature.properties.imageLink + ".JPG'width='250' height='250'></img><br />");
}
/*
function onEachFeature(feature, circle) {
        circle.bindPopup(feature.properties.Name);
}*/
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#00aeef",
    color: "#113c66",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var coffeeshops = new L.GeoJSON.AJAX("data/coffeeshops.geojson", {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
  onEachFeature: onEachFeature
})//.addTo(map);

// trying out
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var routes = new L.GeoJSON.AJAX("data/routes.geojson",{
  style: myStyle
})//.addTo(map);

var coffeeshops_layer = L.layerGroup(coffeeshops);
var route_layer = L.layerGroup(routes);

// Create an overlay object
var overlayMaps = {
  "Coffee Shops": coffeeshops_layer,
  "Bike Routes": route_layer
};

// Add the layer control to the map
L.control.layers(overlayMaps, {
  collapsed: false
}).addTo(map);
