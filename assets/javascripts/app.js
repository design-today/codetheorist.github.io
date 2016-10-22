$(document).foundation();
$(window).resize(function() {
  setBannerSize();
})
$(window).ready(function() {
  setBannerSize();
})
function setBannerSize() {
  var wh = $(window).height();
  var ww = $(window).width();
  var tbh = $('#top-bar').height();
  var total_height = wh - (tbh * 3);
  // console.log(ww + 'x' + wh + '(\'' + total_height + '\')');
  $('#home-banner').css({'width': ww, 'height': total_height});
}
