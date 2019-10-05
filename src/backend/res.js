var res = {

  rate_request_results: function(obj, result){

    result.docs = utils.range(result.docs, obj.params.fromDate, obj.params.toDate, "START_TIME", "END_TIME")

    rate_request_results.data = result;

    rate_request_results.data_aggregate = utils.aggregate(result);

    rate_request_results.data_aggregate.Origin = geo.getZip(obj.params.SourceZipCode);
    rate_request_results.data_aggregate.Dest = geo.getZip(obj.params.DestinationZipCode);
    rate_request_results.data_aggregate.Distance = geo.getDistance(obj.params.SourceZipCode, obj.params.DestinationZipCode);

    // if(rate_request_results.data_aggregate.count > 0){
    //   rate_request_results.data_aggregate.cost_per_mile = Math.round((rate_request_results.data_aggregate.avg/rate_request_results.data_aggregate.Distance)*100)/100;
    // }

    obj.aggregate = rate_request_results.data_aggregate;

    //For Rate Viewer
    rates.getRates(obj);

    //For display button
    recommendations.selected = [0];

    //For mapping
    var dest = `${obj.aggregate.Dest.city}, ${obj.aggregate.Dest.state} ${obj.aggregate.Dest.zip}`;
    var origin = `${obj.aggregate.Origin.city}, ${obj.aggregate.Origin.state} ${obj.aggregate.Origin.zip}`;

    rate_request_results.upload = utils.addObj(utils.createArrayVal(result.docs), dest, origin);

    if(result.docs[0] != undefined){
      rate_request_results.data_aggregate.sourceCity = `${result.docs[0]["SOURCE_CITY"]}, ${result.docs[0]["SOURCE_STATE"]}`;
      rate_request_results.data_aggregate.destCity = `${result.docs[0]["DEST_CITY"]}, ${result.docs[0]["DEST_STATE"]}`;
    }
    else {
      rate_request_results.data_aggregate.sourceCity = "N/A";
      rate_request_results.data_aggregate.destCity = "N/A";
    }

    //Need to reset the zipIndex
    geo.zipIndex = {
      start: 0,
      end: 20,
      page: 0,
    }

    rate_request_results.res();
  },

  results: undefined,

  recommendations: function(obj){

    var config = {
      OrigLat: "SOURCE_LATITUDE",
      OrigLng: "SOURCE_LONGITUDE",
      OrigZip: "SOURCE_ZIPCODE",
      DestLat: "DEST_LATITUDE",
      DestLng: "DEST_LONGITUDE",
      DestZip: "DEST_ZIPCODE",
      Mode: "TRANSPORT_MODE",
    }

    var recs = geo.set(obj, config)

    obj.recs = recs;

    if(res.results == undefined){
      freight_data.recommendationsAll(obj, config);
    }
    else{
      res.recommendationsResults(obj, config, res.results)
    }
  },

  recommendationsResults: function(obj, config, results){

    res.results = results;

    var docsArray = utils.docs(results.rows);

    var docs = utils.range(docsArray, obj.params.fromDate, obj.params.toDate, "START_TIME", "END_TIME");

    var zipObj = utils.zipObj(obj, docs, config);

    var zipObj = geo.recommendation_gen(obj.recs, zipObj, config);

    var index = 0;
    for(var i = 0; i < recommendations.selected.length; i++){
      index = recommendations.selected[i];
      zipObj[index].tempLane.check = true;
    }

    recommendations.data.params = zipObj.slice(geo.zipIndex.start, geo.zipIndex.end);

    geo.zipData = zipObj;

    recommendations.data.params.zipIndex = geo.zipIndex;

    recommendations.gen(zipObj);
  },

  addUpload: function(obj, data){

    console.log(geo.zipData[obj.params.index - 1].tempLane);

    var dest = `${geo.zipData[obj.params.index - 1].tempLane.Dest.city}, ${geo.zipData[obj.params.index - 1].tempLane.Dest.state} ${geo.zipData[obj.params.index - 1].tempLane.Dest.zip}`;
    var origin = `${geo.zipData[obj.params.index - 1].tempLane.Orig.city}, ${geo.zipData[obj.params.index - 1].tempLane.Orig.state} ${geo.zipData[obj.params.index - 1].tempLane.Orig.zip}`;

    var tempArray = utils.addObj(utils.createArrayVal(geo.zipData[obj.params.index - 1].tempLane.docs), dest, origin);

    for(var i = 1; i < tempArray.length; i++){
      data.push(tempArray[i]);
    }

    recommendations.upload(data);

  },


  removeUpload: function(obj, data){

    var returnData = [];

    var dest = `${geo.zipData[obj.params.index - 1].tempLane.Dest.city}, ${geo.zipData[obj.params.index - 1].tempLane.Dest.state} ${geo.zipData[obj.params.index - 1].tempLane.Dest.zip}`;
    var origin = `${geo.zipData[obj.params.index - 1].tempLane.Orig.city}, ${geo.zipData[obj.params.index - 1].tempLane.Orig.state} ${geo.zipData[obj.params.index - 1].tempLane.Orig.zip}`;

    var tempArray = utils.addObj(utils.createArrayVal(geo.zipData[obj.params.index - 1].tempLane.docs), dest, origin);

    for(var i = 1; i < tempArray.length; i++){
      tempArray[i] = JSON.stringify(tempArray[i]);
    }

    data = data.filter( function( el ) {
      return tempArray.indexOf( JSON.stringify(el) ) < 0;
    } );

    recommendations.upload(data);

  },

}
