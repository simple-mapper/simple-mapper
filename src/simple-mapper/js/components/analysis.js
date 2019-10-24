var analysis = {
  gen: function(){
    render.analysis();
  },

  init: function(text){
    analysis.render(text);
  },

  render: function(text){

    document.getElementById("analysis").innerHTML = text;
    var template = document.getElementById("analysis_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    upload_utils.wizardData();

    upload.data.header = analysis_utils.checkHeaders(upload.data.shortValues, upload.data.header);

    var html = compiledTemplate(upload.data);
    document.getElementById("analysis").innerHTML = html;

    analysis.post_render();

  },

  post_render: function(){
    analysis.setFunction();
  },

  setFunction: function(){
    document.getElementById("analysis__exit").addEventListener("click",   analysis.analysisExit);

    document.getElementById("analysis__updateMap").addEventListener("click", () => {
      analysis.analysisExit();
      upload.confirmUploadData('non-skip');
    });

    var classname = document.getElementsByClassName("analysis__apply");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', analysis.setModel);
    }

  },

  setModel: function(){

    var id = this.id.split("__");
    var idVal = id[0];
    var column = idVal.split("_");

    if(column[1] == "column" && document.getElementById(idVal).value != "null"){
      analysis_model.init[idVal] = parseFloat(document.getElementById(idVal).value);
    }
    else{
      analysis_model.init[idVal] = document.getElementById(idVal).value;
    }

    analysis.gen();

  },

  analysisExit: function(){

    document.getElementById("analysis").innerHTML = "";

  },

  fun: {
    gradient: function(lines, source_points, dest_points){

      var column = analysis_model.init.gradient_column;
      var indexName =   upload.data.header[column].name;

      source_points.sort((a, b) => (parseFloat(a.obj[indexName]) > parseFloat(b.obj[indexName])) ? 1 : -1);
      dest_points.sort((a, b) => (parseFloat(a.obj[indexName]) > parseFloat(b.obj[indexName])) ? 1 : -1);

      source_points = analysis.quartiles(source_points);
      dest_points = analysis.quartiles(dest_points);

      source_points.sort((a, b) => (parseFloat(a.obj[indexName]) < parseFloat(b.obj[indexName])) ? 1 : -1);
      dest_points.sort((a, b) => (parseFloat(a.obj[indexName]) < parseFloat(b.obj[indexName])) ? 1 : -1);

      return [lines, source_points, dest_points];
    }
  },

  quartiles: function(points){

    var num = 0;

    for(var k = 0; k < points.length; k++){
      if(points[k].show && !points[k].filterAvoid){
        num++;
      }
    }

    var quartiles = Math.round(num/4);

    var qrts = [quartiles, quartiles*2, quartiles*3];


    num = 0;
    for(var i = 0; i < points.length; i++){
      if(points[i].show && !points[i].filterAvoid){
        if(num < qrts[0]){
          points[i].style.color = analysis_model.init.gradient_x_small_color;
          points[i].style.size = analysis_model.init.gradient_x_small_size;
        }

        if(num >= qrts[0] && num < qrts[1]){
          points[i].style.color = analysis_model.init.gradient_small_color;
          points[i].style.size = analysis_model.init.gradient_small_size;
        }

        if(num >= qrts[1] && num < qrts[2]){
          points[i].style.color = analysis_model.init.gradient_medium_color;
          points[i].style.size = analysis_model.init.gradient_medium_size;
        }

        if(num >= qrts[2]){
          points[i].style.color = analysis_model.init.gradient_large_color;
          points[i].style.size = analysis_model.init.gradient_large_size;
        }
        num++;
      }

    }

    return points;

  }
}

window.analysis = analysis;
