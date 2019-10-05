var utils = {
  aggregate: function(data){

    var obj = {};

    [obj.total, obj.count, obj.avg, obj.carriers, obj.distance, obj.distance_avg, obj.cost_per_mile, obj.est_fuel, obj.overall] = utils.avg(data.docs, 'LH_COST', 'SERVICE_PROVIDER', 'DISTANCE', 'TOTAL_ACTUAL_COST');

    return obj;
  },

  docs: function(rows){

    var docs = [];

    for(var i = 0; i < rows.length; i++){
      docs.push(rows[i].doc);
    }

    return docs;

  },


  zipObj: function(obj, docs, config){

    // var config = {
    //   OrigLat: "SOURCE_LATITUDE",
    //   OrigLng: "SOURCE_LONGITUDE",
    //   OrigZip: "SOURCE_ZIPCODE",
    //   DestLat: "DEST_LATITUDE",
    //   DestLng: "DEST_LONGITUDE",
    //   DestZip: "DEST_ZIPCODE"
    // }

    var configObj = {
      Orig: {},
      Dest: {},
      docs: [],
      aggregate: {},
    }

    // [obj.total, obj.count, obj.avg, obj.carriers] = utils.avg(data.docs, 'LH_COST', 'SERVICE_PROVIDER');

    var resultObj = {};
    var tempObj = {};
    var lane = "";

    for(var i = 0; i < docs.length; i++){
      lane = `${docs[i][config.OrigZip]}-${docs[i][config.DestZip]}-${docs[i][config.Mode]}`;

      if(obj.params.Mode == docs[i][config.Mode]){
        if(resultObj[lane] == undefined){
          resultObj[lane] = JSON.parse(JSON.stringify(configObj));
          resultObj[lane].obj = obj;
          resultObj[lane].Orig = geo.getZip(docs[i][config.OrigZip]);
          resultObj[lane].OrigRef = docs[i][config.OrigZip];
          resultObj[lane].Dest = geo.getZip(docs[i][config.DestZip]);
          resultObj[lane].DestRef = docs[i][config.DestZip];
          resultObj[lane].Distance = geo.getDistance(docs[i][config.OrigZip], docs[i][config.DestZip]);
        }

        resultObj[lane].docs.push(docs[i]);
      }
    }

    var aggregate = {
      total: 0,
      count: 0,
      avg: 0,
      carriers: {}
    }

    for(var keys in resultObj){

      [aggregate.total, aggregate.count, aggregate.avg, aggregate.carriers, aggregate.distance, aggregate.distance_avg, aggregate.cost_per_mile, aggregate.est_fuel, aggregate.overall] = utils.avg(resultObj[keys].docs, 'LH_COST', 'SERVICE_PROVIDER', 'DISTANCE', 'TOTAL_ACTUAL_COST');
      //
      // if(aggregate.count > 0){
      //   aggregate.cost_per_mile = Math.round((aggregate.avg/aggregate.distance_avg)*100)/100;
      // }

      resultObj[keys].aggregate = JSON.parse(JSON.stringify(aggregate));

    }

    return resultObj;

  },

  range: function(data, fromDate, toDate, indexStart, indexEnd){

    if(fromDate == ""){
      fromDate = "1999-01-01"
    }

    if(toDate == ""){
      toDate = "3000-01-01"
    }

    fromDate = new Date(utils.parseDate(fromDate));
    toDate = new Date(utils.parseDate(toDate));

    var check1 = false;
    var check2 = false;
    var check = false;

    var varFromDate = "";
    var varToDate = "";

    var returnData = data.filter(function (row) {

      check1 = false;
      check2 = false;
      check = false;

      varFromDate = new Date(row[indexStart]);
      varToDate = new Date(row[indexEnd]);

      if(varFromDate >= fromDate){
        check1 = true;
      }

      if(varToDate <= toDate){
        check2 = true;
      }

      if(check1 && check2){
        check = true;
      }

      return check;
    });

    return returnData;

  },

  avg: function(docs, index, calIndex, disIndex, overallIndex){

    var total = 0;
    var overall_total = 0;
    var distance = 0;
    var count = 0;
    var countDis = 0;

    for(var i = 0; i < docs.length; i++){
      count++;

      overall_total = overall_total + parseFloat(docs[i][overallIndex]);
      total = total + parseFloat(docs[i][index]);
      distance = distance + parseFloat(docs[i][disIndex]);

      if(parseFloat(docs[i][disIndex]) > 0){
        countDis++;
      }

    }

    var avg = Math.round((total/count)*100)/100;
    var overall = Math.round((overall_total/count)*100)/100;
    var diff = overall - avg;
    var est_fuel =Math.round((diff)*100)/100;
    total = Math.round((total)*100)/100;
    var distance_avg = Math.round((distance/countDis)*100)/100;
    var cost_per_mile = Math.round((total/(distance_avg*count))*100)/100;

    var obj = {};
    var calArray = [];

    if(calIndex != "skip"){

      for(var i = 0; i < docs.length; i++){
        obj[docs[i][calIndex]] = {};
        obj[docs[i][calIndex]].docs = [];
      }

      for(var i = 0; i < docs.length; i++){
        obj[docs[i][calIndex]].docs.push(docs[i]);
      }

      for(var keys in obj){

        [obj[keys].total, obj[keys].count, obj[keys].avg, obj[keys].calArray, obj[keys].distance, obj[keys].distance_avg, obj[keys].cost_per_mile, obj[keys].est_fuel, obj[keys].overall] = utils.avg(obj[keys].docs, index, 'skip', disIndex, overallIndex);

      }

      var calArray = [];

      for(var keys2 in obj){
        obj[keys2].key = keys2.replace("OTME.", "");;
        calArray.push(obj[keys2]);
      }

      calArray.sort( utils.sortcount );

    }

    return [total, count, avg, calArray, distance, distance_avg, cost_per_mile, est_fuel, overall];
  },



  parseDate: function(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  },

  getDateVal: function(input){

    var year = input.getFullYear();
    var month = input.getMonth()+1;
    var day = input.getDate();

    if(month < 10){
      month = `0${month}`
    }

    if(day < 10){
      day = `0${day}`
    }

    var str = `${year}-${month}-${day}`
    return str;
  },

  createArrayVal: function(data){

    var header = [];

    var returnData = [];
    var tempData = [];

    var i = 0;
    var j = 0;
    var keys;

    for(keys in data[0]){
      header.push(keys);
    }

    returnData.push(header);

    for(i = 0; i < data.length; i++){
      for(keys in data[i]){
        tempData.push(data[i][keys]);
      }
      returnData.push(tempData);
      tempData = [];
    }

    return returnData;
  },

  sortcount: function( a, b ) {

    index = "count";

    if ( a[index] < b[index] ){
      return 1;
    }
    if ( a[index] > b[index] ){
      return -1;
    }
    return 0;
  },

  addObj: function(data, dest, origin){

    for(var i = 0; i < data.length; i++){
      if(i > 0){
        data[i].push(dest);
        data[i].push(origin);
      }
      else {
        data[i].push("Dest__");
        data[i].push("Origin__");
      }
    }

    return data;
  }

}
