var rate_request_results = {

  res: function(){

    upload.requestGen(rate_request_results.upload, "ok");

    rate_request_charts.gen();

    rate_request_results.gen();

    recommendations.res();
  },

  gen: function(){
    render_rate_request.rate_request_results();
  },

  init: function(text){
    rate_request_results.render(text);
  },

  render: function(text){

    document.getElementById("rate_request_results").innerHTML = text;
    var template = document.getElementById("rate_request_results_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(rate_request_results.data_aggregate);
    document.getElementById("rate_request_results").innerHTML = html;

    rate_request_results.post_render();

  },

  post_render: function(){

    var classname = document.getElementsByClassName("results_carriers");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', rate_request_results.carrierInfo);
    }


  },

  info: {
    fromDate: "",
    toDate: "",
  },

  carrierInfo: function(){
    var id = this.id.split("__");
    var carrier = id[1];

    console.log(carrier);

    var obj = {params: {}};

    obj.params.SourceZipCode = "";
    obj.params.DestinationZipCode = "";
    obj.params.Mode = "";
    obj.params.fromDate = rate_request_results.info.fromDate;
    obj.params.toDate = rate_request_results.info.toDate;
    obj.params.carrier = carrier;

    freight_data.findCarrier(obj);

  },

  data: {},

  data_aggregate: {},

  upload: [],

  minVal: 100000000,

  maxVal: -100000000,

  filter: "for(var i = 0; i < dest_points.length; i++){\n\n\tdest_points[i].label = dest_points[i].obj[\"Dest__\"];\n\n}\n",

}
