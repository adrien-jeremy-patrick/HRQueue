

(function () {
    "use strict";
    

    
    // ----------------Overall View---------------------------//
    google.charts.load('current', {'packages': ['table']});
    google.charts.setOnLoadCallback(caseMetrics);


    function caseMetrics() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Average Time Per Case');
        data.addColumn('number', 'Cases per Day');
        data.addColumn('number', 'Cases Today');
        data.addRows([
            [45, 6, 3]
        ]);

        var table = new google.visualization.Table(document.getElementById('case_metrics'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    }

    // ----------------Cases---------------------------//

    google.charts.setOnLoadCallback(cases);

    function cases() {
        var data = new google.visualization.DataTable();

        
           
     
        

        data.addColumn('string', 'Customer Name');




        data.addRow(["John"]);


        var table = new google.visualization.Table(document.getElementById('cases'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    }


})();
