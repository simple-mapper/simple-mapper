var legend = {
  gen: function(){
    legend.init();
  },

  init: function(text){

    var text = `<script id="legend_template" type="text/x-handlebars-template">
    {{#if show}}
    <div class = "legend_body">
    <!--<h2 class="legend_header hover_cursor">Legend</h2>-->
    <table style="width:100%">
    <tr>
    <th>Category</th>
    <th>Type</th>
    <th>Color</th>
    </tr>
    {{#each point_styles_model}}
    {{#if show}}
    <tr>
    <td class = "legend_table">{{catagory}}</td>
    <td class = "legend_table">{{SourceOrDest}}</td>
    <td class = "legend_table">
    <div style="background-color: {{color}};" class="legend-{{shape}}"></div>
    </td>
    </tr>
    {{/if}}
    {{/each}}
    </table>
    </div>
    {{/if}}
    </script>`

    legend.render(text);
  },

  render: function(text){

    document.getElementById("legend").innerHTML = text;
    var template = document.getElementById("legend_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
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

window.legend = legend;
