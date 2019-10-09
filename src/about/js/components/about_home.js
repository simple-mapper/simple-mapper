var about_home = {
  gen: function(){
    about_home.template();
  },

  init: function(text){
    about_home.render(text);
  },

  render: function(text){

    document.getElementById("about_home").innerHTML = text;
    var template = document.getElementById("about_home_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("about_home").innerHTML = html;

  },

  data: {},

  post_render: function(){

  },

  template: function(){

    var text = `
    <script id="about_home_template" type="text/x-handlebars-template">
    <div class = "about">
    <div class = "about_container">
    <div class="pure-g">
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <h1>Mapping Made Simple!</h1>
    <p class = "about_p"><i>Simple-Mapper</i> is an <a href = "https://github.com/simple-mapper/simple-mapper/blob/master/LICENSE">open-source</a> project focused on creating a simple mapping experience to allow for quick visionalizations.</p>
    <p class = "about_p">Other tools set out to be the end all be all, this tool is not that.<p>
    <p class = "about_p">The driving vision to create a light weight, interactive mapping experience, to provide fast editability and shareability.<p>
    <p class = "about_p">Check out the <a href="https://github.com/simple-mapper/simple-mapper">Github</a><p>
    </div>
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <img class = "about_img" src="./about/media/example_screenshot.png" alt="Simple-Mapper" height="auto" width="100%">
    </div>
    </div>
    </div>
    </div>
    <div class="pure-g">
    <div class="pure-u-1-1 pure-u-lg-19-24">

    </div>
    <div class="pure-u-1-1 pure-u-lg-5-24">
    <div class = "about_container_cloud">
    <div class = "fancy"></div>
    </div>
    </div>
    </script>
    `

    about_home.init(text);

  }

}
