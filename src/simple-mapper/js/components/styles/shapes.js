var shapes = {
  'square': function(obj) {

    var returnShape = new ol.style.RegularShape({
      fill: new ol.style.Fill({color: obj.color}),
      stroke: new ol.style.Stroke({
        color: obj.color, width: obj.outline_width
      }),
      points: 4,
      radius: obj.size,
      angle: Math.PI / 4
    });

    return returnShape;
  },

  'outline': function(obj) {

    var returnShape = new ol.style.RegularShape({
      stroke: new ol.style.Stroke({
        color: obj.color, width: obj.outline_width
      }),
      points: 4,
      radius: obj.size,
      angle: Math.PI / 4
    });

    return returnShape;
  },

  'circle': function(obj) {
    var returnShape = new ol.style.Circle({
      radius: obj.size,
      fill: new ol.style.Fill({color: obj.color}),
      stroke: new ol.style.Stroke({
        color: obj.color, width: obj.outline_width
      })
    });

    return returnShape;
  },
};

window.shapes = shapes;
