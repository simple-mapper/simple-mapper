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
    <div class = "about_container">
    <div class="pure-g">
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <img class = "about_img" src="https://www.simple-mapper.com/about/media/icon.png" alt="Simple-Mapper" height="150em">
    <p class = "about_p"><i>Simple-Mapper</i> is an <a href = "https://github.com/simple-mapper/simple-mapper/blob/master/LICENSE">open-source</a> project focused on creating a simple mapping experience to allow for quick visionalizations.</p>
    <p class = "about_p">Other tools set out to be the end all be all, this tool is not that.</p>
    <p class = "about_p">The driving vision is to create a light weight, interactive mapping experience, to provide fast editability and shareability.</p>
    <p class = "about_p">Check out the <a href="https://github.com/simple-mapper/simple-mapper">Github</a></p>
    </div>
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <img class = "about_img" src="https://www.simple-mapper.com/about/media/example_screenshot.png" alt="Simple-Mapper" height="auto" width="100%">
    </div>
    </div>
    <hr class = "break"></hr>
    <div class = "about_section about_container">
    <h1>Roadmap</h1>
    <div class="pure-g">
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <div style = "margin-left: 3em;">
    <div class = "about_roadmap">
    <h2>1) Stability</h2>
    </div>
    <ul class = "about_list">
    <li>Release a version 0.1</li>
    <ul>
    <li>Finialize core feature to be rolled out till version 1.0 release</li>
    </ul>
    <li>Build out docs with some details on key design features</li>
    <ul>
    <li>Getting started doc</li>
    <li>Basics on key functionality</li>
    <ul>
    <li>Using different map providers</li>
    </ul>
    </ul>
    </ul>
    <div class = "about_roadmap">
    <h2>2) Functionality</h2>
    </div>
    <ul class = "about_list">
    <li>Rewrite the application to expand functionality</li>
    <ul>
    <li>Remove the fetch requirement of the components</li>
    <li>Use parcer.js to bundle the package, removing global variables</li>
    </ul>
    <li>Update UI</li>
    <ul>
    <li>Clean up the toolbar UI</li>
    </ul>
    <li>Add new capabilities</li>
    <ul>
    <li>Add the ability to upload multiple documents</li>
    <li>Allow for saving multiple filter scripts</li>
    </ul>
    </ul>
    </div>
    </div>
    <div class="pure-u-1-1 pure-u-lg-1-2">
    <div style = "margin-left: 3em;">
    <div class = "about_roadmap">
    <h2>3) Expandability</h2>
    </div>
    <ul class = "about_list">
    <li>Develop a plug-in ecosystem</li>
    <ul>
    <li>Develop an API to the core application</li>
    <ul>
    <li>Rewrie api docs</li>
    </ul>
    </ul>
    <li>Long term functionality</li>
    <ul>
    <li>Allow simple-mapper to be embedded into other applications</li>
    <li>Access to simple-mapper APIs</li>
    <ul>
    <li>Zip code lookups</li>
    <li>Geocoding of addresses</li>
    <li>Path routing</li>
    </ul>
    </ul>
    <li>Develop a Simple Server</li>
    <ul>
    <li>Leverage open source GeoJSON's to develop a routing server</li>
    </ul>
    </ul>
    </div>
    </div>
    </div>
    </div>
    </div>
    </script>
    `

    about_home.init(text);

  }

}

window.about_home = about_home;
