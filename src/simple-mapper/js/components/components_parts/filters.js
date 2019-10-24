var filters = {
  gen: function(){
    filters.init();
  },

  init: function(){

    var text  = `<script id="filters_template" type="text/x-handlebars-template">
    <div class = "_container">
    <div id = "toolbar_controls"></div>
    <div style = "width: 52em;">
    <h3>About: </h5>
    <p>The way the filter works is the list of source, destination, and line points are passed
    to the filterScript function to allow for custom filters using standard javascript. This gives access to all the
    style options of the points as well, which offers powerful flexiblity.</p>
    <p>Use filters.log() instead of console.log() to debug on the page.</p>
    <p>Begins with --> function filterScript(lines, source_points, dest_points){</p>
      <textarea id = "textArea" class = "filterArea">
      </textarea>
      <p>Ends with -->  return [lines, source_points, dest_points]; }</p>
      <br>
      <button id = "saveFilter">Save Filter</button>
      <button id = "testFilter">Test Filter</button>
      <button id = "clearLog">Clear Log</button>
      <p id = "filterConsole"></p>
      </div>
      </div>
      </script>
      `

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

  window.filters = filters;
