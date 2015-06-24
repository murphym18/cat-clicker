window.CatView = Backbone.View.extend({
  el: '#cat',
  image: 'images/cat.jpg',
  style: 'center-block img-rounded',
  template: "<img src='<% print(image) %>' class='<% print(style) %>'  alt='cat'></img>",
  events: {
    "click": "increment",
  },

  initialize: function() {
    this.template = _.template(this.template);
  },

  render: function() {
    this.$el.html(this.template(this));
  },

  increment: function() {
    this.model.set('count', this.model.get('count') + 1)
  }
});
