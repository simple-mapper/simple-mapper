var toolbar_controls = {
  gen: function(){
    render.toolbar_controls();
  },

  init: function(text){
    toolbar_controls.render(text);
  },

  render: function(text){

    document.getElementById("toolbar_controls").innerHTML = text;
    var template = document.getElementById("toolbar_controls_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(point_styles_model.fun.toArray());

    //Remove error on initial load
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
      // var globalClass = document.getElementsByClassName("global_apply");
      //
      // for (var i = 0; i < classname.length; i++) {
      //   globalClass[i].addEventListener('click', point_styles_model.fun.setAll);
      // }

      document.getElementById("global__show__apply").addEventListener("click", point_styles_model.fun.setAll);
      document.getElementById("legend__lineShow__apply").addEventListener("click", point_styles_model.fun.setAll);

      document.getElementById("category__apply").addEventListener("click", toolbar_controls.set_catagory);

      document.getElementById("legend__show__apply").addEventListener("click", legend.setShow);

      document.getElementById("legend__wizard").addEventListener("click", wizard.gen);

      //document.getElementById("legend__analysis").addEventListener("click", analysis.gen);

    }
    catch(err){

      //Likely just not rendered yet
    }

  },

  applyStyle: function(){

    var id = this.id.split("__");
    var idVal = toolbar_controls.joinID(id);

    var name = id[0];
    var type = id[1];
    var style_config = id[2];

    //Set style object by type name
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
