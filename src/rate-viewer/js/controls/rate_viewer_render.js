var currentPath = __dirname;

var rate_viewer_render = {

  rate_viewer_main: function(){

    fetch(`${currentPath}/rate-viewer/html/components/rate_viewer_main.html`).then(function(response){
      return response.text();
    }).then(function(text){

      rate_viewer_main.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

}
