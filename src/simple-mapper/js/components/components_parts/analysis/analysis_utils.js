var analysis_utils = {
  checkHeaders: function(shortValues, header){

    for(var i = 0; i < shortValues[0].val.length; i++){

      if(isNaN(shortValues[0].val[i])){
        header[i].number = false;
      }
      else {
        header[i].number = true;
      }
    }

    return header;
  }

}

window.analysis_utils = analysis_utils;
