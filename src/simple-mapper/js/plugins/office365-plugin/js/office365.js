var office365 = {
  gen: function(){
    office365_render.office365();
  },

  init: function(text){
    office365.render(text);
  },

  render: function(text){

    document.getElementById("office365_plugins_div").innerHTML = text;
    var template = document.getElementById("office365_plugins_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("office365_plugins_div").innerHTML = html;

    office365.post_render();
  },

  post_render: function(){
    document.getElementById("office365_fetch").addEventListener('click', office365_api.getData, false);

    const {ipcRenderer} = require('electron')
    $('#loginID').click(function () {
      ipcRenderer.send('openChildWindow')
    })

  },

}
