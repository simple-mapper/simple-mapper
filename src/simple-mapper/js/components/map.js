//https://openlayers.org/en/latest/examples/draw-shapes.html
var currentPath = __dirname;

//Need to update render with this
//console.log(currentPath);

var map = {
  obj: {},
  vectorSource: {},
  vectorLayer: {},
  gen: function(){

    map.overlay =  new ol.Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      // autoPanAnimation: {
      //   duration: 250
      // }
    }),

    map.vectorSource = new ol.source.Vector({
      features: []
    });

    map.vectorLayer = new ol.layer.Vector({
      source: map.vectorSource,
    });

    map.vectorLayer.setZIndex(9);

    map.view = new ol.View({
      center: ol.proj.fromLonLat([-98.5795, 39.8283]),
      zoom: 4.6
    });

    var styleJson = 'https://api.maptiler.com/maps/2cbbdea0-8853-4f80-aa9c-16c973c29fe3/style.json?key=b8vmrAzyKw6tDr0E3k0j';
    //var styleJson = 'http://localhost:8000/data/tmsource____tm2source.json';
    const urlParams = new URLSearchParams(window.location.search);
    const myParams = urlParams.get('offline');

    const myParamsOSM = urlParams.get('osm');

    //Example http://127.0.0.1:8080/?offline=true

    map.obj = new ol.Map({
      target: 'map',
      renderer: 'webgl',
      layers: [
        map.vectorLayer,
      ],
      overlays: [map.overlay],
      view: map.view,
    });
    olms.apply(map.obj, styleJson);

    // map.obj.addControl(new ol.control.FullScreen());

    map.init();

  },

  init: function(){
    map.post_render();
  },

  post_render: function(){
    //toolbar.gen();

  },


}
