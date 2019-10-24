var text_options = {
  gen: function(){
    text_options.init();
  },

  init: function(){

    var text = `<script id="text_options_template" type="text/x-handlebars-template">
    <button style = "font-size: 70%; float: right;" id = "text__options__close">Close</button>
    <div class = "grid-container">
    <div class = "grid-div">
    <legend>Label Text</legend>
    <select id = "text__options__label">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../TXT @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    </div>
    <div class = "grid-div">
    <legend>Font Size</legend>
    <input type="number" value ="{{font_size}}" id = "text__options__font__size"></input>
    </div>
    </div>
    <br>
    <label>Smart Label</label>
    <input type="radio" id="text__options__smartLabels" {{#if smartLabel}}checked{{/if}}></input>
    <button id = "text__options__smartLabelsSet">Remove</button>
    <button style = "font-size: 70%; float: right;" id = "text__options__apply">Apply Font</button>
    <br>
    <br>
    </script>
    `

    text_options.render(text);
  },

  render: function(text){

    document.getElementById("text_options").innerHTML = text;
    var template = document.getElementById("text_options_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(upload.data);
    document.getElementById("text_options").innerHTML = html;

    text_options.post_render();

  },

  post_render: function(){

    document.getElementById("text__options__close").addEventListener('click', text_options.close);
    document.getElementById("text__options__apply").addEventListener('click', wizard.setWizardModel);
    document.getElementById("text__options__smartLabelsSet").addEventListener('click', text_options.setSmartLabel);

  },

  close: function(){

    document.getElementById("text_options").innerHTML = "";


  },

  setSmartLabel: function(){
    document.getElementById("text__options__smartLabels").checked = false;
  }

}

window.text_options = text_options;
