$(document).ready(function () {

    $('#CasesTable').dataTable({

        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "ajax": {
            "url": "/reports-cases",
            "dataSrc": function (json) {
                var return_data = new Array();
                var date_created_at;
                var date_case_open;
                var date_case_closed;
                var resolve_time;
                var customer_wait_time;
                var customer_comment;
                var writer;


                for (var i = 0; i < json.length; i++) {




                    if (json[i].case_open === null && json[i].case_closed === null && json[i].customer_comment === "") {

                        customer_wait_time = "Case Not Assigned";

                        resolve_time = "N/A";

                        customer_comment = "No comments provided";

                        writer = "No Representative associated with this case";

                        date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g, "");



                    } else if (json[i].case_open === null && json[i].case_closed === null && json[i].customer_comment !== "") {

                        customer_wait_time = "Case Not Assigned";

                        resolve_time = "N/A";

                        customer_comment = "No comments provided";

                        writer = "No Representative associated with this case";

                        date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g, "");



                    }

                    else if (json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment === "") {

                        resolve_time = "Under Review";

                        date_created_at = json[i].created_at;

                        date_case_open = json[i].case_open;

                        customer_comment = "No comments provided";

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g, "");

                        customer_wait_time = dhm(customer_wait_time);


                    } else if(json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment !== ""){

                        resolve_time = "Under Review";

                        date_created_at = json[i].created_at;

                        date_case_open = json[i].case_open;

                        customer_comment = json[i].customer_comment;

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g, "");

                        customer_wait_time = dhm(customer_wait_time);
                    }
                    else if (json[i].case_open !== null && json[i].case_closed !== null && json[i].customer_comment !== "") {

                        date_created_at = json[i].created_at;

                        customer_comment = json[i].customer_comment;

                        date_case_open = json[i].case_open;

                        date_case_closed = json[i].case_closed;

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        resolve_time = date_case_closed - date_case_open;

                        date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g, "");

                        customer_wait_time = dhm(customer_wait_time);

                        resolve_time = dhm(resolve_time);


                    }


                    return_data.push({

                        'case_closed': json[i].case_closed,
                        'case_open': json[i].case_open,
                        'writer': writer,

                        'created_at': date_created_at,
                        'customer_name': json[i].customer_name,
                        'department': json[i].department.department,
                        'category': json[i].category.category,
                        'customer_comment': customer_comment,
                        'customer_wait_time': customer_wait_time,
                        'resolve_time': resolve_time

                    })
                }
                return return_data;
            }

        },
        "sAjaxDataProp": "",
        "order": [[0, "asc"]],
        "columns": [
            {"data": "created_at"},
            {"data": "customer_name"},
            {"data": "writer"},
            {"data": "department"},
            {"data": "category"},
            {"data": "customer_comment"},
            {"data": "customer_wait_time"},
            {"data": "resolve_time"},

        ]
    });

    $('#performanceTable').dataTable({

        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "ajax": {
            "url": "/reports-cases",
            "dataSrc": function (json) {



                var return_data = new Array();

                var dayCounter = 0;
                var twentyFourHoursinMilliseconds = '86400000';


                var total_Wait_Time = 0;
                var avg_Wait_Time;
                var date_case_open;
                var date_created_at;
                var customer_wait_time;

                var total_Resolve_Time = 0;
                var avg_resolve_Time;
                var date_case_close;
                var resolve_Time;
                var milliSeconds_Resolve_Time;

                var casesResolved = 0;


                for(var i = 0; i < json.length; i++){


                    //Ignore if case has not been assigned.

                    if(json[i].case_open !== null && json[i].case_closed === null) {

                        dayCounter++;


                        //Avg Wait Time

                        date_created_at = json[i].created_at;
                        date_case_open = json[i].case_open;

                        customer_wait_time = date_case_open - date_created_at;

                        total_Wait_Time += customer_wait_time;


                        avg_Wait_Time = total_Wait_Time/dayCounter;

                        avg_Wait_Time = dhm(avg_Wait_Time);




                    }else if(json[i].case_open !== null && json[i].case_closed !== null){


                        dayCounter++;

                        //Avg Wait Time


                        date_created_at = json[i].created_at;
                        date_case_open = json[i].case_open;

                        customer_wait_time = date_case_open - date_created_at;

                        total_Wait_Time += customer_wait_time;


                        avg_Wait_Time = total_Wait_Time/dayCounter;

                        avg_Wait_Time = dhm(avg_Wait_Time);

                        //Avg Resolve Time;

                        date_case_close = json[i].case_closed;

                        resolve_Time = date_case_close - date_case_open;

                        total_Resolve_Time += resolve_Time;

                        avg_resolve_Time = total_Resolve_Time/dayCounter;

                        milliSeconds_Resolve_Time = total_Resolve_Time/dayCounter;

                        avg_resolve_Time = dhm(avg_resolve_Time);

                        //Cases Resolved Per Day

                        if(milliSeconds_Resolve_Time <= twentyFourHoursinMilliseconds){

                            casesResolved++;

                        }


                    } else{


                        avg_Wait_Time = 'N/A';
                        avg_resolve_Time = 'N/A';
                        casesResolved = 0;


                    }



                }


                return_data.push({

                    'Sorting_Drop_Down': "All",
                    'Avg_Customer_Wait_Time_per_Case': avg_Wait_Time,
                    'Avg_Resolve_Time_per_Case': avg_resolve_Time,
                    'Cases_Resolved_per_Day': casesResolved,
                    'Cases_Created_Today': avg_Wait_Time,
                    'Total_#_of_Cases_Created': avg_Wait_Time,
                    'Total_#_of_Cases_Resolved': avg_Wait_Time

                });

                return return_data;
            }

        },
        "sAjaxDataProp": "",
        "order": [[0, "asc"]],
        "columns": [
            {"data": "Sorting_Drop_Down"},
            {"data": "Avg_Customer_Wait_Time_per_Case"},
            {"data": "Avg_Resolve_Time_per_Case"},
            {"data": "Cases_Resolved_per_Day"},
            {"data": "Cases_Created_Today"},
            {"data": "Total_#_of_Cases_Created"},
            {"data": "Total_#_of_Cases_Resolved"}


        ]
    });


    function dhm(t) {
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor((t - d * cd) / ch),
            m = Math.round((t - d * cd - h * ch) / 60000),
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


});



