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

    getCats: function() {
      return models;
    },

    select: function(id) {
      var index = -1;
      function updateSelected(cat, i) {
        cat.selected = String(id) === String(cat.id);
        index = cat.selected ? (i | 0) : index;
      }
      models.forEach(updateSelected);
      this.currentIndex = index | 0;
      this.updateViews();
    },

    getSelected: function() {
      return models[this.currentIndex | 0];
    },

    incrementSelected: function() {
      var i = this.currentIndex | 0;
      var count = models[i].count = models[i].count + 1;

      views.adminView.reset();
      return count;
    },

    updateCurrent(obj) {
      var cat = models[this.currentIndex | 0]
      for (var k in obj) {
        cat[k] = obj[k];
      }
      this.updateViews()


    },

    updateViews: function() {
      views.forEach(function(view){
        view.render();
      });
      views.adminView.reset();
    },

    showAdminView: function() {
      views.adminView.showAdminView();
    }
  };

  var views = (function(){
    var result = [
      new ListView(),
      new CatView()
    ];
    result.adminView = new AdminView();
    return result;

    function AdminView() {
      this.el = window.document.getElementById('admin')
      this.name = window.document.getElementById('cat-name');
      this.image = window.document.getElementById('cat-image');
      this.count = window.document.getElementById('cat-count');
      this.showButton = window.document.getElementById('adminbutton');
      this.saveButton = window.document.getElementById('saveButton');
      this.cancelButton = window.document.getElementById('cancelButton');
      this.adminForm = window.document.getElementById('adminform');
      console.log(this.adminForm)
      this.isVisible = false;

      this.showButton.addEventListener('click', (function(e){
        this.toggleVisibility();
      }).bind(this))
      this.saveButton.addEventListener('click', (function(e){
        this.save();
        e.preventDefault();
      }).bind(this))
      this.adminForm.addEventListener('submit', (function(e){
        this.save();
        e.preventDefault()
      }).bind(this))
      this.cancelButton.addEventListener('click', (function(e){
        this.isVisible = true;
        this.toggleVisibility();
        this.reset();

      }).bind(this))

      this.toggleVisibility = function() {
        var className = this.isVisible ? '' : 'active';
        this.isVisible = !this.isVisible;
        this.reset();
        this.el.setAttribute('class', className);
      }
      this.reset = function() {
        var cat = octopus.getSelected();
        this.name.value = (cat.name || "");
        this.image.value = (cat.image || "");
        this.count.value = (cat.count || 0);
      }
      this.save = function() {

        var obj = {}
        obj.name = this.name.value
        obj.image = this.image.value
        obj.count = this.count.value

        this.isVisible = true;
        this.toggleVisibility();
        octopus.updateCurrent(obj)
      }
    }

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
