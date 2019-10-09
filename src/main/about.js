var about = {
  gen: function(){
    about.template();
  },

  init: function(text){
    about.render(text);
  },

  render: function(text){

    document.getElementById("main").innerHTML = text;
    var template = document.getElementById("about_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("main").innerHTML = html;

    about.post_render();
  },

  data: {},

  post_render: function(){
    about_home.gen();
  },

  template: function(){

    var text = `
    <script id="about_template" type="text/x-handlebars-template">
    <div class = "about_header">
    <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
    <li class="pure-menu-item  pure-menu-selected"><a href="#" class="pure-menu-link">Simple-Mapper</a></li>
    <li class="pure-menu-item"><a href="#about_home" class="pure-menu-link">About</a></li>
    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Roadmap</a></li>
    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Links</a></li>
    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Getting Started</a></li>
    </ul>
    </div>
    </div>
    <div class = "about" id = "about_home"></div>
    <div class="pure-g">
    <div class="pure-u-1-1 pure-u-lg-19-24">
    
    </div>
    <div class="pure-u-1-1 pure-u-lg-5-24">
    <div class = "about_container_cloud">
    <div class = "fancy"></div>
    </div>
    </div>
    </div>
    </script>
    `

    about.init(text);

  }

}
