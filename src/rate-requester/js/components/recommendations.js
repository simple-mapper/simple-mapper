var recommendations = {

  res: function(){
    res.recommendations(form.obj);
  },

  gen: function(){
    render_rate_request.recommendations();
  },

  init: function(text){
    recommendations.render(text);
  },

  render: function(text){

    document.getElementById("recommendations").innerHTML = text;
    var template = document.getElementById("recommendations_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(recommendations.data);
    document.getElementById("recommendations").innerHTML = html;

    recommendations.post_render();

  },

  post_render: function(){

    var classname = document.getElementsByClassName("recommendation_lanes");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', recommendations.laneInfo);
    }

    document.getElementById("recommendation_page_up").addEventListener('click', recommendations.pageup);
    document.getElementById("recommendation_page_down").addEventListener('click', recommendations.pagedown);
    document.getElementById("recommendation_page_zero").addEventListener('click', recommendations.pagezero);

    var classInput = document.getElementsByClassName("recommendations_input_display");

    for (var i = 0; i < classname.length; i++) {
      classInput[i].addEventListener('click', recommendations.input_display);
    }


    document.getElementById("rate_info").addEventListener('click', () => {
      const {ipcRenderer} = require('electron');
      ipcRenderer.send('openChildWindow2');
    });

  },

  input_display: function(){

    var id = this.id.split("__");
    var carrier = id[1];

    var obj = {params: {}};

    obj.params.SourceZipCode = id[1];
    obj.params.DestinationZipCode = id[2];
    obj.params.Mode = id[3];
    obj.params.fromDate = rate_request_results.info.fromDate;
    obj.params.toDate = rate_request_results.info.toDate;
    obj.params.index = id[4];

    if(this.checked){
      recommendations.selected.push(obj.params.index - 1);
      res.addUpload(obj, rate_request_results.upload);
    }
    else {

      recommendations.selected = recommendations.selected.filter((index) => {
        console.log(index, (obj.params.index - 1), index != (obj.params.index - 1))
        return index != (obj.params.index - 1)
      });
      res.removeUpload(obj, rate_request_results.upload);
    }


  },

  selected: [0],

  upload: function(data){
    rate_request_results.upload = data;
    upload.requestGen(rate_request_results.upload, "skip");
  },

  pagezero: function(){

    geo.zipIndex.start = 0;
    geo.zipIndex.end = 20;

    geo.zipIndex.page = 0;


    //need a max length

    res.recommendations(form.obj);

  },

  pagedown: function(){

    geo.zipIndex.start = geo.zipIndex.start + 20;
    geo.zipIndex.end = geo.zipIndex.end + 20;

    geo.zipIndex.page++;
    //need a max length

    res.recommendations(form.obj);

  },

  pageup: function(){

    geo.zipIndex.start = geo.zipIndex.start - 20;
    geo.zipIndex.end = geo.zipIndex.end - 20;

    geo.zipIndex.page--;

    if(geo.zipIndex.start < 0){
      geo.zipIndex.start = 0;
      geo.zipIndex.page = 0;
    }

    if(geo.zipIndex.end < 20){
      geo.zipIndex.end = 20;
      geo.zipIndex.page = 0;
    }

    res.recommendations(form.obj);


  },

  laneInfo: function(){

    var id = this.id.split("__");
    var orig = id[1];
    var dest = id[2];
    var mode = id[3];

    var obj = {params: {}};

    obj.params.SourceZipCode = orig;
    obj.params.DestinationZipCode = dest;
    obj.params.Mode = mode;
    obj.params.fromDate = rate_request_results.info.fromDate;
    obj.params.toDate = rate_request_results.info.toDate;

    console.log(obj);

    form.obj = obj;

    freight_data.find(obj);

  },

  data: {params: []},

}
