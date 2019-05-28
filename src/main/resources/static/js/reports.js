(function(){



    window.onload = function(e) {





    $('#performanceTable').dataTable({

        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "ajax": {
            "url": "/reports-cases",
            "dataSrc": function (json) {


                var return_data = new Array();

                var counterWaitNotClosed = 0;
                var counterWaitClosed = 0;
                var resolvedCounter = 0;

                var total_Wait_Time_Not_Closed = 0;
                var total_Wait_Time_Closed = 0;
                var wait_Time_Not_Closed;
                var wait_Time_Closed;
                var total_Avg_Combined_Wait_Time;



                var date_case_open;
                var date_created_at;
                var customer_wait_time;


                var total_Resolve_Time = 0;
                var avg_resolve_Time;
                var date_case_close;
                var resolve_Time;

                var casesResolvedPerDay = 0;
                var casesResolvedToday = 0;
                var casesCreatedPerDay = 0;
                var casesCreatedToday = 0;
                var totalNumberOfCasesCreated = 0;
                var totalNumberOfCasesResolved = 0;



                var parsedResolveTime;
                var parsedWaitTime;


                if (json.length === 0) {

                    total_Avg_Combined_Wait_Time = 'N/A';
                    avg_resolve_Time = 'N/A';



                     casesResolvedPerDay = 0;
                     casesCreatedPerDay = 0;

                     casesCreatedToday = 0;
                     casesResolvedToday = 0;

                     totalNumberOfCasesCreated = 0;
                     totalNumberOfCasesResolved = 0;

                } else {

                    for (var i = 0; i < json.length; i++) {



                        if (json[i].case_open !== null && json[i].case_closed === null) {


                            counterWaitNotClosed++;
                            totalNumberOfCasesCreated++;

                            //Avg Wait Time

                            //ONLY COUNTING THE AVG WAIT TIME Of the CASES That Have been RESOLVED!!

                            date_created_at = json[i].created_at;
                            date_case_open = json[i].case_open;
                            customer_wait_time = date_case_open - date_created_at;
                            total_Wait_Time_Not_Closed += customer_wait_time;
                            wait_Time_Not_Closed = total_Wait_Time_Not_Closed;


                            parsedWaitTime = wait_Time_Not_Closed/ counterWaitNotClosed;

                            // avg_Wait_Time_Not_Closed = total_Wait_Time / counterWaitNotClosed;
                            // avg_Wait_Time = hm(avg_Wait_Time);

                            avg_resolve_Time = 'N/A';


                            //Cases Created Per Day

                            var timeline;
                            var days;
                            var todaysDate = new Date();


                            timeline = todaysDate - json[0].created_at;
                            days = (timeline / (1000 * 60 * 60 * 24));
                            var roundedDays = Math.round(days);



                            if (roundedDays === 0) {

                                casesCreatedPerDay = 0;

                            } else {

                                casesCreatedPerDay = totalNumberOfCasesCreated / roundedDays;

                                casesCreatedPerDay = Math.round(parseFloat(casesCreatedPerDay));

                            }

                            //Cases Created Today

                            if (moment(json[i].created_at).format("MM/DD/YYYY") === today()) {

                                casesCreatedToday++;


                            }



                        } else if (json[i].case_open !== null && json[i].case_closed !== null) {


                            resolvedCounter++;
                            counterWaitClosed++;
                            totalNumberOfCasesResolved++;
                            totalNumberOfCasesCreated++;



                            //Avg Wait Time


                            date_created_at = json[i].created_at;
                            date_case_open = json[i].case_open;
                            customer_wait_time = date_case_open - date_created_at;
                            total_Wait_Time_Closed += customer_wait_time;

                            wait_Time_Closed = total_Wait_Time_Closed;

                            console.log("wait time2: " + wait_Time_Closed);

                            parsedWaitTime = wait_Time_Closed/ counterWaitClosed;


                            // avg_Wait_Time = Math.floor(total_Wait_Time / counterWaitClosed);
                            //
                            // avg_Wait_Time = hm(avg_Wait_Time);

                            //Cases Created Per Day


                             todaysDate = new Date();


                            timeline = todaysDate - json[0].created_at;
                            days = (timeline / (1000 * 60 * 60 * 24));
                             roundedDays = Math.round(days);


                            if (roundedDays === 0) {

                                casesCreatedPerDay = 0;

                            } else {

                                casesCreatedPerDay = totalNumberOfCasesCreated / roundedDays;
                                casesCreatedPerDay = Math.round(parseFloat(casesCreatedPerDay));

                            }


                            //Avg Resolve Time;


                            date_case_close = json[i].case_closed;
                            resolve_Time = date_case_close - date_case_open;
                            total_Resolve_Time += resolve_Time;
                            avg_resolve_Time = Math.floor(total_Resolve_Time / resolvedCounter);
                            parsedResolveTime = total_Resolve_Time/ resolvedCounter;
                            avg_resolve_Time = hm(avg_resolve_Time);



                            //Cases Resolved Per Day


                            var todaysDate = new Date();

                            timeline = todaysDate - json[0].created_at;
                            days = (timeline / (1000 * 60 * 60 * 24));
                             roundedDays = Math.round(days);


                            if (roundedDays === 0) {

                                casesResolvedPerDay = 0;

                            } else {

                                casesResolvedPerDay = totalNumberOfCasesResolved / roundedDays;
                                casesResolvedPerDay = Math.round(parseFloat(casesResolvedPerDay));

                            }

                            //Cases Created Today

                            if (moment(json[i].created_at).format("MM/DD/YYYY") === today()) {
                                casesCreatedToday++;


                            }

                            //Cases Resolved Today

                            if (moment(json[i].case_closed).format("MM/DD/YYYY") === today()) {

                                casesResolvedToday++;


                            }


                        } else if (json[i].case_open === null && json[i].case_closed === null) {

                            totalNumberOfCasesCreated++;

                            //Cases Created Per Day


                            todaysDate = new Date();


                            timeline = todaysDate - json[0].created_at;
                            days = (timeline / (1000 * 60 * 60 * 24));
                            roundedDays = Math.round(days);


                            if (roundedDays === 0) {

                                casesCreatedPerDay = 0;

                            } else {

                                casesCreatedPerDay = totalNumberOfCasesCreated / roundedDays;
                                casesCreatedPerDay = Math.round(parseFloat(casesCreatedPerDay));

                            }


                            //Cases Created Today

                            if (moment(json[i].created_at).format("MM/DD/YYYY") === today()) {
                                casesCreatedToday++;


                            }

                        }


                    }

                    console.log(counterWaitNotClosed);
                    console.log(counterWaitClosed);

                }


                google.charts.load('current', {'packages':['bar']});
                google.charts.setOnLoadCallback(timeMetrics);

                function timeMetrics() {


                    if(parsedWaitTime === undefined){
                        $('#BarCharts').remove();

                    }else {


                        if(wait_Time_Not_Closed === undefined){
                            wait_Time_Not_Closed = 0;
                        }else if(wait_Time_Closed === undefined){
                            wait_Time_Closed = 0;
                        }

                        var data = new google.visualization.arrayToDataTable([
                            ['Time Metrics', 'Hours'],
                            ["Avg. Customer Wait Time per Case", Math.floor(((wait_Time_Closed + wait_Time_Not_Closed)/(counterWaitClosed+counterWaitNotClosed)) / (1000 * 60 * 60))],
                            ["Avg. Resolve Time per Case", parsedResolveTime / (1000 * 60 * 60)]
                        ]);

                        var options = {
                            title: 'Time Metrics',
                            width: 900,
                            legend: {position: 'none'},
                            chart: {
                                title: 'Time Metrics',
                                subtitle: 'Performances by Time'
                            },
                            bars: 'horizontal', // Required for Material Bar Charts.
                            axes: {
                                x: {
                                    0: {side: 'top', label: 'Days:Hours:Minutes'} // Top x-axis.
                                }
                            },

                            bar: {groupWidth: "90%"}
                        };

                    }

                    var chart = new google.charts.Bar(document.getElementById('BarCharts'));
                    chart.draw(data, options);
                };

                google.charts.load('current', {packages: ['corechart', 'bar']});
                google.charts.setOnLoadCallback(totalNumber);

                function totalNumber() {



                    if(totalNumberOfCasesCreated === 0){
                        $('#chart_div').remove();
                    }else {

                        var data = new google.visualization.DataTable();
                        data.addColumn('string', '# Total');
                        data.addColumn('number', '#');

                        data.addRows([
                            [{v: '# of Cases Created', f: 'Total Number of Cases Created'}, totalNumberOfCasesCreated],
                            [{
                                v: '# of Cases Resolved',
                                f: 'Total Number of Cases Resolved'
                            }, totalNumberOfCasesResolved],

                        ]);

                        var options = {
                            title: 'Cases Created & Resolved',
                            hAxis: {
                                title: 'Cases Number Metrics',
                            },
                            vAxis: {
                                title: 'Number'
                            }
                        };

                    }

                    var chart = new google.visualization.ColumnChart(
                        document.getElementById('chart_div'));

                    chart.draw(data, options);
                }

                google.charts.load("current", {packages:["corechart"]});
                google.charts.setOnLoadCallback(chartCasesCreated);

                function chartCasesCreated() {

                    if(casesCreatedToday === 0 && casesCreatedPerDay === 0 || casesCreatedToday === 0 || casesCreatedPerDay === 0){
                        $('#donutchartCasesCreated').remove();

                    }else {
                        var data = google.visualization.arrayToDataTable([
                            ['Cases Created', 'Cases today & per day'],
                            ['# of Cases Created Today', casesCreatedToday],
                            ['Avg. Cases Created Per Day', casesCreatedPerDay],
                        ]);

                        var options = {
                            title: 'Cases Created Performance',
                            pieHole: 0.4,
                        };
                    }

                    var chart = new google.visualization.PieChart(document.getElementById('donutchartCasesCreated'));
                    chart.draw(data, options);
                }

                google.charts.load("current", {packages:["corechart"]});
                google.charts.setOnLoadCallback(chartCasesResolved);

                function chartCasesResolved() {

                    if(casesResolvedToday === 0 && casesResolvedPerDay === 0 || casesResolvedToday === 0 || casesResolvedPerDay === 0){
                        $('#donutchartCasesResolved').remove();
                    }else {
                        var data = google.visualization.arrayToDataTable([
                            ['Cases Resolved', 'Cases today & per day'],
                            ['# of Cases Resolved Today', casesResolvedToday],
                            ['Avg. Cases Resolved Per Day', casesResolvedPerDay],
                        ]);

                        var options = {
                            title: 'Cases Resolved Performance',
                            pieHole: 0.4,
                        };

                    }

                    var chart = new google.visualization.PieChart(document.getElementById('donutchartCasesResolved'));
                    chart.draw(data, options);
                }



                if (counterWaitNotClosed === 0 && counterWaitClosed === 0) {
                    total_Avg_Combined_Wait_Time = 'N/A';
                    avg_resolve_Time = 'N/A';
                }else{

                    if(wait_Time_Not_Closed === undefined){
                        wait_Time_Not_Closed = 0;
                    }else if(wait_Time_Closed === undefined){
                        wait_Time_Closed = 0;
                    }
                    total_Avg_Combined_Wait_Time = hm((wait_Time_Closed + wait_Time_Not_Closed)/(counterWaitClosed+counterWaitNotClosed));
                }





                return_data.push({

                    'Sorting_Drop_Down': "All ",
                    'Avg_Customer_Wait_Time_per_Case': total_Avg_Combined_Wait_Time,
                    'Avg_Resolve_Time_per_Case': avg_resolve_Time,
                    'Cases_Created_Today': casesCreatedToday,
                    'Cases_Created_per_Day': casesCreatedPerDay,
                    'Cases_Resolved_Today': casesResolvedToday,
                    'Cases_Resolved_per_Day': casesResolvedPerDay,
                    'Total_#_of_Cases_Created': totalNumberOfCasesCreated,
                    'Total_#_of_Cases_Resolved': totalNumberOfCasesResolved


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
            {"data": "Cases_Created_Today"},
            {"data": "Cases_Created_per_Day"},
            {"data": "Cases_Resolved_Today"},
            {"data": "Cases_Resolved_per_Day"},
            {"data": "Total_#_of_Cases_Created"},
            {"data": "Total_#_of_Cases_Resolved"}


        ]

    }


    );


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

                        date_created_at = formatDate(json[i].created_at);


                    } else if (json[i].case_open === null && json[i].case_closed === null && json[i].customer_comment !== "") {

                        customer_wait_time = "Case Not Assigned";

                        resolve_time = "N/A";


                        customer_comment = json[i].customer_comment;

                        writer = "No Representative associated with this case";

                        date_created_at = formatDate(json[i].created_at);


                    } else if (json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment === "") {

                        resolve_time = "Under Review";

                        date_created_at = json[i].created_at;

                        date_case_open = json[i].case_open;

                        customer_comment = "No comments provided";

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        date_created_at = formatDate(json[i].created_at);

                        customer_wait_time = hm(customer_wait_time);


                    } else if (json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment !== "") {

                        resolve_time = "Under Review";

                        date_created_at = json[i].created_at;

                        date_case_open = json[i].case_open;

                        customer_comment = json[i].customer_comment;

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        date_created_at = formatDate(json[i].created_at);

                        customer_wait_time = hm(customer_wait_time);

                    } else if (json[i].case_open !== null && json[i].case_closed !== null && json[i].customer_comment !== "") {

                        date_created_at = json[i].created_at;

                        customer_comment = json[i].customer_comment;

                        date_case_open = json[i].case_open;

                        date_case_closed = json[i].case_closed;

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        resolve_time = date_case_closed - date_case_open;

                        date_created_at = formatDate(json[i].created_at);

                        customer_wait_time = hm(customer_wait_time);

                        resolve_time = hm(resolve_time);


                    }else if(json[i].case_open !== null && json[i].case_closed !== null && json[i].customer_comment === ""){


                        date_created_at = json[i].created_at;

                        customer_comment = "No comments provided";

                        date_case_open = json[i].case_open;

                        date_case_closed = json[i].case_closed;

                        writer = json[i].writer.username;

                        customer_wait_time = date_case_open - date_created_at;

                        resolve_time = date_case_closed - date_case_open;

                        date_created_at = formatDate(json[i].created_at);

                        customer_wait_time = hm(customer_wait_time);

                        resolve_time = hm(resolve_time);

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
                        'resolve_time': resolve_time,

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
            {"data": "resolve_time"}

        ]
    });



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


    function today() {


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        return today;

    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
    }






};


})();
