var upload_utils = {
  defaultDef: {
    sourceLat: 1,
    sourceLng: 0,
    destLat: 3,
    destLng: 2,
  },

  wizardData: function(){
    upload.data.shortValues = [];

    var num = 3;

    if(num > upload.data.values.length){
      num = upload.data.values.length;
    }

    if(num > 0){
      upload.data.header = [];
      for(var j = 0; j < upload.data.values[0].length; j++){
        upload.data.header.push({name: upload.data.values[0][j]});
      }
    }

    for(var i = 1; i < num; i++){
      upload.data.shortValues.push({val: upload.data.values[i]});
    }

    Object.assign(upload.data, wizard_model.confirmed);
    Object.assign(upload.data, analysis_model.init);

  }
}
