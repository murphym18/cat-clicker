window.CountView = Backbone.View.extend({
  el: '#count',
  initialize: function() {
    this.listenTo(this.model, 'change:count', this.render);
  },
  render: function() {
    this.$el.html(this.model.get('count'));
  }
});
