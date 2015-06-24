var App = new Mn.Application();


App.on('start', function() {
  var cats = new CatCollection([{name: "Fuzzy"}, {name: "Ash"}]);
  var catsView = new CatCollectionView({collection: cats});
  App.getRegion('main').show(catsView);
});


(function($){

  $(function(){
    App.addRegions({
      main: "#cats",
    });
    App.start();
  });
})(jQuery);
