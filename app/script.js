// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [44.969219, -93.262510],
    zoom: 12
});


/* Pull in basemap layers from
/* Basemap #1: Esri Dark Gray */
var EsriDarkGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

/* Basemap #2: Esri Dark Gray Reference */
var EsriDarkGrayCanvasRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

var coffeeshops = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
	  return new L.CircleMarker(latlng, {
      	radius: 5,
      	fillOpacity: 0.85,
      	color: "#000",
      	clickable: false
      });
  },
  onEachFeature: function (feature, layer) {
	  //Popup
	  layer.bindLabel(
			  feature.properties., {
				  noHide: true,
					clickable: true
	  });
  }
});
$.getJSON("data/coffeeshops.geojson", function (data) {
  coffeeshops.addTo(map);
});

/* Used in testing of coffee shop symbols. Not actually used in current version */
var markerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1
};
