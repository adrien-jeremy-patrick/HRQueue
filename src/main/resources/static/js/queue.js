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


        //Calculating Estimated Queue Time

        $.getJSON('/reports-cases', {get_param: 'value'}, function (json) {





            var sum_of_customer_wait_time = 0;
            var sum_of_customer_cases_Resolve_times = 0;

            var total_number_of_Cases_assigned = 0;
            var total_number_of_cases_resolved = 0;

            var date_created_at;
            var date_case_open;
            var date_case_resolved;

            var customer_wait_time;
            var customer_resolve_time;

            var total_customer_wait_time;
            var total_resolve_wait_time;


                for (var i = 0; i < json.length; i++) {


                    //Case assigned but not resolved
                    if (json[i].case_open !== null && json[i].case_closed == null) {

                        //Total Wait TIme
                        totalCustomerWaitTime();


                        //Case assigned and resolved
                    } else if (json[i].case_open !== null && json[i].case_closed !== null) {

                        //Total Wait Time
                        totalCustomerWaitTime();

                        //Total Resolve Time
                        total_number_of_cases_resolved++;
                        date_case_open = json[i].case_open;
                        date_case_resolved = json[i].case_closed;
                        customer_resolve_time =date_case_resolved - date_case_open;
                        sum_of_customer_cases_Resolve_times += customer_resolve_time;
                        total_resolve_wait_time = sum_of_customer_cases_Resolve_times;





                    }

                }



                //Little Rules Formula

               var casesInQueue = (json.length - ( total_number_of_Cases_assigned));

                var meanRateOfArrival = (json.length)/(json[json.length-1].created_at - json[0].created_at);

                var meanWaitInQueue = casesInQueue/meanRateOfArrival;




                //Lq = mean rate of arrival * Q
                //mean number of customers in queue = mean rate of arrival * mean wait in Queues
                //Solving for Queue

            for (let i = 0; i < estTime.length; i++) {

                waitTime = hm((meanWaitInQueue + (meanWaitInQueue * i)));


                if(total_number_of_Cases_assigned === 0){
                    waitTime = 'N/A';
                    estTime[i].textContent = waitTime;
                }else {

                    console.log(waitTime);

                    estTime[i].textContent = waitTime + " h:mn";

                }
            }


            function totalCustomerWaitTime(){

                total_number_of_Cases_assigned++;

                date_created_at = json[i].created_at;
                date_case_open = json[i].case_open;

                customer_wait_time = date_case_open - date_created_at;
                sum_of_customer_wait_time += customer_wait_time;
                total_customer_wait_time = sum_of_customer_wait_time;


            }
        });




    };


    //Hours minutes format

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