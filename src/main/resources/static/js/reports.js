$(document).ready( function () {

    var table = $('#CasesTable').DataTable({

        "sAjaxSource": "/reports-cases",
        "sAjaxDataProp": "",
        "order": [[ 0, "asc" ]],
        "aoColumns": [
            { "mData": "id"},
            { "mData": "case_closed" },
            { "mData": "case_open" },
            { "mData": "created_at" },
            { "mData": "customer_comment" },
            { "mData": "customer_email" },
            { "mData": "customer_name" },
            { "mData": "customer_phone" },

        ]
    });





});



