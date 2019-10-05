var mapStyles = {

  stateMapping: function(feature){

    return [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "rgb(128,128,128, 0.8)", width: 2
      }),
      fill: new ol.style.Fill({
        color: "#fff8dc"
      }),
      text: new ol.style.Text({
        font: `12px Helvetica`,
        fill: new ol.style.Fill({ color: [0, 0, 0, 1] }),
        text: map.obj.getView().getZoom() < 8 ? (feature.values_.NAME ? feature.values_.NAME : feature.values_.state_name) : '' ,
        offsetY: -7,
      }),
    })];

  },

  roadMapping: function(feature){

    return [new ol.style.Style({
      stroke: map.obj.getView().getZoom() > 4 ? new ol.style.Stroke({
        color: "grey", width: 1
      }): '',
      fill: map.obj.getView().getZoom() > 4 ? new ol.style.Fill({ color: "white" }) : '',
    })];

  },

  countriesMapping: function(feature){

    return [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "black",
        width: 2
      }),
    })];
  },

  citiesMapping: function(feature){
    //console.log('Check you get the property', feature);
    return [new ol.style.Style({
      image: (map.obj.getView().getZoom() > 6 && feature.values_.POP_2010 > 500000) || (map.obj.getView().getZoom() > 6 && feature.values_.POP_2010 > 100000)  || (map.obj.getView().getZoom() > 8 && feature.values_.POP_2010 > 70000) || (map.obj.getView().getZoom() > 10 && feature.values_.POP_2010 > 5000)  || (map.obj.getView().getZoom() > 11) ? new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({color: "black"}),
      }) : '',
      text: new ol.style.Text({
        font: `10px Arial`,
        fill: new ol.style.Fill({ color: [0, 0, 0, 1] }),
        text: (map.obj.getView().getZoom() > 6 && feature.values_.POP_2010 > 500000) || (map.obj.getView().getZoom() > 6 && feature.values_.POP_2010 > 100000)  || (map.obj.getView().getZoom() > 8 && feature.values_.POP_2010 > 70000) || (map.obj.getView().getZoom() > 10 && feature.values_.POP_2010 > 5000)  || (map.obj.getView().getZoom() > 11) ? feature.values_.NAME : '',
        offsetY: -7,
      }),
    })];
  },




}
