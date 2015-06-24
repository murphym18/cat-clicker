(function($){
  var clickCounter = new Backbone.Model({ count: 0 });

  $(function(){
    var arg = {
      model: clickCounter
    };
    var catView = new CatView(arg);
    catView.render();

    var countView = new CountView(arg);
    countView.render();
  });
})(jQuery);
