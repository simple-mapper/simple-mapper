var map_utils = {
  createFeature: function(coord, obj, point) {

    var feature = new ol.Feature({
      type: 'geoMarker',
      geometry: new ol.geom.Point(coord)
    });

    feature.setStyle(point_styles.changingStyle(point));
    map.vectorSource.addFeature(feature);

  },

  createLine: function(coord, line) {

    var feature = new ol.Feature({
      type: 'lineString',
      geometry: new ol.geom.LineString(coord)
    });

    map.vectorSource.addFeature(feature);

  },

  center: function(SLat, SLng, DLat, DLng){

    var [lat1, lng1] = map_utils.middlePoint(SLat, SLng, DLat, DLng);

    map.view.animate({
      center: ol.proj.fromLonLat([lat1, lng1]),
      duration: 2000,
      zoom: 6
    });


  },

  middlePoint: function (lat1, lng1, lat2, lng2) {

    //-- Longitude difference
    var dLng = (lng2 - lng1) * (Math.PI / 180);

    //-- Convert to radians
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lng1 = lng1 * (Math.PI / 180);

    var bX = Math.cos(lat2) * Math.cos(dLng);
    var bY = Math.cos(lat2) * Math.sin(dLng);
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    //-- Return result
    return [(lng3*(180 / Math.PI)), (lat3*(180 / Math.PI))];
  }

}

window.map_utils = map_utils;
