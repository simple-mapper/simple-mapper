
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('freight_payment');
var stdb = new PouchDB('StateVals');

var freight_data = {
  load: function(data){

    office365_error.log("Data Recieved");

    db.destroy().then(function () {
      // database destroyed

      res.results = undefined;

      freight_data.create(data);
    }).catch(function (err) {
      // error occurred
    });

  },

  create: function(data){
    db = new PouchDB('freight_payment');

    office365_error.log("DB Recreated");

    var dataObj = freight_data.createArrays(data.values, data.values[0]);

    var test = dataObj.length;
    var num = 0;

    for(var i = 0; i < dataObj.length; i++){

      dataObj[i]._id = dataObj[i].SHIPMENT_ID;

      db.put(dataObj[i]).then(function (response) {

        num++;

        office365_error.log(`Progress ${Math.round((num/test)*100)}%`);

        if(num == test){
          freight_data.createIndex();
          //save min and max dates
        }

      }).catch(function (err) {
        //console.log(err);
        num++;

        if(num == test){
          freight_data.createIndex();
        }

      });
    }

  },

  createIndex: function(){

    office365_error.log(`Creating Lane ID Index`);

    db.createIndex({
      index: {
        fields: ['SOURCE_ZIPCODE', 'DEST_ZIPCODE', 'TRANSPORT_MODE'],
      }
    }).then(function (result) {
      // handle result

      office365_error.log(`Lane ID Index Created`);

      var dateValSet = new Date();
      var dateVal = utils.getDateVal(dateValSet);

      freight_data.addVal("lastUpdate", dateValSet);

      graph_data.setObj();

      office365_error.log(`Last Updated ${dateVal}`);

    }).catch(function (err) {
      console.log(err);
    });

  },

  find: function(obj){

    db.find({
      selector: {
        SOURCE_ZIPCODE: obj.params.SourceZipCode,
        DEST_ZIPCODE: obj.params.DestinationZipCode,
        TRANSPORT_MODE: obj.params.Mode,
      }
    }).then(function (result) {
      // handle result

      res.rate_request_results(obj, result);

    }).catch(function (err) {
      console.log(err);
    });

  },

  findCarrier: function(obj){

    db.find({
      selector: {
        SERVICE_PROVIDER: obj.params.carrier,
      }
    }).then(function (result) {
      // handle result

      res.rate_request_results(obj, result);

    }).catch(function (err) {
      console.log(err);
    });

  },

  createArrays: function(data, header){

    var tempObj = {};
    var i = 0;
    var j = 0;

    var returnArray = [];
    for(i = 1; i < data.length; i++){
      for(j = 0; j < data[i].length; j++){
        tempObj[header[j]] = data[i][j];
      }
      returnArray.push(tempObj);
      tempObj = {};
    }

    return returnArray;

  },

  recommendations: function(obj){

    db.find({
      selector: {
        SOURCE_ZIPCODE: obj.params.SourceZipCode,
        DEST_ZIPCODE: obj.params.DestinationZipCode,
        TRANSPORT_MODE: obj.params.Mode,
      }
    }).then(function (result) {
      // handle result

      res.recommendations(obj, result);

    }).catch(function (err) {
      console.log(err);
    });

  },

  recommendationsAll: function(obj, config){

    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (results) {
      // handle result
      res.recommendationsResults(obj, config, results)
    }).catch(function (err) {
      console.log(err);
    });

  },

  addVal: function(id, value){

    var dataObj = {};

    dataObj._id = id;
    dataObj.value = value;

    stdb.get(dataObj._id).then(function (doc) {
      doc.value = dataObj.value;
      return stdb.put(doc);
    }).then(function () {

    }).catch(function (err) {
      console.log(err);
      stdb.put(dataObj);
    });

  },

  getLastUpdate: function(){

    stdb.get("lastUpdate").then(function (doc) {
      var dateVal = utils.getDateVal(new Date(doc.value));
      office365_error.log(`Last Updated ${dateVal}`);
    }).catch(function (err) {
      console.log(err);
      office365_error.log(`Login then Fetch to get Data`);
    });


  },
}
