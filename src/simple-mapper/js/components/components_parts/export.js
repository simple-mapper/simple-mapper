var export_ = {

  data: {},

  gen: function(){
    document.getElementById('exportSubmit').addEventListener("click", export_.createJson);
  },

  createJson: function(){
    event.preventDefault();

    //For the filter string
    var filterStr = localStorage.getItem('filter');
    if(filterStr == undefined || filterStr == null){
      filterStr = "";
    }

    var exportData = {
      id: "simple-mapper",
      data: upload.data,
      wizard: wizard_model.confirmed,
      filter: filterStr,
      styles: point_styles_model.fun.toArrayAll(),
      analysis: analysis_model.init,
    };

    let dataStr = JSON.stringify(exportData);

    var dataStrEncode = encodeURIComponent(dataStr);

    let exportFileDefaultName = 'simple-mapper.json';

    var blob = new Blob([dataStr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, exportFileDefaultName);


  },

  id: "n/a",

  data: {},

  read: function(obj){

    var dataJson = {};
    dataJson = JSON.parse(obj);

    if(dataJson.id == "simple-mapper"){
      export_.id = "simple-mapper";

      upload.data = dataJson.data;
      wizard_model.confirmed = dataJson.wizard;
      analysis_model.init = dataJson.analysis;

      localStorage.setItem('filter', dataJson.filter);
      filters.fun = new Function("lines", "source_points", "dest_points", `${dataJson.filter} \n  return [lines, source_points, dest_points];`);

      export_.data = dataJson;
    }

  },

  test_read: function(){

    fetch("./simple-mapper.json").then( (response) => {

      // point_styles_model = dataJson.styles;
      return response.text();
    }).then(function(obj){

      var dataJson = {};
      dataJson = JSON.parse(obj);

      if(dataJson.id == "simple-mapper"){
        export_.id = "simple-mapper";

        upload.data = dataJson.data;
        wizard_model.confirmed = dataJson.wizard;
        analysis_model.init = dataJson.analysis;

        localStorage.setItem('filter', dataJson.filter);
        filters.fun = new Function("lines", "source_points", "dest_points", `${dataJson.filter} \n  return [lines, source_points, dest_points];`);

        export_.data = dataJson;
        upload.confirmUploadData('skip');
      }

    }).catch(function(err){
      console.log(err);
    })

  },

}

window.export_ = export_;
