var currentPath = __dirname;

var render_rate_request = {

  form: function(){

    fetch(`${currentPath}/rate-requester/html/components/form.html`).then(function(response){
      return response.text();
    }).then(function(text){

      form.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  rate_request_results: function(){

    fetch(`${currentPath}/rate-requester/html/components/rate_request_results.html`).then(function(response){
      return response.text();
    }).then(function(text){

      rate_request_results.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  recommendations: function(){

    fetch(`${currentPath}/rate-requester/html/components/recommendations.html`).then(function(response){
      return response.text();
    }).then(function(text){

      recommendations.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },
}
