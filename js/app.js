var App = new Mn.Application();
App.update

App.on('start', function() {
  var cats = new CatCollection([
    {name: "Fuzzy", image: 'images/cat1.jpg'},
    {name: "Ash", image: 'images/cat2.jpg'},
    {name: "Kitty", image: 'images/cat3.jpg'},
    {name: "Chi Chi", image: 'images/cat4.jpg'},
    {name: "Whiskers", image: 'images/cat5.jpg'},
  ]);
  var firstCat = cats.at(0);
  cats.on('select', function(cat) {
    App.getRegion('main').show(new CatView({model: cat}));
  })
  var catsView = new CatCollectionView({collection: cats});
  App.getRegion('list').show(catsView);
  cats.trigger('select', firstCat);
});


(function($){

  $(function(){
    App.addRegions({
      list: "#list",
      main: "#main"
    });
    App.start();
  });
})(jQuery);
