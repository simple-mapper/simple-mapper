var form = {
  gen: function(){
    render_rate_request.form();
  },

  init: function(text){
    form.render(text);
  },

  render: function(text){

    document.getElementById("form").innerHTML = text;
    var template = document.getElementById("form_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(wizard_model.selectColumns);
    document.getElementById("form").innerHTML = html;

    form.post_render();

  },

  obj: {},

  submit: false,

  post_render: function(){

    if(form.submit){
      rate_request_results.res();
    }

    document.getElementById("rate_request_form").addEventListener('submit', () => {
      form.submit = true;

      office365_error.log("skip");
      event.preventDefault();

      var sourceZip = event.target["1"].value;
      var destZip = event.target["2"].value;
      var mode = event.target["3"].value;
      var fromDate = event.target["4"].value;
      var toDate = event.target["5"].value;

      rate_request_results.info.fromDate = fromDate;
      rate_request_results.info.toDate = toDate;

      var obj = {params: {}};

      obj.params.SourceZipCode = sourceZip;
      obj.params.DestinationZipCode = destZip;
      obj.params.Mode = mode;
      obj.params.fromDate = fromDate;
      obj.params.toDate = toDate;

      form.obj = obj;

      freight_data.find(obj);

    });

  },

}
