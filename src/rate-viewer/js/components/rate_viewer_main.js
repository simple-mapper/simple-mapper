var rate_viewer_main = {
  gen: function(){
    rate_viewer_main.data.obj = rate_viewer_utils.expectedCost(JSON.parse(localStorage.getItem('rateInfo')));

    console.log(rate_viewer_main.data);
    rate_viewer_render.rate_viewer_main();
  },

  init: function(text){
    rate_viewer_main.render(text);
  },

  render: function(text){

    document.getElementById("main").innerHTML = text;
    var template = document.getElementById("rate_viewer_main_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(rate_viewer_main.data);
    document.getElementById("main").innerHTML = html;

  },

  data: {},

  post_render: function(){

  },

}
