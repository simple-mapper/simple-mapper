
//Login functions
function login(network){

	// By defining response type to code, the OAuth flow that will return a refresh token to be used to refresh the access token
	// However this will require the oauth_proxy server
	hello(network).login({display: "display"}, log).then(function() {
		//alert('You are signed in to AAD');

		// Change button to Sign Out
		var authButton = document.getElementById('auth');
		authButton.innerHTML = 'logout';
		authButton.setAttribute('onclick', 'logout("aad");');

		api(network);

	}, function(e) {
		alert('Signin error: ' + e.error.message);
	});
}

function logout(network){
	// Removes all sessions, need to call AAD endpoint to do full logout
	hello(network).logout({force: true}, log).then(function() {
		//alert('You have Signed Out of  AAD');


		// Change button to Sign in
		var authButton = document.getElementById('auth');
		authButton.innerHTML = "Login AAD";
		authButton.setAttribute('onclick', 'login("aad");');

	}, function(e) {
		alert('Sign out error: ' + e.error.message);
	});
}

function log(s){
	console.log(JSON.stringify(s, true, 2));
}
//End Login Functions


// TODO: Register your app and put your client/app id below
hello.init({
	aad : ``
},{
	//redirect_uri: 'https://query3/redirect.html',
	redirect_uri: 'https://login.microsoftonline.com/common/oauth2/nativeclient',
	scope: 'Files.ReadWrite.All, User.ReadWrite'
});

login('aad');

//End Login Controls

function api(network, request, method, data) {
	// api in hello.js allows you to make API calls w/ the new Bearer Token

	hello(network).api(request, method, data).then(function(data) {
		//alert("Data: " + JSON.stringify(data));
	});
}
