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

  app.CatListItemView = Marionette.ItemView.extend({
    tagName: "button",
    className:"list-group-item ",
    template: false,
    events: {
      "click": "updateActive"
    },
    modelEvents: {
      "change": "onShow"
    },
    collectionEvents: {
      "pick:cat": "updateActive" // equivalent to view.listenTo(view.collection, "add", view.itemAdded, view)
    },
    initialize: function() {
      this.onIncrement = this.model.increment.bind(this.model);
      this.listenTo(this.model.collection, 'select', this.updateSelected, this);
    },
    onShow: function() {
      this.$el.attr('type', 'button');
      this.$el.text(this.model.get('name'));

    },
    updateSelected: function(cat) {
      if (this.model === cat) {
        this.$el.addClass('active');
      }
      else {
        this.$el.removeClass('active');
      }
    },
    updateActive: function(item) {
      this.model.collection.trigger("select", this.model);
    }
  });

  app.CatCollectionView = Marionette.CollectionView.extend({
    className: "list-group",
    tagName: "div",
    childView: app.CatListItemView
  });
})(window);
