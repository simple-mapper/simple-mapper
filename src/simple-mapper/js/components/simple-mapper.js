
var simple_mapper = {
  gen: function(){
    simple_mapper.init();
  },

  init: function(text){


    var text = `
    <script id="main_template" type="text/x-handlebars-template">

    <div id="map" class="map-full" style="width: 100%; height: 100%; position:fixed"></div>

    <div id = "legend" class = "legend"></div>
    <div id = "toolbar" class = "toolbar"></div>
    <div id = "wizard" class = "wizard"></div>
    <div id = "analysis" class = "analysis"></div>

    <button id = "home" class = "expand2" hidden>Home</button>

    <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
    </div>
    </script>
    `

    simple_mapper.render(text);
  },

  render: function(text){

    document.getElementById("main").innerHTML = text;
    var template = document.getElementById("main_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("main").innerHTML = html;

    simple_mapper.post_render();

  },

  post_render: function(){

    //Needed for smart label
    label_utils.setPopupVal = true;

    map.gen();
    toolbar.gen();

  },

}

window.simple_mapper = simple_mapper;
