(function(){
    "use strict";
    let konami = [84, 79, 66, 89, 73, 83, 66, 65, 67, 75],
        pressedKey,
        index = 0,
        started = false;

    //Below is the code that detects what key is being pressed.

    $(document).keyup(function(e){
        console.log(e.keyCode);

        //Here we are creating a reset function that is triggered when the array needs to be reset.

        function reset() {
            index = 0;
            started = false;
        }

        //Below is the function that initiates when all 10 keys have been pressed in the right order.

        let url = "https://giphy.com/gifs/michael-scott-KajpERDjOpMcw/fullscreen";
        function konamiComplete() {
            $(location).attr('href',url);
            console.log("worked");
        }

        //Next, we are going to declare a variable for the user's inputted number.

        pressedKey = e.keyCode;

        //conditionals to check whether or not the first key is the right key. If not then the array gets reset.

        if (pressedKey === 84) {
            started = true;
        }

        //Once the first key is pressed, we are good to continue with the array conditionals.

        if(started){
            if (konami[index] === pressedKey) {
                index++;
                if (index === 10) {
                    konamiComplete();
                    console.log('got it!');
                }
            } else {
                reset();
                console.log('Your code has been reset. Try again.');
            }
        } else if (!started) {
            reset();
        }
    });
})();