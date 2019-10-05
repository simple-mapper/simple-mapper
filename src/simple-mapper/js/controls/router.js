// var root = null;
// var useHash = true; // Defaults to: false
// var hash = '#!'; // Defaults to: '#'
// var router = new Navigo(root, useHash, hash);
//
// router.on(function () {
//     // show home page here
//
//   }).resolve();

var appRouter = $.sammy(function() {

  this.get('', function() {

  });

  this.get('#/', function() {
    //your function
    //routeFunctions.test();

  });

  this.get('redirect.html', function() {
    var self = this;
    //your function
    //routeFunctions.test();

    window.location.href = "query3://redirect.html";

  });

});

appRouter.run();
