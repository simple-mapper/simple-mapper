var currentPath = __dirname;

var scheduler_render = {

  scheduler: function(){

    fetch(`${currentPath}/simple-mapper/js/plugins/scheduler/html/scheduler_plugins_template.html`).then(function(response){
      return response.text();
    }).then(function(text){

      scheduler.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },


}
