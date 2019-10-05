var worker = {
  test: function(){
    //console.log("test");
  }
}

onmessage = function(e) {
  var workerResult = 'Result: ' + JSON.stringify(e.data[0]);
  worker.test();
  postMessage(workerResult);
}
