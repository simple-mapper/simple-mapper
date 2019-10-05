var office365_api = {

  getData: function(){
    office365_error.log("skip");
    office365_error.log("Sent wait ~20secs");

    office365_api.getRates();

  },

  getRates: function(){



  },

  user: function(){
    hello('aad').api('me/').then(function(data) {
      document.getElementById("loginID").text = data.userPrincipalName;
    },  function(err){
      office365_error.log(err);
    });
  }
}
