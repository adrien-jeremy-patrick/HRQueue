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


                // total_Avg_Wait_Time =((inputClosed + inputNotClosed)/(counterClosed+counterNotClosed));

                //Little Rules Formula


               var casesInQueue = json.length - (counterClosed + counterNotClosed);

                // console.log('cases in queue ' + casesInQueue);
                //
                // console.log("last" + json[json.length-1].customer_name);

                var meanRateOfArrival = json.length/(json[json.length-1].created_at - json[0].created_at);

                var meanWaitInQueue = casesInQueue/meanRateOfArrival;


                console.log('mean wait in queue ' + hm(meanWaitInQueue));


                //Lq = mean rate of arrival * Q
                //mean number of customers in queue = mean rate of arrival * mean wait in Queues
                //Solving for Queue

            for (let i = 0; i < estTime.length; i++) {
                // console.log(estTime[i]);
                waitTime = hm((meanWaitInQueue + (meanWaitInQueue * i)));


                if(counterNotClosed === 0 && counterClosed === 0){
                    waitTime = 'N/A';
                    estTime[i].textContent = waitTime;
                }else {

                    estTime[i].textContent = waitTime + " h:mn";

                }
            }
        });




    };


    function hm(t) {
            var ch = 60 * 60 * 1000,
            h = Math.floor((t) / ch),
            m = Math.floor((t - h * ch) / 60000),

            pad = function (n) {
                return n < 10 ? '0' + n : n;
            };
        if (m === 60) {
            h++;
            m = 0;
        }


        return [h, pad(m)].join(':');
    }


})();