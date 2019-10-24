var plugins = {
  gen: function(){
    plugins.init();
  },

  init: function(){

    var text = `<script id="plugins_template" type="text/x-handlebars-template">
    <div class = "_container" style = "margin-right: 5em;">
    <h4>Plugins List:</h4>
    <div id = "plugins_body_div"></div>
    </div>
    </script>
    `

    plugins.render(text);
  },

  render: function(text){

    document.getElementById("toolbar_body_div").innerHTML = text;
    var template = document.getElementById("plugins_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("toolbar_body_div").innerHTML = html;

    plugins.post_render();
  },

  post_render: function(){
    plugins_controls.gen();
  },



}

window.plugins = plugins;
