$(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
      if (scroll > $(window).height()) {
        $(".navbar-fixed-top").css("background" , "rgba(41,72,255,0.8)");
      }

      else{
          $(".navbar-fixed-top").css("background" , "transparent");   
      }
  })
})

// $(document).ready(function(){       
//    var scroll_start = 0;
//    var startchange = $('#startchange');
//    var offset = startchange.offset();
//     if (startchange.length){
//    $(document).scroll(function() { 
//       scroll_start = $(this).scrollTop();
//       if(scroll_start > offset.top) {
//           $(".menu").css('background-color', '#f0f0f0');
//        } else {
//           $('.menu').css('background-color', 'transparent');
//        }
//    });
//     }
// });