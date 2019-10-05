var upload = {

  data: {},

  gen: function(){
    render.upload();
  },

  init: function(text){
    upload.render(text);
  },

  render: function(text){

    document.getElementById("toolbar_body_div").innerHTML = text;
    var template = document.getElementById("upload_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("toolbar_body_div").innerHTML = html;

    upload.post_render();

  },

  post_render: function(){
    upload.setUploadActions();
    export_.gen();
    toolbar_controls.gen();

    // upload.data = {values: [["34.374", "-80.0734", "33.749", "-84.388", "Example"]]};
    // upload.confirmUploadData();

  },

  setUploadActions: function(){
    document.getElementById('inputFile').addEventListener("change", upload.setUploadData);
    document.getElementById('inputSubmit').addEventListener("click", (event) => {
      event.preventDefault();

      point_styles_model.fun.clear();

      if(export_.id == "simple-mapper"){
        upload.confirmUploadData('non-skip');
      }
      else {
        wizard.gen();
      }
      //upload.confirmUploadData();
      //document.getElementById("inputFile").value = null;
    });
    document.getElementById('exampleSubmit').addEventListener("click", (event) => {
      event.preventDefault();
      upload.data = {values: [["Source Latitude", "Source Longitude", "Destination Latitude", "Destination Longitude", "Category", "Zip", "Weights"],
      ["34.374" ,"-80.0734", "33.749", "-84.388", "Example", "30316", "100"],
      ["35.374","-80.0734", "33.749", "-84.388", "Example2", "29550", "50"],
      ["34.374","-80.0734", "40.749", "-90.388", "Example", "29501", "70"],
      ["34.374","-80.0734", "35.749", "-89.388", "Example", "30316", "50"],
      ["34.374","-80.0734", "35.749", "-89.388", "Example", "L5M7W7", "25"]
    ]};
    point_styles_model.fun.clear();
    wizard.gen();
    //analysis.gen();
    //upload.confirmUploadData();
  });
},

requestGen: function(data, type){
  upload.data = {values: data};

  console.log(upload.data);

  if(type != "skip"){
    point_styles_model.fun.clear();
    legend.show = false;

    if(data[1] != undefined){
      map_utils.center(data[1][10], data[1][11], data[1][15], data[1][16]);
    }

    wizard_model.confirmed = {
      SLat: "10",
      SLng: "11",
      DLat: "15",
      DLng: "16",
      CAT: "0",
      TXT: `${data[0].length - 1}`,
      font_size: 20,
      smartLabel: true,
    };

    filters.fun = new Function("lines", "source_points", "dest_points", `${rate_request_results.filter} \n  return [lines, source_points, dest_points];`);

    var str = `${rate_request_results.filter}`;
    localStorage.setItem('filter', str);

  }

  console.log(filters.fun);

  upload.confirmUploadData("skip");
},

setUploadData: function(evt){

  export_.id = "n/a";

  var files = evt.target.files;
  var file = files[0];

  var reader = new FileReader();
  reader.readAsText(file)

  reader.onload = function(event){

    if(file.type == "application/json"){
      export_.read(event.target.result);
    }
    else{
      var csv = event.target.result;
      var data = Papa.parse(csv);
      upload.data = {values: data.data};
      reader = {};
      csv = {};
    }

  }
},

first: true,

confirmUploadData: function(check){



  map.vectorSource.clear();

  var source_points = [];
  var dest_points = [];
  var lines = [];
  var pointSource = {};
  var pointDest = {};

  var i = 0;

  if(export_.id == "simple-mapper"){
    point_styles_model.fun.clear();
    point_styles_model.fun.toArraySetAll(export_.data.styles);

    export_.id = "n/a";
  }

  //Main Point Setting
  if(upload.data.values != undefined){
    var headers = upload.data.values[0];
    for(i = 0; i < (upload.data.values.length); i++){
      if(upload.dataCheck(upload.data.values[i], wizard_model.confirmed)){
        var point_source = upload.setPointData(upload.data.values[i], "Source" , upload.setObj(headers,upload.data.values[i]), wizard_model.confirmed);
        var point_dest = upload.setPointData(upload.data.values[i], "Destination", upload.setObj(headers,upload.data.values[i]), wizard_model.confirmed);

        if(point_source != undefined){
          [source_points, dest_points, pointSource] = upload.generatePoints(point_source, source_points, dest_points);
        }
        else {
          source_points.push({show: false, obj: {}});
        }
        if(point_dest != undefined){
          [source_points, dest_points, pointDest] = upload.generatePoints(point_dest, source_points, dest_points);
        }
        else {
          dest_points.push({show: false, obj: {}});
        }
        if(point_dest != undefined && point_source != undefined){
          lines = upload.createLine(lines, pointSource, pointDest);
        }
      }
    }

    //Filter Logic
    if(filters.fun != undefined){

      try {
        [lines, source_points, dest_points] = filters.fun(lines, source_points, dest_points);
      }
      catch(err){
        filters.log({error: String(err)});
      }
    }

    //Analysis Logic
    if(analysis_model.init.gradient_column != "null"){
      try {
        [lines, source_points, dest_points] = analysis.fun.gradient(lines, source_points, dest_points);
      }
      catch(err){
        console.log(err);
      }
    }

    //SmartLabel Option
    //if(wizard_model.confirmed.smartLabel){
    if(wizard_model.confirmed.smartLabel){
      try {
        label_utils.setPopupVal = true;
        [lines, source_points, dest_points] = label_utils.smartLabel(lines, source_points, dest_points);
      }
      catch(err){
        console.log(err);
      }
    }

    //Generates the Points on the map
    upload.generatePointList(source_points);
    upload.generatePointList(dest_points);
    upload.generatelineList(lines);
  }

  //Allow for filter to call this function
  if(check != "skip"){
    toolbar_controls.gen();
  }

  if(legend.show){
    legend.gen();
  }


},

setPointData: function(values, type, obj, def){
  //console.log(values);
  var lat = "";
  var lng = "";
  var SourceOrDest = type;

  if(type == "Source"){
    lat = parseFloat(values[parseFloat(def.SLat)]);
    lng = parseFloat(values[parseFloat(def.SLng)]);
  }
  else {
    lat = parseFloat(values[parseFloat(def.DLat)]);
    lng = parseFloat(values[parseFloat(def.DLng)]);
  }

  if(values[parseFloat(def.CAT)] == undefined){
    values[parseFloat(def.CAT)] = "Base";
  }

  point_styles_model.fun.catagories.setArray(values[parseFloat(def.CAT)]);

  var idVal = values[parseFloat(def.CAT)] + (SourceOrDest);
  var showVal = true;
  var lineShowVal = true;

  if(point_styles_model[idVal] != undefined){
    showVal = point_styles_model[idVal].show;
    lineShowVal = point_styles_model[idVal].lineShow;
  }

  if(upload.pointsCheck(lat, lng)){


    var label = "";

    if(def.TXT != ""){
      label = values[parseFloat(def.TXT)];
    }
    else{
      label = "";
    }

    var point = {
      name: values[parseFloat(def.CAT)],
      id: values[parseFloat(def.CAT)] + (SourceOrDest),
      lat: lat,
      lng: lng,
      coordVal: [lng, lat],
      coord: ol.proj.fromLonLat([lng, lat]),
      type: "point",
      SourceOrDest: SourceOrDest,
      catagory: values[parseFloat(def.CAT)],
      show: showVal,
      lineShow: lineShowVal,
      check: false,
      obj: obj,
      CATindex: def.CAT,
      label: label,
      labelOffsetY: -25,
      font_size: def.font_size,
      filterAvoid: false,
      smartLabelAvoid: false,
    }

    if(point_styles_model[idVal] == undefined){
      point_styles_model.fun.setStyle(point);
    }

    point.style = JSON.parse(JSON.stringify(point_styles_model[idVal]));

  }

  return point;
},

generatePoints: function(point, source_points, dest_points){
  if(point != undefined){
    if(upload.pointsCheck(point.lat, point.lng)){
      point.check = true;

      if(point.SourceOrDest == "Destination"){
        dest_points.push(point);
      }
      else{
        source_points.push(point);
      }
    }
  }
  return [source_points, dest_points, point];

},

generatePointList: function(points){
  if(points != undefined){
    var i = 0;
    for(i = 0; i < points.length; i++){
      if(point_styles_model[points[i].id] == undefined){
        point_styles_model.fun.setStyle(points[i]);
      }
      if(points[i].show){
        map_utils.createFeature(points[i].coord, point_styles_model[points[i].id], points[i]);
      }
    }
  }

},

pointsCheck: function(lat, lng){
  if(lat != undefined && lat != null && lng != undefined && lng != null && !isNaN(lat) && !isNaN(lat)){
    return true;
  }
  return false;
},

dataCheck: function(values, def){

  var lat1 = parseFloat(values[parseFloat(def.SLat)]);
  var lng1 = parseFloat(values[parseFloat(def.SLng)]);
  var lat2 = parseFloat(values[parseFloat(def.DLat)]);
  var lng2 = parseFloat(values[parseFloat(def.DLng)]);

  if(upload.pointsCheck(lat1, lng1) ||  upload.pointsCheck(lat2, lng2)){
    return true;
  }
  return false;
},

createLine: function(lines, pointSource, pointDest){

  var line = {};

  line = {
    pointSource: pointSource,
    pointDest: pointDest,
    coord: [pointSource.coord, pointDest.coord],
    coordVal: [pointSource.coordVal, pointDest.coordVal]
  }
  lines.push(line);

  return lines;
},

generatelineList: function(lines){
  var i = 0;

  for(i = 0; i < lines.length; i++){
    if(lines[i].pointSource.show && lines[i].pointDest.show && lines[i].pointDest.lineShow){
      map_utils.createLine(lines[i].coord, lines[i]);
    }
  }

},

setObj: function(headers, data){
  var obj = {};
  for(var i = 0; i < headers.length; i++){
    if(obj[headers[i]] == undefined){
      obj[headers[i]] = data[i];
    }
    else{
      //Smart assign another number if not unique
    }
  }
  return obj;
},
}
