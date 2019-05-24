(function(){
    "use strict";

    console.log("main.js ready");


    //This is the logic for the mobile navbar-------

    //Detect whether or not user is scrolling up or down.
    //Icon shows when user is scrolling up.

    let menuIcon = $('.menu-icon');

    let lastScrollTop = 0;
    $(window).scroll(function(event){
        let st = $(this).scrollTop();
        if (st > lastScrollTop){
            // downscroll code

            $('.menu-icon').fadeOut();


        } else {
            // upscroll code

            $('.menu-icon').fadeIn();
        }
        lastScrollTop = st;
    });


    //When menu icon is clicked!


    $('.menu-icon').on('click', function(){

        $('.body-div').animate({
            opacity: .2,
            'background-color': 'red'
        }, 300);

        $(this).css({
            'display': 'none'
        });

        $('.x-icon').css({
           'display': 'inline-block'
        });


        $('.nav-div').animate({
            height: '85vh'
        }, 700);

        $('.extended-nav').fadeIn();


    });

    $('.x-icon').on('click', function(){

        $('.body-div').animate({
            opacity: 1
        }, 300);

        $(this).css({
            'display': 'none'
        });

        $('.menu-icon').css({
            'display': 'inline-block'
        });


        $('.nav-div').animate({
            height: '100px'
        }, 700);

        $('.extended-nav').fadeOut();
    });

//    Delete button confirm function

    $('.delete-button').on('click', function(){
        console.log("delete button clicked")
    })

//    About is show more function

    $('.show-more').on('click', function(){
        $(this).animate({
            opacity: 0
        }, 4000);
        $('.about-us-hidden-message').animate({
            opacity: 1
        }, 4000)
    })

    $('.show-less').on('click', function(){
        $('.about-us-hidden-message').animate({
            opacity: 0
        }, 4000);
        $('.show-more').animate({
            opacity: 1
        }, 4000)
    })
})();