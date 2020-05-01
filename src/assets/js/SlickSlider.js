 $(function ($) {
   $('.slick-container').slick({
     dots: false,
     infinite: true,
     speed: 3000,
     slidesToShow: 3,
     slidesToScroll: 1,
     autoplay: false,
     autoplaySpeed: 2000,
     responsive: [{
         breakpoint: 1024,
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
           infinite: false,
           dots: true,
         },
       },
       {
         breakpoint: 600,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
     ]
   });

 });
