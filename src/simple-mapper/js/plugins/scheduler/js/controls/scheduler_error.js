var scheduler_error = {

  log: function(err){
    if(err != "skip"){
      document.getElementById("scheduler_error").innerHTML = JSON.stringify(err);
    }
    else {
      document.getElementById("scheduler_error").innerHTML = "";
    }
  }
}
