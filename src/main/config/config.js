var __dirname = '/'

window.onload = function() {

  const urlParams = new URLSearchParams(window.location.search);
  const myParams = urlParams.get('simple');

  if(!myParams){
    about.gen();
  }
  else {
    simple_mapper.gen();
  }

};

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
