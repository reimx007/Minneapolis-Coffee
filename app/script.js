// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [44.969218, -93.262510],
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



/* Used in testing of coffee shop symbols. Not actually used in current version */
var markerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1
};

/* Create variable for coffeeshops*/
var coffeeshops = L.esri.featureLayer({
  url: "http://services.arcgis.com/8df8p0NlLFEShl0r/arcgis/rest/services/CoffeeShops1211/FeatureServer/0", //pulls from ArcGIS Online
  style: function () {                     //Style
    return {
      color: "#155fd6",
      weight: 6
    };
  }, /*
  pointToLayer: function (geojson, latlng) {                            //
      return L.circleMarker(latlng, {                                //
        pane: 'blockpoints',                                       //
        color: 'green'                                           //
      });                                                       \\      Various things tried when styling coffee shops
    } /*                                                         \\
  pointToLayer: L.mapbox.marker.style,                            \\
  layer.setStyle({                                                 \\
				'color': '#39B7CD',
				'opacity': '1'
      });
  pointToLayer: function (feature,latlng) {
    return new L.CircleMarker(latlng,{
      	radius: 10,
      	color: "#af0c22",
      	clickable: true
      });
  },*/

  onEachFeature: function (feature, layer) {               //create popup for each layer
    layer.bindPopup("<b>" + feature.properties.Name + "</b><br />" + feature.properties.Snippet + "<br />"+
    '<a href="' + feature.properties.Insta_link+ '" target="_blank" >Visit Instagram Post</a>' +"<br />"+
    "<img src='photos/" + feature.properties.imageLink + ".JPG'width='250' height='250'></img><br />"              //includes naem, address (Snippet),
                                                                                                                   // Instagram link, and image
    );
  }
}).addTo(map); //add coffee shops to map

/* Function to highlight routes when moused over */
function routesMouseOver(e) {
	var layer = e.target;
		//Change the line style
		e.target.setStyle({
				weight: 10,
				color: '#e1e81b',
		});

}

/* Reset route to not be highlighted after mouse moves */
function resetRoutes(e) {
		this.setStyle({
				weight: 6,
				color: '#155fd6',
		});
}


/* Create variable for routes*/
var routes = L.esri.featureLayer({
  url: "http://services.arcgis.com/8df8p0NlLFEShl0r/arcgis/rest/services/CoffeeTrailsOct25/FeatureServer/0", //pulled from ArcGIS online
  style: function () {          //styled
    return {
      color: "#155fd6",
      weight: 6
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({                                           //calls highlighting and "stop highlighting" functions
    				mouseover: routesMouseOver,
            popupopen: routesMouseOver,
            click: routesMouseOver,
    				mouseout: resetRoutes,
            popupclose: resetRoutes
        			});
    layer.bindPopup("<b>" + feature.properties.date_str + "</b><br />"                 //creates popup on each feature
    + "Distance (mi): " + feature.properties.Distance + "<br />"+                       // popup includes date, distance and time (duration)
    "Time: " +feature.properties.Time
    );
  }
}).addTo(map);                                                    // add routes to map with included popups and functions
