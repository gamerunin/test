/**
 * Own Carousel Config
 */
$( document ).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        margin: 30,
        items: 3,
        responsiveClass: true,
        autoplay: true,
        autoPlayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                center: true,
                margin: 0,
            },
            768:{
                items: 2,
            },
            1000:{
                items: 3,
            }
        }
    })
});