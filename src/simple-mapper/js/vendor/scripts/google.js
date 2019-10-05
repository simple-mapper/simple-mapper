var google_id_token = "";

function onSignIn(googleUser) {
  google_id_token = googleUser.getAuthResponse().id_token;
  //exampleHttp();
  exampleHttpSet();

}

function exampleHttp(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://38a22785.us-south.apiconnect.appdomain.cloud/5f7911cc-c980-43e9-8b86-ecfa9b6180ad/zipcodes?zipcode=[%2229550%22,%2230316%22]');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.setRequestHeader('Authorization', 'Bearer ' + google_id_token);
  xhr.send('idtoken=' + google_id_token);
}

function exampleHttpSet(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://us-south.appid.cloud.ibm.com/oauth/v4/6931a300-7124-41eb-ae1e-3f26021666ea/token');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('grant_type', 'client_credentials');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.setRequestHeader('Authorization', 'Basic ' + google_id_token);
  xhr.send('idtoken=' + google_id_token);
}

function api_test(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://38a22785.us-south.apiconnect.appdomain.cloud/5f7911cc-c980-43e9-8b86-ecfa9b6180ad/zipcodes?zipcode=[%2229550%22,%2230316%22]&id_token=${google_id_token}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send();
}

//document.getElementById("google-test").addEventListener('click', api_test);
