var office365_error = {

  log: function(err){
    if(err != "skip" && typeof err == "string"){
      document.getElementById("office365_error").innerHTML = err;
    }
    else if(err != "skip"){
      document.getElementById("office365_error").innerHTML = JSON.stringify(err);
    }
    else {
      document.getElementById("office365_error").innerHTML = "";
    }
  }
}
