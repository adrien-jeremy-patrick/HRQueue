(function () {
    "use strict";


    let waitTime;


    //Refreshes page every ten seconds-------------------->


    let estTime = $(".est-wait-time");


    setInterval(function () {
        location.reload();
        console.log("queue length: " + queueLength);
    }, 10000);


    window.onload = function (e) {


        $.getJSON('/reports-cases', {get_param: 'value'}, function (json) {



            var totalNotClosed = 0;
            var totalClosed = 0;

            var total_Avg_Wait_Time;

            var counterNotClosed = 0;
            var counterClosed = 0;

            var date_created_at;
            var date_case_open;
            var customer_wait_time;

            var inputClosed;
            var inputNotClosed;

                for (var i = 0; i < json.length; i++) {


                    if (json[i].case_open !== null && json[i].case_closed == null) {
                        counterNotClosed++;

                        date_created_at = json[i].created_at;
                        date_case_open = json[i].case_open;

                        customer_wait_time = date_case_open - date_created_at;
                        totalNotClosed += customer_wait_time;
                        inputNotClosed = totalNotClosed;


                    } else if (json[i].case_open !== null && json[i].case_closed !== null) {

                        counterClosed++;
                        date_created_at = json[i].created_at;
                        date_case_open = json[i].case_open;

                        customer_wait_time = date_case_open - date_created_at;
                        totalClosed += customer_wait_time;
                        inputClosed = totalClosed;


                    }

                }


                if(inputClosed === undefined){
                    inputClosed = 0;

                }else if(inputNotClosed === undefined){
                    inputNotClosed = 0;
                }


                total_Avg_Wait_Time =((inputClosed + inputNotClosed)/(counterClosed+counterNotClosed));
                console.log("Input Closed: " + inputClosed);
                console.log("Input not closed: " + inputNotClosed);
                console.log("total time: " + total_Avg_Wait_Time);



            for (let i = 0; i < estTime.length; i++) {
                console.log(estTime[i]);
                waitTime = dhm((total_Avg_Wait_Time + (total_Avg_Wait_Time * i)));

                if(counterNotClosed === 0 && counterClosed === 0){
                    waitTime = 'N/A';
                    estTime[i].textContent = waitTime;
                }else {

                    estTime[i].textContent = waitTime + " d:h:mn";

                }
            }
        });




    };


    function dhm(t) {
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor((t - d * cd) / ch),
            m = Math.floor((t - d * cd - h * ch) / 60000),

            pad = function (n) {
                return n < 10 ? '0' + n : n;
            };
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;


        }

        return [d, pad(h), pad(m)].join(':');
    }


    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

})();