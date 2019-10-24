
var toolbar = {
  gen: function(){
    toolbar.init();
  },

  init: function(){

    var text = `<script id="toolbar_template" type="text/x-handlebars-template">
    <div class = "toolbar_body simple_round">
    <button style = "font-size: 70%; float: right;" id = "toolbar_hide">Hide</button>
    <h2 class="toolbar_header hover_cursor">Toolbar</h2>
    <hr class = "hr-pad">
    <ul>
    <li style="display: inline-block"><a href="#" class="hover_cursor toolbar_legend" id = "toolbar_upload">Upload</a></li>
    <li style="display: inline-block"><a href="#" class="hover_cursor toolbar_legend" id = "toolbar_filters">Filters</a></li>
    <li style="display: inline-block"><a href="#" class="hover_cursor toolbar_legend" id = "toolbar_plugins">Plugins</a></li>
    <li style="display: inline-block"><a href="#" class="hover_cursor toolbar_legend" id = "toolbar_about">About</a></li>
    </ul>
    <pre id="log"></pre>
    <div id = "toolbar_body_div"></div>
    </div>
    </script>`

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
    document.getElementById("toolbar_about").addEventListener('click', about.gen, false);
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

window.toolbar = toolbar;
