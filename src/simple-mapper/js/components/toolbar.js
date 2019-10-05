var toolbar = {
  gen: function(){
    render.toolbar();
  },

  init: function(text){
    toolbar.render(text);
  },

  render: function(text){

    document.getElementById("toolbar").innerHTML = text;
    var template = document.getElementById("toolbar_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("toolbar").innerHTML = html;

    toolbar.post_render();

  },

  post_render: function(){
    upload.gen();
    toolbar.setUpload();
    toolbar.setHide();
  },

  setUpload: function(){
    document.getElementById("toolbar_upload").addEventListener('click', upload.gen, false);
    document.getElementById("toolbar_filters").addEventListener('click', filters.gen, false);
    document.getElementById("toolbar_plugins").addEventListener('click', plugins.gen, false);
  },

  setHide: function(){
    document.getElementById("toolbar_hide").addEventListener('click', () =>{
      document.getElementById("toolbar").innerHTML = `
      <button style = "font-size: 70%; opacity: 0.5;" id = "toolbar_hide">Simple-Mapper</button>
      `
      document.getElementById("toolbar_hide").addEventListener('click', () =>{
        toolbar.gen();
      })
    })
  },

}
