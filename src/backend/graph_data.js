var PouchDB = require('pouchdb');
var stdb = new PouchDB('StateVals');

var graph_data = {

  daily: function(data){

    var returnData = graph_data.setData(data);

    var exreturnData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }],
    }

  },

  setData: function(data){

    // console.log(data);

    var dataObj = {};

    stdb.get('graph_obj').then((doc) =>{

      dataObj = graph_data.calObj(data, doc.value, "START_TIME", "LH_COST");
      dataObj = graph_data.setGraphObj(dataObj, "LH_COST");

      rate_request_charts.setChart(dataObj);

    }).catch((err) => {
      console.log(err);
    });

  },

  setGraphObj: function(obj, calIndex){

    obj.labels = [];
    obj.datasets = [];

    var tempObj = {
      label: 'Shipment Count',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      yAxisID: 'A',
    };

    var tempObj2 = {
      label: 'Avg ' + calIndex,
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      type: 'line',
      yAxisID: 'B',
    };

    var keys;

    //Set Labels
    for(keys in obj){
      if(obj[keys].count != undefined){
        obj.labels.push(keys);
      }
    }

    for(keys in obj){
      if(obj[keys].count != undefined){
        tempObj.data.push(obj[keys].count);
        tempObj.backgroundColor.push('rgba(30,144,255, 0.2)');
        tempObj.borderColor.push('rgba(30,144,255, 1)');


        tempObj2.data.push(obj[keys][calIndex + "_avg"]);
        tempObj2.backgroundColor.push('rgba(255, 69, 0, 0.2)');
        tempObj2.borderColor.push('rgba(255, 69, 0, 1)');
      }
    }

    obj.datasets.push(tempObj);
    obj.datasets.push(tempObj2);

    return obj;
  },

  calObj: function(data, obj, index, calIndex){

    var i = 0;
    var dateVal = "";
    var keys;

    var str = calIndex + "_avg";

    for(keys in obj){
      obj[keys].count = 0;
      obj[keys][str] = 0;
      obj[keys][calIndex] = 0;
    }

    for(i = 0; i < data.length; i++){
      dateVal = data[i][index].split(" ");
      dateVal = utils.getDateVal(utils.parseDate(dateVal[0]));
      obj[dateVal].count++;
      obj[dateVal][calIndex] = obj[dateVal][calIndex] + data[i][calIndex];

    }

    for(keys in obj){
      if(obj[keys].count > 0){
        obj[keys][str] = obj[keys][calIndex]/obj[keys].count
      }
      else {
        obj[keys][str] = null;
      }

    }

    return obj;
  },

  setObj: function(){

    var minVal = 0;
    var maxVal = 0;

    var objVal = {};

    stdb.get('minVal').then((doc) =>{
      minVal = doc.value.substr(0, 10);
      stdb.get('maxVal').then((doc) =>{
        maxVal = doc.value.substr(0, 10);
        objVal = graph_data.setObjData(minVal, maxVal);
        freight_data.addVal('graph_obj', objVal);

      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });

  },

  setObjData: function(minVal, maxVal){

    var minValdate = new Date(minVal);
    var maxValdate = new Date(maxVal);

    var returnObj = {};

    var dateVal = minValdate;
    var dateValObj = "";
    var num = 0;

    while(dateVal <= maxValdate && num < 100000){

      dateValObj = utils.getDateVal(dateVal);

      returnObj[dateValObj] = {count: 0};

      dateVal.setDate(dateVal.getDate() + 1);

      num++;
    }

    dateValObj = utils.getDateVal(dateVal);

    returnObj[dateValObj] = {count: 0};

    return returnObj;

  },

  obj: {},

  getMin: function(data, index, start){

    var i = 0;
    var minVal = new Date(utils.parseDate("3000-01-01"));
    var dateVal = "";

    for(i = start; i < data.length; i++){
      dateVal = data[i][index].split(" ");
      minVal = graph_data.minVal(minVal, new Date(utils.parseDate(dateVal[0])));
    }

    return minVal;

  },

  getMax: function(data, index, start){

    var i = 0;
    var maxVal = new Date(utils.parseDate("1999-01-01"));
    var dateVal = "";

    for(i = start; i < data.length; i++){
      dateVal = data[i][index].split(" ");
      maxVal = graph_data.maxVal(maxVal, new Date(utils.parseDate(dateVal[0])));
    }

    return maxVal;

  },

  maxVal: function(current, newVal){
    var returnVal = 0;
    //console.log(newVal);

    if(current == undefined || current < newVal){
      returnVal = newVal;
    }
    else{
      returnVal = current;
    }

    return returnVal;
  },

  minVal: function(current, newVal){
    var returnVal = 0;

    if(current == undefined || current > newVal){
      returnVal = newVal;
    }
    else{
      returnVal = current;
    }

    return returnVal;
  },

}
