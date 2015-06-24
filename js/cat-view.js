(function(app){
  app.CatView = Marionette.ItemView.extend({
    template: "#cat-template",
    triggers: {
      "click img": "increment"
    },
    modelEvents: {
      "change": "onShow"
    },
    initialize: function() {
      this.onIncrement = this.model.increment.bind(this.model);
    },
    onShow: function() {
      this.$('.count').text(this.model.get('count'));
      this.$('h4').text(this.model.get('name'));
    },

  });

  app.CatCollectionView = Marionette.CollectionView.extend({
    childView: CatView
  });
})(window);
