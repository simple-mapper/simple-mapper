var scheduler = {
  gen: function(){
    scheduler.init();
  },

  init: function(){

    var text = `<script id="scheduler_plugins_template" type="text/x-handlebars-template">
    <h4>Scheduler</h4>
    <button id = "scheduler_run">Run</button>
    <button id = "scheduler_stop">Stop</button>
    <button id = "scheduler_keepRunning">Non-Continuous</button>
    <br>
    <br>
    <button id = "scheduler_previous">&laquo; Previous</button>
    <button id = "scheduler_next">Next &raquo;</button>
    <p id = "scheduler_error" style="max-width:350px"></p>
    </script>`

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

window.scheduler = scheduler;
