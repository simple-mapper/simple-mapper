var text_options = {
  gen: function(){
    render.text_options();
  },

  init: function(text){
    text_options.render(text);
  },

  render: function(text){

    document.getElementById("text_options").innerHTML = text;
    var template = document.getElementById("text_options_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(upload.data);
    document.getElementById("text_options").innerHTML = html;

    text_options.post_render();

  },

  post_render: function(){

    document.getElementById("text__options__close").addEventListener('click', text_options.close);
    document.getElementById("text__options__apply").addEventListener('click', wizard.setWizardModel);
    document.getElementById("text__options__smartLabelsSet").addEventListener('click', text_options.setSmartLabel);

  },

  close: function(){

    document.getElementById("text_options").innerHTML = "";


  },

  setSmartLabel: function(){
    document.getElementById("text__options__smartLabels").checked = false;
  }

}
