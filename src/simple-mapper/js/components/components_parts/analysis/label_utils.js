var label_utils = {

  objIndex: {},

  gen: function(){

    var text = `
    <script id="smartLabel_template" type="text/x-handlebars-template">
    <div>
    <h4>Count: {{count}}</h4>
    <table>
    <tr>
    {{#each header}}
    <td>{{@key}}</td>
    {{/each}}
    </tr>
    {{#each arrayVal}}
    <tr>
    {{#each obj}}
    {{#ifShipmentID @key}}
    <td class = "legend_table otm_hyperlink" style = "color: blue">{{this}}</td>
    {{else}}
    <td class = "legend_table">{{this}}</td>
    {{/ifShipmentID}}
    {{/each}}
    </tr>
    {{/each}}
    </table>
    </div>
    </script>
    `
    label_utils.init(text);
  },

  init: function(text){
    label_utils.render(text);
  },

  render: function(text){

    document.getElementById("popup-content").innerHTML = text;
    var template = document.getElementById("smartLabel_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    console.log(label_utils.objIndex);
    var html = compiledTemplate(label_utils.objIndex);
    document.getElementById("popup-content").innerHTML = html;

    label_utils.post_render();

  },

  post_render: function(){

    var classInput = document.getElementsByClassName("otm_hyperlink");

    for (var i = 0; i < classInput.length; i++) {
      classInput[i].addEventListener('click', label_utils.popup);
    }
  },

  popup: function(e){

  },

  indexObj: {},

  smartLabel: function(lines, source_points, dest_points){

    var indexObj = {};
    var id = "";

    //console.log(source_points);

    for(var i = 0; i < source_points.length; i++){
      if(source_points[i].show == true){
        id = `${source_points[i].lat}_${source_points[i].lng}`;
        if(indexObj[id] != undefined){
          if(!source_points[i].show){

          }
          else if (!source_points[i].smartLabelAvoid){

            if(indexObj[id].set){
              source_points[i].label = indexObj[id].label;
              indexObj[id].set = false;
            }
            else{
              source_points[i].label = "";
            }

          }
        }
        else {
          indexObj[id] = {}
          indexObj[id].arrayVal = [];
          indexObj[id].lat = source_points[i].lat;
          indexObj[id].lng = source_points[i].lng;
          indexObj[id].label = source_points[i].label;
          indexObj[id].set = true;
          indexObj[id].count = 1;
        }
        indexObj[id].arrayVal.push(source_points[i]);
        indexObj[id].count++;
      }
    }

    for(var j = 0; j < dest_points.length; j++){
      if(dest_points[j].show == true){
        id = `${dest_points[j].lat}_${dest_points[j].lng}`;
        if(indexObj[id] != undefined){
          if(!dest_points[j].show){

          }
          else if(!dest_points[j].smartLabelAvoid){

            if(indexObj[id].set){
              dest_points[j].label = indexObj[id].label;
              indexObj[id].set = false;
            }
            else{
              dest_points[j].label = "";
            }

          }
        }
        else {
          indexObj[id] = {}
          indexObj[id].arrayVal = [];
          indexObj[id].lat = dest_points[j].lat;
          indexObj[id].lng = dest_points[j].lng;
          indexObj[id].label = dest_points[j].label;
          indexObj[id].set = true;
          indexObj[id].count = 1;
        }
        indexObj[id].arrayVal.push(dest_points[j]);
        indexObj[id].count++;
      }
    }

    label_utils.indexObj = indexObj;

    [source_points, dest_points] = label_utils.countSet(indexObj, source_points, dest_points)

    if(label_utils.setPopupVal){
      label_utils.setPopup();
    }
    label_utils.setPopupVal = false;

    return [lines, source_points, dest_points]
  },

  countSet: function(indexObj, source_points, dest_points){

    var i = 0;
    var id = "";

    for(i =0; i < source_points.length; i++){
      id = `${source_points[i].lat}_${source_points[i].lng}`;
      if(source_points[i].show && source_points[i].label != "" && !source_points[i].smartLabelAvoid){
          source_points[i].count = indexObj[id].arrayVal.length
          source_points[i].label = source_points[i].label + " *" + source_points[i].count;
      }
    }

    for(i =0; i < dest_points.length; i++){
      id = `${dest_points[i].lat}_${dest_points[i].lng}`;
      if(dest_points[i].show && dest_points[i].label != "" && !dest_points[i].smartLabelAvoid){
          dest_points[i].count = indexObj[id].arrayVal.length
          dest_points[i].label = dest_points[i].label + " *" + dest_points[i].count;
      }
    }

    return [source_points, dest_points];
  },

  setPopup: function(){


    document.getElementById('popup-closer').onclick = function() {
      map.overlay.setPosition(undefined);
      document.getElementById('popup-closer').blur();
      return false;
    };

    map.obj.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      //console.log(evt.coordinate);
      //var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));


      var hdms = ol.proj.toLonLat(coordinate);
      var point = label_utils.selectedPoint(hdms);

      //console.log(point);

      if(point.arrayVal != undefined){
        // label_utils.content.innerHTML = '<p>You clicked here:</p><code>' + `${point.lng}, ${point.lat}` +
        // '</code>';

        label_utils.objIndex = point;
        label_utils.objIndex.header = point.arrayVal[0].obj;
        label_utils.objIndex.count = point.arrayVal.length;

        label_utils.gen();

        map.overlay.setPosition(ol.proj.fromLonLat([point.lng, point.lat]));
      }
    });
    ////console.log("ok");

  },

  setPopupVal: true,

  selectedPoint: function(point){

    var up = 0;
    var down = 0;
    var left = 0;
    var right = 0;
    var returnPoint = {};


    for(var keys in label_utils.indexObj){

      up = label_utils.indexObj[keys].lat + 0.03;
      down = label_utils.indexObj[keys].lat - 0.03;
      left = label_utils.indexObj[keys].lng - 0.03;
      right =  label_utils.indexObj[keys].lng + 0.03;

      if(point[1] < up && point[1] > down && point[0] > left && point[0] < right){
        returnPoint = label_utils.indexObj[keys];
        break;
      }

    }

    return returnPoint

  }

}
