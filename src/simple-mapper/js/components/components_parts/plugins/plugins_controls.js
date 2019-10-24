var plugins_controls = {
  gen: function(){
    plugins_controls.init();
  },

  init: function(){

    var text = `<script id="plugins_controls_template" type="text/x-handlebars-template">
    {{#each confirmed}}
    <div id = "{{div}}"></div>
    <hr>
    {{/each}}
    </script>`

    plugins_controls.render(text);
  },

  render: function(text){

    document.getElementById("plugins_body_div").innerHTML = text;
    var template = document.getElementById("plugins_controls_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(plugins_model);
    document.getElementById("plugins_body_div").innerHTML = html;

    plugins_controls.post_render();
  },

  post_render: function(){

    for(var i = 0; i < plugins_model.confirmed.length; i++){
      plugins_model.confirmed[i].fun();
    }

  },



}

window.plugins_controls = plugins_controls;
