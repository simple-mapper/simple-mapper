var scheduler = {
  gen: function(){
    scheduler_render.scheduler();
  },

  init: function(text){
    scheduler.render(text);
  },

  render: function(text){

    document.getElementById("scheduler_plugins_div").innerHTML = text;
    var template = document.getElementById("scheduler_plugins_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("scheduler_plugins_div").innerHTML = html;

    scheduler.post_render();
  },

  post_render: function(){

    document.getElementById("scheduler_run").addEventListener('click', scheduler_utils.run, false);
    document.getElementById("scheduler_stop").addEventListener('click', scheduler_utils.stop, false);
    document.getElementById("scheduler_keepRunning").addEventListener('click', scheduler_utils.keepRunningMode, false);

    document.getElementById("scheduler_previous").addEventListener('click', scheduler_utils.previousInput, false);
    document.getElementById("scheduler_next").addEventListener('click', scheduler_utils.nextInput, false);

  },

}
