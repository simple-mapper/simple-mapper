
//Global-->
require('././main/config/global_var.js');

//Vendor-->
window.ol = require('./simple-mapper/js/vendor/ol.js');
window.olms = require('./simple-mapper/js/vendor/olms.js');
window.Handlebars = require('./simple-mapper/js/vendor/handlebars.min.js');
window.Papa = require('./simple-mapper/js/vendor/papaparse.min.js');
window.CodeMirror = require('./simple-mapper/js/vendor/codemirror.js');
window.FileSaver = require('./simple-mapper/js/vendor/FileSaver.min.js');

//Components-->
require('./simple-mapper/js/components/map.js');
require('./simple-mapper/js/components/toolbar.js');
require('./simple-mapper/js/components/legend.js');
require('./simple-mapper/js/components/wizard.js');
require('./simple-mapper/js/components/analysis.js');

//Components Parts-->
require('./simple-mapper/js/components/components_parts/upload.js');
require('./simple-mapper/js/components/components_parts/upload_utils.js');
require('./simple-mapper/js/components/components_parts/export.js');
require('./simple-mapper/js/components/components_parts/filters.js');
require('./simple-mapper/js/components/components_parts/toolbar_controls.js');
require('./simple-mapper/js/components/components_parts/wizard_table.js');
require('./simple-mapper/js/components/components_parts/wizard_model.js');
require('./simple-mapper/js/components/components_parts/map_utils.js');
require('./simple-mapper/js/components/components_parts/text_options.js');
require('./simple-mapper/js/components/components_parts/plugins.js');

//Analysis Components Parts-->
require('./simple-mapper/js/components/components_parts/analysis/label_utils.js');
require('./simple-mapper/js/components/components_parts/analysis/analysis_model.js');
require('./simple-mapper/js/components/components_parts/analysis/analysis_utils.js');

//Component Styles-->
require('./simple-mapper/js/components/styles/point_styles.js');
require('./simple-mapper/js/components/styles/point_style_model.js');
require('./simple-mapper/js/components/styles/shapes.js');
require('./simple-mapper/js/components/styles/mapStyles.js');
require('./simple-mapper/js/components/styles/map_colors.js');

//Controls-->
require('./simple-mapper/js/controls/render.js');

//Api-->
require('./simple-mapper/js/api/simple-api.js');

//Plugins Scheduler-->
require('./simple-mapper/js/plugins/scheduler/js/controls/scheduler_render.js');
require('./simple-mapper/js/plugins/scheduler/js/controls/scheduler_error.js');
require('./simple-mapper/js/plugins/scheduler/js/components/scheduler_utils.js');
require('./simple-mapper/js/plugins/scheduler/js/scheduler.js');

//Plugins Components Parts-->
require('./simple-mapper/js/components/components_parts/plugins/plugins_controls.js');
require('./simple-mapper/js/components/components_parts/plugins/plugins_model.js');

//***About-->

//Components-->
require('./about/js/components/about_home.js');

//***main-->
require('./simple-mapper/js/components/simple-mapper.js');

//***About-->

//Components-->
require('./about/js/components/about_home.js');

//***main-->
require('./simple-mapper/js/components/simple-mapper.js');
require('./about/js/components/about.js');
require('./main/main.js');

//Config-->
require('./main/config/config.js');


//Handlebars Helpers
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2  && arg1 != "") ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifEqualsNum', function(arg1, arg2, options) {
  arg1 = arg1 + 1;
  arg2 = arg2 + 1;
  return (arg1 == arg2  && arg1 != "") ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifShipmentID', function(key, options) {
  return (key == "SHIPMENT_ID") ? options.fn(this) : options.inverse(this);
});

config.gen();
