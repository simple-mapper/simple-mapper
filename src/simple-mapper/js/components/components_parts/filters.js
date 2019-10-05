var filters = {
  gen: function(){
    render.filters();
  },

  init: function(text){
    filters.render(text);
  },

  render: function(text){

    document.getElementById("toolbar_body_div").innerHTML = text;
    var template = document.getElementById("filters_template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate();
    document.getElementById("toolbar_body_div").innerHTML = html;

    filters.post_render();

  },

  post_render: function(){

    filters.setCodeMirror();
    filters.setTesting();

  },

  fun: undefined,


  setTesting: function(){

    document.getElementById("testFilter").addEventListener('click', (event) => {
      try{
        var doc = filters.myCodeMirror.getDoc();
        var str = `${doc.getValue()}`;
        localStorage.setItem('filter', str);

        filters.fun = new Function("lines", "source_points", "dest_points", `${doc.getValue()} \n  return [lines, source_points, dest_points];`);
        //console.log(filters.fun);
        upload.confirmUploadData("skip");
        filters.gen();
      }
      catch(err){
        filters.log({error: String(err)});
        console.log(err);
        filters.gen();
      }
    });

    document.getElementById("clearLog").addEventListener('click', (event) => {
      localStorage.removeItem('log');
      filters.gen();
    });

    document.getElementById("saveFilter").addEventListener('click', (event) => {
      var doc = filters.myCodeMirror.getDoc();
      var str = `${doc.getValue()}`;
      localStorage.setItem('filter', str);
      filters.log("saved");
      filters.gen();
    });


  },

  myCodeMirror: {},

  setCodeMirror: function(){

    var str = localStorage.getItem('filter');
    if(str == undefined || str == null){
      str = "";
    }

    filters.myCodeMirror = CodeMirror(function(elt) {
      document.getElementById("textArea").parentNode.replaceChild(elt, document.getElementById("textArea"));
    }, {mode:  "javascript", value: str});

    var log = localStorage.getItem('log');
    document.getElementById("filterConsole").innerHTML = log;
  },

  log: function(){

    var currentLog = "";

    if(localStorage.getItem('log') != null){
      currentLog = localStorage.getItem('log');
    }

    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object') {
        currentLog += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
      } else {
        currentLog += arguments[i] + '<br />';
      }
    }


    localStorage.setItem('log', currentLog);
  }



}
