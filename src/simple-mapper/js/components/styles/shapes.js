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
      // fill: new ol.style.Fill({color: obj.color}),
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

  // 'triangle': new Style({
  //   image: new RegularShape({
  //     fill: fill,
  //     stroke: stroke,
  //     points: 3,
  //     radius: 10,
  //     rotation: Math.PI / 4,
  //     angle: 0
  //   })
  // }),
  // 'star': new Style({
  //   image: new RegularShape({
  //     fill: fill,
  //     stroke: stroke,
  //     points: 5,
  //     radius: 10,
  //     radius2: 4,
  //     angle: 0
  //   })
  // }),
  // 'cross': new Style({
  //   image: new RegularShape({
  //     fill: fill,
  //     stroke: stroke,
  //     points: 4,
  //     radius: 10,
  //     radius2: 0,
  //     angle: 0
  //   })
  // }),
  // 'x': new Style({
  //   image: new RegularShape({
  //     fill: fill,
  //     stroke: stroke,
  //     points: 4,
  //     radius: 10,
  //     radius2: 0,
  //     angle: Math.PI / 4
  //   })
  // })
};
