$(document).ready( function () {

    var table = $('#CasesTable').DataTable({

        // "processing": true,
        // "serverSide": true,
        "ajax": {
            "url": "/reports-cases",
            "dataSrc": function ( json ) {
                var return_data = new Array();
                var date_created_at;
                var date_case_closed;
                var date_case_open;
                for(var i=0;i< json.length; i++){



                        if (json[i].case_open === null && json[i].case_closed === null) {

                            date_case_open = "Not Assigned";

                            date_case_closed = "N/A";

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");


                        } else if(json[i].case_open === null && json[i].case_closed !== null){

                            date_case_open = "Not Assigned";

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");

                            date_case_closed = new Date(json[i].case_closed).toString().replace(/GMT.*/g,"");

                        } else if(json[i].case_open !== null && json[i].case_closed === null){

                            date_case_closed = "Under Review";

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");

                            date_case_open = new Date(json[i].case_open).toString().replace(/GMT.*/g,"");

                        } else{

                            date_case_closed = new Date(json[i].case_closed).toString().replace(/GMT.*/g,"");

                            date_case_open = new Date(json[i].case_open).toString().replace(/GMT.*/g,"");

                            date_created_at = new Date(json[i].created_at).toString().replace(/GMT.*/g,"");
                        }





                    return_data.push({

                        'id' : json[i].id,
                        'case_closed' : date_case_closed,
                        'case_open' : date_case_open,
                        'created_at' : date_created_at,
                        'customer_comment' : json[i].customer_comment,
                        'customer_email' : json[i].customer_email,
                        'customer_name' : json[i].customer_name,
                        'customer_phone' : json[i].customer_phone
                    })
                }
                return return_data;
            }

            },
        "sAjaxDataProp": "",
        "order": [[ 0, "asc" ]],
        "columns": [
            { "data": "id"},
            { "data": "case_closed" },
            { "data": "case_open" },
            { "data": "created_at" },
            { "data": "customer_comment" },
            { "data": "customer_email" },
            { "data": "customer_name" },
            { "data": "customer_phone" },

        ]
    });


});



