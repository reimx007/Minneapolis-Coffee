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

var mnCountiesJSON = new L.GeoJSON.AJAX("data/mnCounties.geojson", {
  style: function() {
          return {
            color: "#fff",
            weight: 2
          };
  }
}).addTo(map);

var coffeeshops = new L.GeoJSON.AJAX("data/coffeeshops.geojson", {
  pointToLayer: function (feature, latlng) {
	  return new L.CircleMarker(latlng, {
      	radius: 5,
      	fillOpacity: 0.85,
      	color: "#155fd6",
      });
  },
  onEachFeature: function (feature, layer) {               //create popup for each layer
    layer.bindPopup("<b>" + feature.properties.Name + "</b><br />" + feature.properties.Snippet + "<br />"+
    '<a href="' + feature.properties.Insta_link+ '" target="_blank" >Visit Instagram Post</a>' +"<br />"+
    "<img src='photos/" + feature.properties.imageLink + ".JPG'width='250' height='250'></img><br />"              //includes naem, address (Snippet),
                                                                                                                   // Instagram link, and image
    );
  }
}).addTo(map);
