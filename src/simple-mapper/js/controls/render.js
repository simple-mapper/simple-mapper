var currentPath = __dirname;

var render = {

  toolbar: function(){

    fetch(`${currentPath}/simple-mapper/html/components/toolbar.html`).then(function(response){
      return response.text();
    }).then(function(text){

      toolbar.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  legend: function(){

    fetch(`${currentPath}/simple-mapper/html/components/legend.html`).then(function(response){
      return response.text();
    }).then(function(text){

      legend.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  upload: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/upload.html`).then(function(response){
      return response.text();
    }).then(function(text){

      upload.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  toolbar_controls: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/toolbar_controls.html`).then(function(response){
      return response.text();
    }).then(function(text){

      toolbar_controls.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  filters: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/filters.html`).then(function(response){
      return response.text();
    }).then(function(text){

      filters.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  wizard: function(){

    fetch(`${currentPath}/simple-mapper/html/components/wizard.html`).then(function(response){
      return response.text();
    }).then(function(text){

      wizard.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  wizard_table: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/wizard_table.html`).then(function(response){
      return response.text();
    }).then(function(text){

      wizard_table.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  text_options: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/text_options.html`).then(function(response){
      return response.text();
    }).then(function(text){

      text_options.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  analysis: function(){

    fetch(`${currentPath}/simple-mapper/html/components/analysis.html`).then(function(response){
      return response.text();
    }).then(function(text){

      analysis.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  smartLabel: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/analysis/smartLabel.html`).then(function(response){
      return response.text();
    }).then(function(text){

      label_utils.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  plugins: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/plugins.html`).then(function(response){
      return response.text();
    }).then(function(text){

      plugins.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },

  plugins_controls: function(){

    fetch(`${currentPath}/simple-mapper/html/components/components_parts/plugins/plugins_controls.html`).then(function(response){
      return response.text();
    }).then(function(text){

      plugins_controls.init(text);

    }).catch(function(err){
      console.log(err);
    })
  },



}
