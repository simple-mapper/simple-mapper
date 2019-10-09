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
    <li class="pure-menu-item"><a href="#about_home" class="pure-menu-link"><u>About</u></a></li>
    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Roadmap</a></li>
    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Getting Started</a></li>
    </ul>
    </div>
    </div>
    <div id = "about_home"></div>
    </script>
    `

    about.init(text);

  }

}
