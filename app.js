$(function(){
  var models = (function(seq) {
    return [
      new Cat("Fuzzy", 'images/cat1.jpg'),
      new Cat("Ash", 'images/cat2.jpg'),
      new Cat("Kitty", 'images/cat3.jpg'),
      new Cat("Chi Chi", 'images/cat4.jpg'),
      new Cat("Whiskers", 'images/cat5.jpg')
    ];

    function Cat(name, image, selected, count) {
      this.id = new String(seq++);
      this.name = name;
      this.image = image;
      this.selected = Boolean(selected);
      this.count = (count || 0);
    }
  })(0)


  var octopus = {
    start: function() {
      this.select(Math.floor(Math.random() * models.length));
    },
    copyCat: function(cat) {
      return JSON.parse(JSON.stringify(cat));
    },

    getCats: function() {
      return models.map(this.copyCat);
    },

    select: function(id) {
      function updateSelected(cat) {
        cat.selected = String(id) === String(cat.id);
      }
      models.forEach(updateSelected);
      this.updateViews();
    },

    findSelectedIndex: function() {
      return models.map(function(cat) { return cat.selected; }).indexOf(true);
    },

    getSelected: function() {
      return this.copyCat(models[this.findSelectedIndex()]);
    },

    incrementSelected: function() {
      var i = this.findSelectedIndex();
      var count = models[i].count = models[i].count + 1;
      return count;
    },

    updateViews: function() {
      views.forEach(function(view){
        view.render();
      });
    }
  };

  var views = (function(){
    return [
      new ListView(),
      new CatView()
    ];

    function ListView() {
      this.$el = $('#list');

      this.$el[0].addEventListener('click', function(event) {
        if (event.target.nodeName === 'A') {
          octopus.select(event.target.id);
          event.preventDefault();
        }
      });

      this.render = function() {
        var htmlStr = octopus.getCats().map(listItemHtml).reduce(sum, "");
        this.$el.html('<ul>'+htmlStr+'</ul>');
      };

      function listItemHtml(cat) {
        var style = (cat.selected ? 'active' : '');
        var a = '<a href="#" id="'+cat.id+'" class="'+style+'">'+cat.name+'</a>';
        var li = '<li>'+a+'</li>';
        return li;
      }

      function sum(pre, cur) { return pre + cur; }
    };

    function CatView() {
      this.$el = $('#cat');
      this.cache = {};
      this.$el[0].addEventListener('click', function(event) {
        if (event.target.nodeName == 'IMG') {
          var count = octopus.incrementSelected();
          this.$el.find('.count').text(String(count));
        }
      }.bind(this), true);
      this.getImage = function(srcUrl) {
        var image = this.cache[srcUrl];
        if (image) {
          return image;
        }
        image = this.cache[srcUrl] = new Image();
        image.src = srcUrl;
        return image;
      }
      this.render = function() {
        var cat = octopus.getSelected();
        var name = '<h2>'+cat.name+'</h2>';
        var img = '<div class="image"><img src="'+cat.image+'"></img></div>';
        var count = '<div class="count">'+new String(cat.count)+'</div>';
        this.$el.html(name+img+count);
      };
    };
  })();

  octopus.start();

});
