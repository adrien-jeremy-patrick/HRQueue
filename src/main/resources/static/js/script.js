(function(){
    "use strict";

    console.log("hello");
    // function for detecting if element is in view

    let video = $('.video');

    document.addEventListener('touchstart', function(event) {
        video.play();
    }, false);


    // This is the function for every element that needs to be faded in
    //when user scrolls into view. element is each element selector
    //and animation is the animate.css class in which we are going to add.
    //Each class needs to be given the classes: hidden and animated.


    function elementAnimation (elementToTarget, elementToFade, animation) {
        $(window).scroll(function () {
            const testDiv = elementToTarget[0];
            const testDivIndexZero = testDiv.getBoundingClientRect();
            const scrollPos = $(document).scrollTop();
            console.log(scrollPos);
            console.log(testDivIndexZero.top);
            if ((scrollPos) > (testDivIndexZero.top)) {
                elementToFade.animate({
                    'opacity': '1'
                }).addClass(animation);
            }
        })
    }

    elementAnimation($('.journey-one-header'), $('.journey-one-header'), 'fadeInRight');
    elementAnimation($('#myVideo'), $('.link-container'), 'fadeInUp');
    elementAnimation($('.roots'), $('.roots-paragraph'), 'fadeInUp');
    elementAnimation($('.lab-paragraph'), $('.lab-header'), 'fadeInRight');
    elementAnimation($('.lab-paragraph'), $('.lab-paragraph'), 'fadeInUp');
    elementAnimation($('.lab-paragraph-intro'), $('.lab-paragraph-intro'), 'fadeInUp');
    elementAnimation($('.project-1 h1'), $('.project-1'), 'fadeInLeft');
    elementAnimation($('.project-2 h1'), $('.project-2'), 'fadeInRight');
    elementAnimation($('.project-3 h1'), $('.project-3'), 'fadeInLeft');
    elementAnimation($('.project-4 h1'), $('.project-4'), 'fadeInRight');
    elementAnimation($('.video-container'), $('.video-header'), 'fadeInRight');
    elementAnimation($('.say-hi-container'), $('.video-p-container'), 'fadeInUp');
    elementAnimation($('.say-hi-p-container'), $('.say-hi-p-container'), 'fadeInRight');
    elementAnimation($('.say-hi-header'), $('.say-hi-header'), 'fadeInRight');







    // Not working right now




    // arrow scroll down animation

    function downArrowAnimation() {
        let arrowDownCounter = 0;
        let arrowInterval = setInterval(function(){
            arrowDownCounter ++;
            if (arrowDownCounter % 2 === 0) {
                $('.fa-arrow-down').animate({
                    opacity: 1,
                    bottom: '100px'
                }, 2000)
            }
            if (arrowDownCounter % 3 === 0) {
                $('.fa-arrow-down').animate({
                    opacity: 0,
                    bottom: '300px'
                }, 2000)
            }
        }, 500)
    }
    downArrowAnimation();



    // NAVBAR ICON/LINK EVENTS

    $('#journey-link').click(function(e) {
        e.preventDefault();
        $('.journey-one-header')[0].scrollIntoView();
    });
    $('#lab-link').click(function(e) {
        e.preventDefault();
        $('.lab-header')[0].scrollIntoView();
    });
    $('#watch-link').click(function(e) {
        e.preventDefault();
        $('.video-header')[0].scrollIntoView();
    });
    $('#say-hi-link').click(function(e) {
        e.preventDefault();
        $('.say-hi-header')[0].scrollIntoView();
    });


    //random color generator (out of 4 themed colors)

    function generateRandomColor() {
        let randNum = (Math.floor(Math.random() * 3));
        let colorsArray = ['#76bde5', '#c46362', '#fed532'];
        return colorsArray[randNum];
    }

    //NAVBAR hover animations


    $('a').mouseenter(function(){
        $(this).css({
            'background-color': generateRandomColor(),
            'z-index': '10'
        })
    }).mouseleave(function(){
        $(this).css({
            'background-color': 'white',
            'z-index': '5'
        })
    });

    //  tilt

    // $('.roots-picture').tilt({
    //     glare: true,
    //     maxGlare: .5
    //
    // });

    $('.link-container p').tilt({
        glare: true,
        maxGlare: .5,
        scale: 1.2
    });

    // $('.journey-one-header').tilt({
    //     glare: true,
    //     maxGlare: .5
    // });
    $('.skills-col-1').tilt({
        glare: true,
        maxGlare: .5,
        scale: 1.2
    });
    $('.skills-col-2').tilt({
        glare: true,
        maxGlare: .5,
        scale: 1.2
    });
    $('.skills-col-3').tilt({
        glare: true,
        maxGlare: .5,
        scale: 1.2
    });
})();