// Make input group labels equal length
function resetLength() {
  $('.input-group-label').each(function() {
    $(this).css({'width': '0'});
  });
}

function equalLengthLabels() {
  var label_max_width = 0;
  resetLength(function(){
    $('.input-group-label').each(function() {
      var label_width = $(this).width();
      if(label_width >= label_max_width) {
          label_max_width = label_width;
      }
    });
    $('.input-group-label').each(function() {
      $(this).css({'width': label_max_width + 20, 'padding': 0});
    });    
  });
}
equalLengthLabels();
$(window).resize(function() {
  equalLengthLabels();
});