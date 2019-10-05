var plugins = {
  gen: function(){
    render.plugins();
  },

  init: function(text){
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
