var wizard_table = {
  gen: function(){
    wizard_table.init();
  },

  init: function(){

    var text = `<script id="wizard_table_template" type="text/x-handlebars-template">
    <table style="width:100%; margin-right: 3em;" class = "wizard_table">
    <tr>
    <td class = "wizard_table">SLat</td>
    <td class = "wizard_table">C{{SLat}}</td>
    </tr>
    <tr>
    <td class = "wizard_table">SLng</td>
    <td class = "wizard_table">C{{SLng}}</td>
    </tr>
    <tr>
    <td class = "wizard_table">DLat</td>
    <td class = "wizard_table">C{{DLat}}</td>
    </tr>
    <tr>
    <td class = "wizard_table">DLng</td>
    <td class = "wizard_table">C{{DLng}}</td>
    </tr>
    <tr>
    <td class = "wizard_table">CAT</td>
    <td class = "wizard_table">C{{CAT}}</td>
    </tr>
    <tr>
    <td class = "wizard_table">TXT</td>
    <td class = "wizard_table">C{{TXT}}</td>
    </tr>
    </table>
    </script>`

    wizard_table.render(text);
  },

  render: function(text){

    document.getElementById("wizard_table").innerHTML = text;
    var template = document.getElementById("wizard_table_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(wizard_model.selectColumns);
    document.getElementById("wizard_table").innerHTML = html;

    wizard_table.post_render();

  },

  post_render: function(){

  },



}

window.wizard_table = wizard_table;
