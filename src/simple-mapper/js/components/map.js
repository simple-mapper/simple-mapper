
var map = {
  obj: {},
  vectorSource: {},
  vectorLayer: {},
  gen: function(){

    map.overlay =  new ol.Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
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

    map.obj = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        map.vectorLayer,
      ],
      overlays: [map.overlay],
      view: map.view,
    });
    //olms.apply(map.obj, styleJson);

    map.init();

  },

  init: function(){
    map.post_render();
  },

  post_render: function(){

  },


}

window.map = map;
