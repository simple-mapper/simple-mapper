var simple_api = {

  simple_zipcodes: function(id_token, zipcodes, column){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `https://us-central1-sylvan-server-253716.cloudfunctions.net/zipcode-api`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
      console.log(xhr.responseText);
      wizard.returnZips(JSON.parse(xhr.responseText), column);
    };

    console.log(zipcodes);
    xhr.send(JSON.stringify({"obj": {"docs": zipcodes}}));


  },

}