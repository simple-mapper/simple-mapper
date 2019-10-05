var ratesDB = new PouchDB('rates');


var rates = {

  load: function(data){

    console.log("Rates Recieved");

    ratesDB.destroy().then(function () {
      // database destroyed
      rates.create(data);
    }).catch(function (err) {
      // error occurred
      console.log(err);

    });

  },

  create: function(data){

    ratesDB = new PouchDB('rates');

    var dataObj = rates.createArrays(data.values, data.values[0]);

    var test = dataObj.length;
    var num = 0;

    for(var i = 0; i < dataObj.length; i++){

      dataObj[i]._id = dataObj[i].key;

      ratesDB.put(dataObj[i]).then(function (response) {

        num++;

        console.log(`Progress Rate ${Math.round((num/test)*100)}%`);

      }).catch(function (err) {

      });
    }

  },

  createArrays: function(data, header){

    var tempObj = {};
    var i = 0;
    var j = 0;

    var returnDict = {};

    var str = "";

    for(i = 1; i < data.length; i++){
      for(j = 0; j < data[i].length; j++){
        tempObj[header[j]] = data[i][j];
      }

      str = tempObj["Lane Zip"].replace("OTME.", "") + "-" + tempObj["Mode"];

      if(returnDict[str] == undefined){
        returnDict[str] = {
          data: [],
        };
      }

      returnDict[str].data.push(tempObj);
      returnDict[str].key = str
      tempObj = {};
    }

    console.log(returnDict);

    var returnArray = [];

    for(var keys in returnDict){
      returnArray.push(returnDict[keys]);
    }

    console.log(returnArray);

    return returnArray;

  },

  getRates: function(obj){

    var ratesInfo = {};
    ratesInfo.obj = obj;

    var str = `${ratesInfo.obj.params.SourceZipCode}-${ratesInfo.obj.params.DestinationZipCode}-${ratesInfo.obj.params.Mode}`

    ratesDB.get(str).then(function(doc) {
      ratesInfo.docs = doc;
      ratesInfo.error = null;
      localStorage.setItem('rateInfo', JSON.stringify(ratesInfo));

    }).catch(function (err) {
      ratesInfo.error = "Not Found";
      localStorage.setItem('rateInfo', JSON.stringify(ratesInfo));
      console.log(err);
    });


  }



}
