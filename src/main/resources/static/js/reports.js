$(document).ready( function () {

  $('#CasesTable').dataTable({

        "scrollY":        "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "ajax": {
            "url": "/reports-cases",
            "dataSrc": function ( json ) {
                var return_data = new Array();
                var date_created_at;
                var date_case_open;
                var date_case_closed;
                var resolve_time;
                var customer_wait_time;
                for(var i=0;i< json.length; i++){



                        if (json[i].case_open === null && json[i].case_closed === null) {

                            customer_wait_time = "Case Not Assigned";

                            resolve_time = "N/A";

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");


                        } else if(json[i].case_open !== null && json[i].case_closed === null){

                            resolve_time = "Under Review";

                            date_created_at = json[i].created_at;

                            date_case_open = json[i].case_open;

                            customer_wait_time = date_case_open - date_created_at;

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");

                            // customer_wait_time = new Date(customer_wait_time).toString().replace(/GMT.*/g,"");

                            customer_wait_time = dhm(customer_wait_time);


                        } else{

                            date_created_at = json[i].created_at;

                            date_case_open = json[i].case_open;

                            date_case_closed = json[i].case_closed;

                            customer_wait_time = date_case_open - date_created_at;

                            resolve_time = date_case_closed - date_case_open;

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");

                            customer_wait_time = new Date(customer_wait_time).toString().replace(/GMT.*/g,"");

                            resolve_time = new Date(resolve_time).toString().replace(/GMT.*/g,"");

                        }





                    return_data.push({

                        'case_closed' : json[i].case_closed,
                        'case_open' : json[i].case_open,

                        'created_at' : date_created_at,
                        'customer_name' : json[i].customer_name,
                        'user_id' : json[i].user_id,
                        'department_id' : json[i].department_id,
                        'category_id' : json[i].category_id,
                        'customer_comment' : json[i].customer_comment,
                        'customer_wait_time' : customer_wait_time,
                        'resolve_time' : resolve_time

                    })
                }
                return return_data;
            }

            },
        "sAjaxDataProp": "",
        "order": [[ 0, "asc" ]],
        "columns": [
            { "data": "created_at"},
            { "data": "customer_name" },
            { "data": "user_id" },
            { "data": "department_id" },
            { "data": "category_id" },
            { "data": "customer_comment" },
            { "data": "customer_wait_time" },
            { "data": "resolve_time" },

        ]
    });



    function dhm(t){
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }
        return [d, pad(h), pad(m)].join(':');
    }


});



