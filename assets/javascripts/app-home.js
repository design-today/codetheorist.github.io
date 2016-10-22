
  $(document).ready(function(){
      $("#typed-inner").typed({
        strings: ["<h1>CodeTheorist</h1>"],
        typeSpeed: 50,
        startDelay: 300,
        showCursor: false,
        callback: function() {
          $("#typed-inner-sub").typed({
            strings: ["<h3>Code</h3>", "<h3>Build</h3>", "<h3>Deploy</h3>","<h3>Code - Build - Deploy</h3>"],
            typeSpeed: 5,
            startDelay: 300,
          });
        }
      });
  });
