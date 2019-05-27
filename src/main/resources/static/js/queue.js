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


            var avg_Wait_Time;
            var counter = 0;
            var total_Wait_Time = 0;

            var date_created_at;
            var date_case_open;
            var customer_wait_time;

            if (json.length === 0) {

                avg_Wait_Time = 'N/A';

            } else {

                for (var i = 0; i < json.length; i++) {


                    if (json[i].case_open !== null && json[i].case_closed !== null) {
                        counter++;

                        date_created_at = json[i].created_at;
                        date_case_open = json[i].case_open;
                        customer_wait_time = date_case_open - date_created_at;
                        total_Wait_Time += customer_wait_time;
                        avg_Wait_Time = Math.floor(total_Wait_Time / counter);

                        // avg_Wait_Time = dhm(avg_Wait_Time);

                    } else if (json[i].case_open === null && json[i].case_closed === null) {


                    }

                }
            }

            for (let i = 0; i < estTime.length; i++) {
                console.log(estTime[i]);
                waitTime = (avg_Wait_Time+ (avg_Wait_Time * i));

                estTime[i].textContent = dhm(waitTime) + " d:h:mn";
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


})();