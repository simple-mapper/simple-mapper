var currentPath = __dirname;

var office365_render = {

  office365: function(){

    fetch(`${currentPath}/simple-mapper/js/plugins/office365-plugin/html/office365_plugins_template.html`).then(function(response){
      return response.text();
    }).then(function(text){

      office365.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },


}
