(function(app){
  app.Cat = Backbone.Model.extend({
    defaults: {
      name: "unknown cat",
      image: "images/cat.jpg",
    },

    initialize: function() {
      this.set('count', 0);
    },
    increment: function() {
      this.set('count', this.get('count') + 1);
    }
  });

  app.CatCollection = Backbone.Collection.extend({
    model: app.Cat
  });
})(window);
