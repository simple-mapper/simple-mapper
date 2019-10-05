var wizard_table = {
  gen: function(){
    render.wizard_table();
  },

  init: function(text){
    wizard_table.render(text);
  },

  render: function(text){

    document.getElementById("wizard_table").innerHTML = text;
    var template = document.getElementById("wizard_table_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(wizard_model.selectColumns);
    document.getElementById("wizard_table").innerHTML = html;

    wizard_table.post_render();

  },

  post_render: function(){

  },



}
