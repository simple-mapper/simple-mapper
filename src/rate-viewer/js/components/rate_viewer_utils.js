var rate_viewer_utils = {
  expectedCost: function(obj){

    console.log(obj);

    if(obj.error == null){
      var distance = obj.obj.aggregate.distance_avg;

      for(var i = 0; i < obj.docs.data.length; i++){
        obj.docs.data[i].expectedCostVal = rate_viewer_utils.calExpectedCost(obj.docs.data[i], distance);
        obj.docs.data[i].weightedCostVal = rate_viewer_utils.calWeightedCost(obj.docs.data[i], distance);
      }

      obj.docs.data.sort(rate_viewer_utils.sortObj);

      for(var i = 0; i < obj.docs.data.length; i++){
        obj.docs.data[i].index = i + 1;
      }
    }

    return obj;
  },

  sortObj: function(a, b){
    if ( a.weightedCostVal < b.weightedCostVal ){
      return -1;
    }
    if ( a.weightedCostVal > b.weightedCostVal ){
      return 1;
    }
    return 0;
  },

  calWeightedCost: function(obj, distance){

    var val = rate_viewer_utils.calExpectedCost(obj, distance)

    var weight = 0;

    if(obj["Rate Quality"] == "OTME.S1000"){
      weight = 10000;
    }
    else if(obj["Rate Quality"] == "OTME.S9000"){
      weight = 20000;
    }

    val = val + weight;

    return val;

  },

  calExpectedCost: function(obj, distance){

    var val = 0;

    if(obj["Charge Multiplier"] == "SHIPMENT.DISTANCE"){
      val = parseFloat(obj["Charge Amount"])*distance;
      val = Math.round(val*100)/100;
    }
    else if(obj["Charge Multiplier"] == "SHIPMENT"){
      val = parseFloat(obj["Charge Amount"]);
      val = Math.round(val*100)/100;
    }

    if(val < parseFloat(obj["Min Cost"])){
      val = Math.round(parseFloat(obj["Min Cost"])*100)/100
    }

    return val;
  },
}
