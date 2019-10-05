var point_styles = {

  changingStyle: function(point){

    var obj = point.style;

    var style = new ol.style.Style({
      image: shapes[`${obj.shape}`](obj),
      text: new ol.style.Text({
        font: `${point.font_size}px Arial`,
        fill: new ol.style.Fill({ color: [0, 0, 0, 1] }),
        //text: map.obj.getView().getZoom() > 9 ? point.label : '',
        text: point.label,
        offsetY: point.labelOffsetY,
      }),
      zIndex: 10
    });

    return [style]
  },
}
