var point_styles_model = {
  fun: {
    toArray: function(){
      var returnArray = [];
      var returnObj = {};

      var catagory = point_styles_model.fun.catagories.getCatagory();

      toolbar_controls.catagory = catagory;

      for(var keys in point_styles_model){
        if(keys != 'fun'){
          if(point_styles_model[keys].catagory == catagory){
            if(point_styles_model[keys].CATindex == wizard_model.confirmed.CAT){
              returnArray.push(point_styles_model[keys]);
            }
          }
        }
      }

      returnObj = {
        catagories: point_styles_model.fun.catagories.arrayVal,
        catagoriesCheck: point_styles_model.fun.catagories.check,
        point_styles_model: returnArray
      }

      return returnObj;
    },
    toArrayAll: function(){
      var returnArray = [];
      var returnObj = {};

      for(var keys in point_styles_model){
        if(keys != 'fun'){
          returnArray.push(point_styles_model[keys]);
        }
      }

      returnObj = {
        catagories: point_styles_model.fun.catagories.arrayVal,
        catagoriesList: point_styles_model.fun.catagories.list,
        catagoriesCheck: point_styles_model.fun.catagories.check,
        point_styles_model: returnArray
      }

      return returnObj;
    },

    toArraySetAll: function(obj){
      var returnArray = [];
      var returnObj = {};

      for(var keys in obj.point_styles_model){
        point_styles_model[obj.point_styles_model[keys].id] = obj.point_styles_model[keys];
      }

      point_styles_model.fun.catagories.arrayVal = obj.catagories;
      point_styles_model.fun.catagories.list = obj.catagoriesList;
      point_styles_model.fun.catagories.check = obj.catagoriesCheck;

    },

    toArrayLegend: function(){
      var returnArray = [];
      var returnObj = {};
      var showAny = false;

      for(var keys in point_styles_model){
        if(keys != 'fun'){
          if(point_styles_model[keys].CATindex == wizard_model.confirmed.CAT){
            returnArray.push(point_styles_model[keys]);
          }
          if(point_styles_model[keys].show == true && point_styles_model[keys].CATindex == wizard_model.confirmed.CAT){
            showAny = true;
          }
        }
      }

      returnObj = {
        catagories: point_styles_model.fun.catagories.arrayVal,
        catagoriesCheck: point_styles_model.fun.catagories.check,
        point_styles_model: returnArray,
        show: showAny,
      }

      return returnObj;
    },
    setStyle: function(point){
      point_styles_model[point.id] = {
        name: point.name,
        id: point.id,
        catagory: point.catagory,
        size: 5,
        outline_width: 1,
        color: point_styles_model.fun.color_select(),
        SourceOrDest: point.SourceOrDest,
        shape: "circle",
        show: true,
        lineShow: true,
        CATindex: point.CATindex
      }
    },
    color_select: function(){
      var colorReturn = point_styles_model.fun.colors[point_styles_model.fun.num];
      point_styles_model.fun.num++;
      if(point_styles_model.fun.num > point_styles_model.fun.colors.length){
        point_styles_model.fun.num = 0;
      }
      return colorReturn;
    },
    num: 0,
    catagories: {
      arrayVal: [],
      check: false,
      list: {},
      setArray: function(id){
        if(id != undefined || id != null || id != ""){
          if(point_styles_model.fun.catagories.list[id] == undefined){
            point_styles_model.fun.catagories.list[id] = {name: id, id: id, selected: false, show: true};
            point_styles_model.fun.catagories.arrayVal.push(point_styles_model.fun.catagories.list[id]);
            point_styles_model.fun.catagories.check = true;
          }
        }
      },
      getCatagory: function(){

        for(var i = 0; i < point_styles_model.fun.catagories.arrayVal.length; i++){
          if(point_styles_model.fun.catagories.arrayVal[i].selected){
            return point_styles_model.fun.catagories.arrayVal[i].id;
          }
        }

        if(point_styles_model.fun.catagories.arrayVal[0] != undefined){
          return point_styles_model.fun.catagories.arrayVal[0].id;
        }
      },
      setCatagory: function(catagory){

        var id = "";

        for(var i = 0; i < point_styles_model.fun.catagories.arrayVal.length; i++){

          id = point_styles_model.fun.catagories.arrayVal[i].id;

          if(point_styles_model.fun.catagories.arrayVal[i].id == catagory){
            point_styles_model.fun.catagories.arrayVal[i].selected = true;
            point_styles_model.fun.catagories.list[id].selected = true;
          }
          else{
            point_styles_model.fun.catagories.arrayVal[i].selected = false;
            point_styles_model.fun.catagories.list[id].selected = false;
          }

        }
      }
    },
    clear: function(){
      for(var keys in point_styles_model){
        if(keys != "fun"){
          delete point_styles_model[keys];
        }
      }
      point_styles_model.fun.num = 0;
      point_styles_model.fun.catagories.list = {};
      point_styles_model.fun.catagories.arrayVal = [];
    },
    setAll: function(){
      var id = this.id.split("__");
      var idVal = toolbar_controls.joinID(id);

      var name = id[0];
      var type = id[1];
      var style_config = id[2];

      var selectedVal = document.getElementById(idVal).value;

      if(selectedVal == 'true'){
        selectedVal = true;
      }
      if(selectedVal == 'false'){
        selectedVal = false;
      }

      for(var keys in point_styles_model){
        if(keys != 'fun'){
          point_styles_model[keys][type] = selectedVal;
        }
      }

      upload.confirmUploadData();
    }
  }
}

point_styles_model.fun.colors = ["#ff0000", "#0000ff", "#3cb371", "#ee82ee", "#ffa500", "#6a5acd"];
