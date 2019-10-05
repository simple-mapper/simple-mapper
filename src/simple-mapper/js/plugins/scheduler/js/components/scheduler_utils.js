var scheduler_utils = {

  stop: function(){
    scheduler_error.log("skip");


  },

  run: function(){
    var option = "test";
    scheduler_error.log("skip");

    console.log(upload.data)

    if(upload.data.values == undefined){
      scheduler_error.log({"error": "No data has been uploaded."});
    }
    else{

      if(option == "test"){
        scheduler_utils.run_catagory();
      }
      else {
        scheduler_error.log({"error": "No options was selected."});
      }

    }

  },

  keepRunning: false,

  keepRunningMode: function(){

    if(scheduler_utils.keepRunning){
      document.getElementById("scheduler_keepRunning").innerText = "Non-Continuous";
      scheduler_utils.keepRunning = false;
    }
    else {
      document.getElementById("scheduler_keepRunning").innerText = "Continuous";
      scheduler_utils.keepRunning = true;
    }
  },

  run_index: [],

  index: 0,

  index_change: 1,

  time: 10000, //secs

  check: true,

  run_catagory: function(){

  //  var myWorker = new Worker('simple-mapper/js/plugins/scheduler/js/worker/worker.js');

    var test = "ok";

    scheduler_utils.index = 0;

  //  myWorker.postMessage([point_styles_model.fun.catagories.list, upload.data]);
    //myWorker.onmessage = function(e) {

      scheduler_utils.setRunArry();

      console.log(scheduler_utils.run_index);

      scheduler_utils.hideAllEx(scheduler_utils.run_index[scheduler_utils.index]);

      // setTimeout(() => {
      //   scheduler_utils.showAll(keys);
      // }, timeVal*num);

    //  myWorker.terminate();

  //  }

  },

  setRunArry: function(){

    var obj = {};
    var currentKey = "";
    var nextKey = "";

    scheduler_utils.run_index = [];

    var num = 0;

    for(var keys in point_styles_model.fun.catagories.list){

      nextKey = keys;

      obj = {
        currentKey: currentKey,
        nextKey: nextKey,
        num: num - 1,
        check: true,
      };

      scheduler_utils.run_index.push(obj);

      currentKey = keys;

      num++;

      obj = {};

    }

    obj = {
      currentKey: currentKey,
      nextKey: "$END",
      num: num - 1,
      check: true,
    };

    scheduler_utils.run_index.push(obj);
    scheduler_utils.run_index.shift();
  },

  hideAllEx: function(obj){

    var keyVal = obj.currentKey;

    var type = "show";

    for(var keys in point_styles_model){
      if(keys != 'fun'){
        if(point_styles_model[keys].catagory != keyVal){
          point_styles_model[keys][type] = false;
        }
        else {
          point_styles_model[keys][type] = true;
        }
      }
    }

    // map.view.animate({
    //   center: ol.proj.fromLonLat([-80.0734, 34.3740]),
    //   duration: 2000,
    //   zoom: 10
    // });

    scheduler_utils.next(obj);



  },

  next: function(obj){

    upload.confirmUploadData("skip");

    // if(obj.nextKey != "$END"){
    //   scheduler_utils.setRun(obj);
    // }
    // else if(scheduler_utils.keepRunning){
    //   scheduler_utils.run_catagory();
    // }
    // else {
    //   scheduler_utils.reset();
    // }

    scheduler_utils.setRun(obj);

  },

  timeOut: {},

  setRun: function(obj){

    scheduler_utils.timeOut = setTimeout((obj) => {

      obj = scheduler_utils.run_index[scheduler_utils.index];
      if(obj.nextKey == "$END" && scheduler_utils.keepRunning){
        scheduler_utils.run_catagory();
      }
      else if(obj.nextKey == "$END"){
        scheduler_utils.fast_reset();
      }
      else if(scheduler_utils.check && scheduler_utils.index_change != -1){
        scheduler_utils.index = scheduler_utils.index + scheduler_utils.index_change;
        obj = scheduler_utils.run_index[scheduler_utils.index];
        scheduler_utils.set_index_change();
        scheduler_utils.hideAllEx(obj);
      }
      else {
        scheduler_utils.reset();
      }

    },
    scheduler_utils.time,
    scheduler_utils.run_index[scheduler_utils.index]);

  },

  reset: function(){
    scheduler_utils.timeOut = setTimeout(() => {
      scheduler_utils.fast_reset();
    }, scheduler_utils.time);
  },

  fast_reset: function(){

    clearTimeout(scheduler_utils.timeOut);
    scheduler_utils.check = true;
    scheduler_utils.index = 0;
    scheduler_utils.showAll();
  },

  showAll: function(){

    var type = "show";

    for(var keys in point_styles_model){
      if(keys != 'fun'){
        point_styles_model[keys][type] = true;
      }
    }

    upload.confirmUploadData("skip");

  },

  set_index_change: function() {
    scheduler_utils.index_change = 1;
  },

  nextInput: function(){
    clearTimeout(scheduler_utils.timeOut);

    if((scheduler_utils.index) >= scheduler_utils.run_index.length-1){

      if(scheduler_utils.keepRunning){
        scheduler_utils.index = 0;

        var obj =  scheduler_utils.run_index[scheduler_utils.index];

        scheduler_utils.hideAllEx(obj);

      }
      else {
        scheduler_utils.fast_reset();
      }
    }
    else {

      scheduler_utils.run_index[scheduler_utils.index].check = false;

      scheduler_utils.index++;

      var obj =  scheduler_utils.run_index[scheduler_utils.index];

      scheduler_utils.hideAllEx(obj);
    }
  },

  previousInput: function(){

    clearTimeout(scheduler_utils.timeOut);

    console.log(scheduler_utils.index);
    if((scheduler_utils.index - 1) < 0){
      console.log(scheduler_utils.index);
      if(scheduler_utils.keepRunning){
        scheduler_utils.index = scheduler_utils.run_index.length - 1;

        var obj =  scheduler_utils.run_index[scheduler_utils.index];
        console.log(scheduler_utils.index);
        scheduler_utils.hideAllEx(obj);

      }
      else {
        scheduler_utils.fast_reset();
      }
    }
    else {
      scheduler_utils.run_index[scheduler_utils.index].check = false;

      scheduler_utils.index--;

      var obj =  scheduler_utils.run_index[scheduler_utils.index];

      scheduler_utils.hideAllEx(obj);

    }
  }
}
