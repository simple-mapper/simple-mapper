var wizard = {
  gen: function(){
    wizard.init();
  },

  init: function(){

    var text = `<script id="wizard_template" type="text/x-handlebars-template">
    <div class = "wizard_body simple_round">
    <table style="width:100%" class = "wizard_table">
    <tr>
    {{#each header}}
    <th class = "wizard_table wizard_headers" id="{{@index}}__{{name}}__wizard__header"><a href="#">{{name}}</a></th>
    {{/each}}
    </tr>
    {{#each shortValues}}
    <tr>
    {{#each val}}
    <td class = "wizard_table">{{this}}</td>
    {{/each}}
    </tr>
    {{/each}}
    </table>
    <hr>
    <div class = "grid-container" style = "margin-left: 1em; margin-right: 1em;">
    <div class = "grid-div" style="border-right:1px solid #000; margin-bottom: 2em;">
    <h4>Select Columns</h4>
    <legend>Source Latitude</legend>
    <select class = "wizard_select" id = "source__latitude__wizard">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../SLat @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    <br>
    <br>
    <legend>Source Longitude</legend>
    <select class = "wizard_select" id = "source__longitube__wizard">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../SLng @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    <br>
    <br>
    <legend>Destination Latitude</legend>
    <select class = "wizard_select" id = "destination__latitude__wizard">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../DLat @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    <br>
    <br>
    <legend>Destination Longitude</legend>
    <select class = "wizard_select" id = "destination__longitude__wizard">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../DLng @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    <br>
    <br>
    <legend>Catagory</legend>
    <select class = "wizard_select" id = "catagory__wizard">
    <option value="{{null}}">N/A</option>
    {{#each header}}
    <option value="{{@index}}" {{#ifEquals ../CAT @index}}selected{{/ifEquals}}>{{name}}</option>
    {{/each}}
    </select>
    <br>
    <br>
    <button id = "apply__wizard">Apply</button>
    <button id = "text__options__wizard">Text Options</button>
    </div>
    <div class = "grid-div" style = "margin-left: 1em">
    <h4>Selected Columns</h4>
    <div id = "wizard_table"></div>
    <br>
    <button id = "apply__confirm__wizard">Confirm</button>
    <button id = "apply__default__wizard">Use Defaults</button>
    <button id = "exit__wizard">Exit</button>
    <p>Defaults: SLat=C0,SLng=C1,DLat=C2,DLng=C3,CAT=C4,TXT=C</p>
    <hr>
    <div id = "text_options"></div>
    </div>
    </div>
    </div>
    </script>`

    wizard.render(text);
  },

  render: function(text){

    document.getElementById("wizard").innerHTML = text;
    var template = document.getElementById("wizard_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    upload_utils.wizardData();
    var html = compiledTemplate(upload.data);
    document.getElementById("wizard").innerHTML = html;

    wizard.post_render();

  },

  post_render: function(){
    wizard.setFunction();
  },

  setFunction: function(){

    document.getElementById("analysis").innerHTML = "";
    wizard_model.selectColumns = wizard_model.confirmed;

    document.getElementById("apply__wizard").addEventListener('click', wizard.setWizardModel);
    document.getElementById("apply__default__wizard").addEventListener('click', wizard.setWizardModelDefault);
    document.getElementById("apply__confirm__wizard").addEventListener('click', wizard.setWizardModelConfirm);
    document.getElementById("exit__wizard").addEventListener('click', wizard.wizardExit);
    document.getElementById("text__options__wizard").addEventListener('click', text_options.gen);

    var classname = document.getElementsByClassName("wizard_headers");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', wizard.requestZips);
    }


    wizard_table.gen();

  },

  setWizardModel: function(){
    var id = this.id.split("__");

    var selectedVals = {};

    selectedVals.SLat = document.getElementById("source__latitude__wizard").value;
    selectedVals.SLng = document.getElementById("source__longitube__wizard").value;
    selectedVals.DLat = document.getElementById("destination__latitude__wizard").value;
    selectedVals.DLng = document.getElementById("destination__longitude__wizard").value;
    selectedVals.CAT = document.getElementById("catagory__wizard").value;

    try {
      selectedVals.TXT = document.getElementById("text__options__label").value;
      selectedVals.font_size = document.getElementById("text__options__font__size").value;
      selectedVals.smartLabel = document.getElementById("text__options__smartLabels").checked;
    }
    catch(err){

    }

    wizard_model.selectColumns = selectedVals;

    wizard_table.gen();

  },

  setWizardModelDefault: function(){

    wizard_model.selectColumns = {
      SLat: "0",
      SLng: "1",
      DLat: "2",
      DLng: "3",
      CAT: "4",
      TXT: "",
      font_size: 30,
      smartLabel: true,
    };

    wizard.setWizardModelConfirm();
  },

  setWizardModelConfirm: function(){

    wizard_model.confirmed = wizard_model.selectColumns;
    document.getElementById("wizard").innerHTML = "";
    document.getElementById("inputFile").value = null;
    if(upload.first){
      point_styles_model.fun.clear();
      upload.first = false;
    }
    upload.confirmUploadData();

  },

  wizardExit: function(){

    document.getElementById("wizard").innerHTML = "";

  },

  requestZips: function(){
    var id = this.id.split("__");
    var column = id[0];
    var zips = [];

    var zipDic = {};
    var indexVal = "";

    for(var i = 1; i < upload.data.values.length; i++){
      indexVal = upload.data.values[i][column];
      if(zipDic[indexVal] == undefined){
        zipDic[indexVal] = indexVal;
        zips.push({"id": wizard.zipCountry(upload.data.values[i][column])});
      }
      else {

      }
    }

    var google_id_token = "";

    //simple_api.simple_zipcodes(google_id_token, zips, column);

  },

  zipCountry: function(checkVal){

    var country = ((parseFloat(checkVal)) ? 'US' : 'CA');

    var str = ((parseFloat(checkVal)) ? checkVal : checkVal.substring(0, 3));

    var returnStr = `${country}-${str}`

    return returnStr;
  },

  returnZips: function(zipResponse, column) {

    var zipData = zipResponse;

    var zips = {};
    var keyVal = "";
    for(var i = 0; i < zipData.results.length; i++){

      keyVal = zipData.results[i].id;
      if(zipData.results[i].error == undefined){
        zips[keyVal] = zipData.results[i];
      }

    }

    var columnName_lat = upload.data.values[0][column] + " Lat";
    var columnName_lng = upload.data.values[0][column] + " Lng";

    upload.data.values[0].push(columnName_lat);
    upload.data.values[0].push(columnName_lng);

    var lookVal = "";
    var latVal = "";
    var lngVal = "";

    for(var i = 1; i < upload.data.values.length; i++){
      lookVal = wizard.zipCountry(upload.data.values[i][column]);

      if(zips[lookVal] != undefined && zips[lookVal].docs[0] != undefined && zips[lookVal].docs[0].ok != undefined){
        latVal = zips[lookVal].docs[0].ok.latitude;
        lngVal = zips[lookVal].docs[0].ok.longitude;
        upload.data.values[i].push(latVal);
        upload.data.values[i].push(lngVal);
      }
      else {
        upload.data.values[i].push("");
        upload.data.values[i].push("");
      }
    }

    wizard.gen();

  }

}

window.wizard = wizard;
