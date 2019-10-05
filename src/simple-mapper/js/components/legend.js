var legend = {
  gen: function(){
    render.legend();
  },

  init: function(text){
    legend.render(text);
  },

  render: function(text){

    document.getElementById("legend").innerHTML = text;
    var template = document.getElementById("legend_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    //console.log(point_styles_model.fun.toArrayLegend());
    var html = compiledTemplate(point_styles_model.fun.toArrayLegend());
    document.getElementById("legend").innerHTML = html;

    legend.post_render();

  },

  post_render: function(){

  },

  setUpload: function(){

  },

  show: true,

  setShow: function(){
    var show = document.getElementById("legend__show").value;

    if(show == "false"){
      show = false;
    }
    else {
      show = true;
    }

    legend.show = show;

    if(!legend.show){
      document.getElementById("legend").innerHTML = "";
    }
    else {
      legend.gen();
    }


  }


}
