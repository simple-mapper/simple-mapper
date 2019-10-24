var toolbar_controls = {
  gen: function(){
    toolbar_controls.init();
  },

  init: function(){

    var text = `<script id="toolbar_controls_template" type="text/x-handlebars-template">
    {{#if catagoriesCheck}}
    <hr>
    <div class = "grid-container">
    <div class = "grid-div">
    <legend class = "toolbar_legend">Categories</legend>
    <input list="category__selectors" name="category__selectors" type="text" id = "category__selector" style="max-width: 7em;" {{#each catagories}}{{#if selected}}value={{name}}{{/if}}{{/each}}>
    <datalist id = "category__selectors">
    {{#each catagories}}
    <option value="{{name}}">{{name}}</option>
    {{/each}}
    </datalist>
    <button id = "category__apply">Apply</button>
    </div>
    <div class = "grid-div">
    <legend class = "toolbar_legend">Global Show</legend>
    <select id = "global__show">
    <option value="true">Show</option>
    <option value="false">Hide</option>
    </select>
    <button class = "global__apply" id = "global__show__apply">Apply</button>
    </div>
    </div>
    <br>
    <div class = "grid-container">
    <div class = "grid-div">
    <legend class = "toolbar_legend">Line Show</legend>
    <select id = "legend__lineShow">
    <option value="true">Show</option>
    <option value="false">Hide</option>
    </select>
    <button class = "global__apply" id = "legend__lineShow__apply">Apply</button>
    </div>
    <div class = "grid-div">
    <legend class = "toolbar_legend">Legend Show</legend>
    <select id = "legend__show">
    <option value="true">Show</option>
    <option value="false">Hide</option>
    </select>
    <button class = "global__apply" id = "legend__show__apply">Apply</button>
    </div>
    </div>
    <br>
    <div class = "grid-container">
    <!--<div class = "grid-div">
    <legend class = "toolbar_legend">Global Analysis</legend>
    <button id = "legend__analysis">Apply</button>
    </div>-->
    <div class = "grid-div">
    <legend class = "toolbar_legend">Global Wizard</legend>
    <button id = "legend__wizard">Apply</button>
    </div>
    </div>
    <hr>
    <h2 id = "selected__category"></h2>
    {{/if}}
    {{#each point_styles_model}}
    <legend class = "toolbar_legend">{{SourceOrDest}} Point Size</legend>
    <input type="number" value ="{{size}}" id = "{{id}}__point__size"></input>
    <button class = "toolbar__apply" id = "{{id}}__point__size__apply">Apply</button>
    <br>
    <br>
    <legend class = "toolbar_legend">{{SourceOrDest}} Point Outline Width</legend>
    <input type="number" value ="{{outline_width}}" id = "{{id}}__point__outline_width"></input>
    <button class = "toolbar__apply" id = "{{id}}__point__outline_width__apply">Apply</button>
    <br>
    <br>
    <div class = "grid-container">
    <div class = "grid-div">
    <legend class = "toolbar_legend">{{SourceOrDest}} Point Color</legend>
    <input type="color" value="{{color}}" id = "{{id}}__point__color">
    <button class = "toolbar__apply" id = "{{id}}__point__color__apply">Apply</button>
    </div>
    <div class = "grid-div">
    <legend class = "toolbar_legend">{{SourceOrDest}} Point Shape</legend>
    <select id = "{{id}}__point__shape" value={{shape}}>
    <option value="circle">Circle</option>
    <option value="square" {{#ifEquals shape "square"}}selected{{/ifEquals}}>Square</option>
    <option value="outline" {{#ifEquals shape "outline"}}selected{{/ifEquals}}>Outline</option>
    </select>
    <button class = "toolbar__apply" id = "{{id}}__point__shape__apply">Apply</button>
    </div>
    </div>
    </br>
    <div class = "grid-container">
    <div class = "grid-div">
    <legend class = "toolbar_legend">{{SourceOrDest}} Point Show</legend>
    <select id = "{{id}}__point__show" value={{shape}}>
    <option value="true">Show</option>
    <option value="false"{{#unless show}} selected{{/unless}}>Hide</option>
    </select>
    <button class = "toolbar__apply" id = "{{id}}__point__show__apply">Apply</button>
    </div>
    <div class = "grid-div" style = "align:left">

    </div>
    </div>

    <br>
    <hr class = "hr-full">
    {{#ifEquals SourceOrDest "Destination"}}
    <legend class = "toolbar_legend">Line Show</legend>
    <select id = "{{id}}__point__lineShow" value="true">
    <option value="true">Show</option>
    <option value="false">Hide</option>
    </select>
    <button class = "toolbar__apply" id = "{{id}}__point__lineShow__apply">Apply</button>
    {{/ifEquals}}
    {{/each}}
    </script>
    `

    toolbar_controls.render(text);
  },

  render: function(text){

    document.getElementById("toolbar_controls").innerHTML = text;
    var template = document.getElementById("toolbar_controls_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(point_styles_model.fun.toArray());

    try {
      document.getElementById("toolbar_controls").innerHTML = html;
      toolbar_controls.post_render();
    }
    catch(err){

    }

  },

  post_render: function(){
    toolbar_controls.setApply();

    document.getElementById("selected__category").innerHTML = toolbar_controls.catagory;

  },

  catagory: "",

  setApply: function(){
    var classname = document.getElementsByClassName("toolbar__apply");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', toolbar_controls.applyStyle);
    }


    try {

      document.getElementById("global__show__apply").addEventListener("click", point_styles_model.fun.setAll);
      document.getElementById("legend__lineShow__apply").addEventListener("click", point_styles_model.fun.setAll);

      document.getElementById("category__apply").addEventListener("click", toolbar_controls.set_catagory);

      document.getElementById("legend__show__apply").addEventListener("click", legend.setShow);

      document.getElementById("legend__wizard").addEventListener("click", wizard.gen);

    }
    catch(err){

    }

  },

  applyStyle: function(){

    var id = this.id.split("__");
    var idVal = toolbar_controls.joinID(id);

    var name = id[0];
    var type = id[1];
    var style_config = id[2];

    if(point_styles_model[name] == undefined){
      point_styles_model[name] =  point_styles_model[type];
    }

    var selectedVal = document.getElementById(idVal).value;
    if(selectedVal == 'true'){
      selectedVal = true;
    }
    if(selectedVal == 'false'){
      selectedVal = false;
    }

    point_styles_model[name][style_config] = selectedVal;
    document.getElementById(idVal).value = point_styles_model[name][style_config];

    upload.confirmUploadData();

  },

  joinID: function(id){

    var i = 0;
    var idVal = id[0];

    for(i = 1; i < (id.length - 1); i++){
      idVal = idVal + "__" + id[i];
    }

    return idVal;
  },

  set_catagory: function(){

    var catagory = document.getElementById("category__selector").value;
    point_styles_model.fun.catagories.setCatagory(catagory);
    toolbar_controls.gen();
  }
}

window.toolbar_controls = toolbar_controls;
