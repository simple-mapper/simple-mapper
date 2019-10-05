// Styles for the mapbox-streets-v6 vector tile data set. Loosely based on
// http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6.json

function createStreetsStyle(Style, Fill, Stroke, Icon, Text) {
  var fill = new Fill({color: ''});
  var stroke = new Stroke({color: '', width: 1});
  var polygon = new Style({fill: fill});
  var strokedPolygon = new Style({fill: fill, stroke: stroke});
  var line = new Style({stroke: stroke});
  var text = new Style({text: new Text({
    text: '', fill: fill, stroke: stroke
  })});
  var styles = [];
  return function(feature, resolution) {
    var length = 0;
    var layer = feature.get('layer');
    if (layer == 'playa') {
      fill.setColor('rgb(4, 89, 117, 0.5)');
      styles[length++] = polygon;
    } else if (layer == 'urban') {
      fill.setColor('rgb(26, 139, 244)');
      styles[length++] = polygon;
    } else if (layer == 'water') {
      fill.setColor('rgb(6, 204, 204)');
      styles[length++] = polygon;
    } else if (layer == 'ice') {
      fill.setColor('rgb(26, 168, 57)');
      styles[length++] = polygon;
    } else if (layer == 'river') {
      fill.setColor('rgb(88, 186, 221)');
      styles[length++] = polygon;
    } else if (layer == 'railroad') {
      stroke.setColor('rgb(219, 163, 10)');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'road') {
      stroke.setColor('#e9ac77');
      stroke.setWidth(1);
      styles[length++] = line;
    } else if (layer == 'country_label') {
      text.getText().setText(feature.get('name'));
      text.getText().setFont('bold 15px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    } else if (layer == 'state_label') {
      text.getText().setText(feature.get('name'));
      text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    }
    else if (layer == 'marine') {
      text.getText().setText(feature.get('name'));
      text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    }
    else if (layer == 'lake_label') {
      text.getText().setText(feature.get('name'));
      text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    }
    else if (layer == 'place') {
      text.getText().setText(feature.get('name'));
      text.getText().setFont('bold 11px "Open Sans", "Arial Unicode MS"');
      fill.setColor('#334');
      stroke.setColor('rgba(255,255,255,0.8)');
      stroke.setWidth(2);
      styles[length++] = text;
    }
    else if (layer == 'admin') {
      stroke.setColor('rgb(191, 68, 81)');
      stroke.setWidth(1);
      styles[length++] = line;
    }

    styles.length = length;
    return styles;
  };
}
