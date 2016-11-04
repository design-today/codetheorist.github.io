$(window).resize(function() {

  // Set banner size on window resize
  setBannerSize();
  $(document).foundation('equalizer','reflow');
})

$(document).ready(function(){

  // Set banner size on document ready
  setBannerSize();

  // Init Typed.JS on homepage banner
  $("#typed-inner").typed({
    strings: ["<h1>CodeTheorist</h1>"],
    typeSpeed: 50,
    startDelay: 300,
    showCursor: false,
    callback: function() {
      $("#typed-inner-sub").typed({
        strings: ["<h3>Code</h3>", "<h3>Build</h3>", "<h3>Deploy</h3>","<h3>Code - Build - Deploy^1000</h3>"],
        typeSpeed: 5,
        startDelay: 300,
        // callback: function() {
        //   $('#typed-inner, #typed-inner-sub, .typed-cursor').fadeOut(250, '', true);
        //   $('#home-banner').slideUp(500, '', true);
        //   $('body').css({'overflow':'auto'});
        // }
      });
    }
  });
});

// Function to set banner size
function setBannerSize() {
  // Get window dimensions
  var wh = $(window).height();
  var ww = $(window).width();
  // Detect if top bar or title bar is displayed
  if($('#top-bar').is(':visible')) {
    // Set banner reduction amount to top-bar height
    var tbh = $('#top-bar').height();
    var total_height = (wh - tbh) - 75;
  } else {
    // Set banner reduction amount to top-bar height
    var tbh = $('#title-bar').height();
    var total_height = (wh - tbh) - 50;
  }
  // Set banner width & height
  $('#home-banner').css({'width': ww, 'height': total_height});
}
