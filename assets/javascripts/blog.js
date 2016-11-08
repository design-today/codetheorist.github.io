$('.blog-article').each(function() {
  var article_width = $(this).width();
  var max_image_height = (article_width / 16) * 8;
  $(this).find('img').css({'height': max_image_height, 'width': max_image_height, 'border-radius': max_image_height / 2, 'margin': '0 auto 1rem', 'display': 'block'});
});
$(window).resize(function() {
  equalHeight('.featured-article-title');
  equalHeight('.post-content');
});
equalHeight('.featured-article-title');
equalHeight('.post-content');
