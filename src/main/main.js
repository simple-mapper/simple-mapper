var main = {
  gen: function(){
    main.main();
  },

  init: function(text){
    main.render(text);
  },

  render: function(text){

    document.getElementById("main").innerHTML = text;
    var template = document.getElementById("main_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("main").innerHTML = html;

    main.post_render();

  },

  post_render: function(){

    form.gen();

    //Needed for smart label
    label_utils.setPopupVal = true;

    map.gen();

    document.getElementById("expand").addEventListener('click', () =>{

      var x = document.getElementById("header");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }

      document.body.style.background = "#87cefa";

      simple_mapper.gen()
    });


  },

  main: function(){
    //Need to update to __dirname
    var currentPath = __dirname;

    fetch(`${currentPath}/main/main.html`).then(function(response){
      return response.text();
    }).then(function(text){

      main.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },


}
