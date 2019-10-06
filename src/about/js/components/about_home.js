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
      <h1>test</h1>
    </script>
    `

    about_home.init(text);

  }

}
