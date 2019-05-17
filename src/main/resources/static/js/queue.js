(function(){
    "use strict";

    console.log("queue.js is ready");


    //Refreshes page every ten seconds-------------------->


    let estTime = $(".est-wait-time");
    let waitTime;

    setInterval(function() {
        location.reload();
        console.log("queue length: " + queueLength);
        },10000);


    window.onload = function(e) {
        for (let i = 0; i < estTime.length; i++) {
            console.log(estTime[i]);
            waitTime = (2 + (4 * i));

            estTime[i].textContent = waitTime + " minutes";
        }
    };


})();