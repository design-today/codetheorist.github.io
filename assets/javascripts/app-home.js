
  $(document).ready(function(){
      // $('body').css({'overflow':'hidden'});
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
