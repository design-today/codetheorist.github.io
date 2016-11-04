(function($){
  function injector(t, splitter, klass, after) {
    var text = t.text(), 
    a = text.split(splitter), 
    inject = '';
    if (a.length) {
      $(a).each(function(i, item) {
        inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
      });
      t.attr('aria-label',text)
      .empty()
      .append(inject)

    }
  }

  var methods = {

    init: function() {
      return this.each(function() {
        injector($(this), '', 'char', '');
      });
    },

  };

  $.fn.lettering = function( method ) {
    if ( method && methods[method] ) {
      return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
    } else if ( method === 'letters' || ! method ) {
      return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
    return this;
  };

})(jQuery);

function filter(tag) {
  setActiveTag(tag);
  showContainer(tag);
  var page_title = document.getElementById('page-title');
  page_title.innerHTML = tag + ' Category';
  $('#page-title').lettering();
  var chars = $('#page-title span').length;
  console.log(chars);

  // for(var i=chars; i > 0; i--) {
  //   setTimeout(function() {
  //     console.log(i);
  //     $('#page-title span.char' + i).remove();
  //   }, 400);
  // }

  // $(page_title).css({'visibility':'hidden'});
  // var title = $('#page-title').text();
  // $("#page-title").typed({
  //   strings: [page_title],
  //   typeSpeed: 50,
  //   startDelay: 300,
  //   showCursor: false,
  // });
}

function setActiveTag(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('blog-tag-item');
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'blog-tag-item');
  }

  // set the selected tag's item to active
  var item = document.getElementById(tag + '-item');
  if(item) {
    item.setAttribute('class', 'blog-tag-item active');
  }
}

function showContainer(tag) {
  // loop through all lists and hide them
  var lists = document.getElementsByClassName('blog-article');
  for(var i=0; i < lists.length; i++) {
    if (lists[i].classList.contains(tag + '-tag')) {
      lists[i].classList.remove('hidden');
    } else {
      lists[i].classList.add('hidden');
    }
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-container');
  if(list) {
    list.setAttribute('class', 'blog-list-container');
  }
  // Change URL with browser address bar using the HTML5 History API.
  if (history.pushState) {
    // Parameters: data, page title, URL
    history.pushState(null, null, '#' + tag);
  }
  // Fallback for non-supported browsers.
  else {
    window.location.hash = '#' + tag;
  }
}

if(window.location.hash) {
  var tag = window.location.hash.split('#')[1];
  filter(tag);
}
