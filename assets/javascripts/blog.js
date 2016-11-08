$('.blog-article').each(function() {
  var article_width = $(this).width();
  var max_image_height = (article_width / 16) * 8;
  $(this).find('img').css({'max-height': max_image_height, 'margin': '0 auto 1rem', 'display': 'block'});
});
$(window).resize(function() {
  equalHeight('.featured-article-title');
});
equalHeight('.featured-article-title');
