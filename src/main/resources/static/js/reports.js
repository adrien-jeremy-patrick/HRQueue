(function () {


    window.onload = function (e) {

        //Performance Metrics Table

        $('#performanceTable').dataTable({

                "scrollY": "200px",
                "scrollCollapse": true,
                "scrollX": true,
                "ajax": {
                    "url": "/reports-cases",
                    "dataSrc": function (json) {


                        var return_data = new Array();


                        //Count the number of cases created and resolved
                        var total_number_of_cases_created = 0;
                        var total_number_of_cases_resolved = 0;

                        //Counters used to Calculate the Avg Customer Wait Time
                        var counter_case_not_assigned = 0;
                        var total_number_of_cases_assigned = 0;

                        //Sum of wait times used to calculate the Avg Customer Wait Time
                        var sum_of_total_wait_time_for_cases_assigned = 0;

                        //Total wait time used to calculate the avg Customer Wait Time
                        var total_wait_time_for_cases_not_assigned;
                        var total_wait_time_for_cases_Assigned;


                        //Average Customer Wait Time
                        var average_wait_time;
                        //Time Stamp for when user submits a case
                        var case_created_on;
                        //Time Stamp for when rep/admin assigns case to themselves
                        var date_case_assigned;
                        // The difference between date case assigned and case created on
                        var customer_wait_time;

                        //Using two different counters to count cases created per day and today
                        var cases_created_per_day = 0;
                        var cases_created_today = 0;


                        //Sum of resolve times used to calculate the Avg Case Resolve Time
                        var sum_resolve_time = 0;
                        //Total resolve times used to calculate the Avg Case Resolve Time
                        var total_resolve_time;
                        //Average Resolve Time for all cases resolved
                        var average_resolve_time;
                        //Time stamp for case resolved
                        var date_case_resolved;

                        //Using two different counters to count cases resolved per day and today
                        var cases_resolved_per_day = 0;
                        var cases_resolved_today = 0;

                        //Parsed averages for Google Charts API

                        var parsed_average_resolve_time;
                        var parsed_average_wait_time;

                        //No cases

                        if (json.length === 0) {

                            average_wait_time = 'N/A';
                            average_resolve_time = 'N/A';

                            total_number_of_cases_created = 0;
                            total_number_of_cases_resolved = 0;

                        } else {

                            //Loop through all cases stored in database
                            for (var i = 0; i < json.length; i++) {


                                //Case Assigned but not closed
                                if (json[i].case_open !== null && json[i].case_closed === null) {


                                    //Counting cases created and assigned
                                    total_number_of_cases_created++;
                                    total_number_of_cases_assigned++;


                                    //Avg wait time
                                    avgWaitTime();

                                    average_resolve_time = 'N/A';


                                    //Cases Created Per Day

                                    casesCreatedPerDay();

                                    //Cases Created Today

                                    casesCreatedToday()


                                    //Case assigned and closed
                                } else if (json[i].case_open !== null && json[i].case_closed !== null) {


                                    //count case created, assigned and resolved

                                    total_number_of_cases_created++;
                                    total_number_of_cases_assigned++;
                                    total_number_of_cases_resolved++;


                                    //Avg Wait Time

                                   avgWaitTime();


                                    //Cases Created Per Day

                                    casesCreatedPerDay();


                                    //Avg Resolve Time;

                                    date_case_resolved = json[i].case_closed;
                                    total_resolve_time = date_case_resolved - date_case_assigned;
                                    sum_resolve_time += total_resolve_time;
                                    average_resolve_time = Math.floor(sum_resolve_time / total_number_of_cases_resolved);
                                    parsed_average_resolve_time = sum_resolve_time / total_number_of_cases_resolved;
                                    average_resolve_time = hm(average_resolve_time);


                                    //Cases Resolved Per Day


                                    var todaysDate = new Date();

                                    timeline = todaysDate - json[0].created_at;
                                    days = (timeline / (1000 * 60 * 60 * 24));
                                    roundedDays = Math.round(days);


                                    if (roundedDays === 0) {

                                        cases_resolved_per_day = 0;

                                    } else {

                                        cases_resolved_per_day = total_number_of_cases_resolved / roundedDays;
                                        cases_resolved_per_day = Math.round(parseFloat(cases_resolved_per_day));

                                    }

                                    //Cases Created Today

                                    casesCreatedToday();

                                    //Cases Resolved Today

                                    if (moment(json[i].case_closed).format("MM/DD/YYYY") === today()) {

                                        cases_resolved_today++;


                                    }

                                    //Case created at, not assigned, and not resolved

                                } else if (json[i].case_open === null && json[i].case_closed === null) {

                                    //count cases created
                                    total_number_of_cases_created++;

                                    //Cases Created Per Day

                                    casesCreatedPerDay();

                                    //Cases Created Today

                                    casesCreatedToday();

                                }


                            }


                        }


                        function avgWaitTime(){

                            case_created_on = json[i].created_at;
                            date_case_assigned = json[i].case_open;
                            customer_wait_time = date_case_assigned - case_created_on;
                            sum_of_total_wait_time_for_cases_assigned += customer_wait_time;
                            total_wait_time_for_cases_Assigned = sum_of_total_wait_time_for_cases_assigned;

                            parsed_average_wait_time = total_wait_time_for_cases_Assigned / total_number_of_cases_assigned;
                        }

                        function casesCreatedToday(){
                            if (moment(json[i].created_at).format("MM/DD/YYYY") === today()) {

                                cases_created_today++;

                            }

                        }

                        function casesCreatedPerDay(){
                            var timeline;
                            var days;
                            var todaysDate = new Date();


                            timeline = todaysDate - json[0].created_at;
                            days = (timeline / (1000 * 60 * 60 * 24));
                            var roundedDays = Math.round(days);


                            if (roundedDays === 0) {

                                cases_created_per_day = 0;

                            } else {

                                cases_created_per_day = total_number_of_cases_created / roundedDays;

                                cases_created_per_day = Math.round(parseFloat(cases_created_per_day));

                            }
                        }

                        //Generating Bar Chart
                        google.charts.load('current', {'packages': ['bar']});
                        google.charts.setOnLoadCallback(timeMetrics);

                        function timeMetrics() {


                            //Remove chart if lacking average wait time information
                            if (parsed_average_wait_time === undefined) {
                                $('#BarCharts').remove();

                            } else {


                                //Redefining variables
                                if (total_wait_time_for_cases_not_assigned === undefined) {
                                    total_wait_time_for_cases_not_assigned = 0;
                                } else if (total_wait_time_for_cases_Assigned === undefined) {
                                    total_wait_time_for_cases_Assigned = 0;
                                }

                                var data = new google.visualization.arrayToDataTable([
                                    ['Time Metrics', 'Hours'],
                                    ["Avg. Customer Wait Time per Case", Math.floor(((total_wait_time_for_cases_Assigned + total_wait_time_for_cases_not_assigned) / (total_number_of_cases_assigned + counter_case_not_assigned)) / (1000 * 60 * 60))],
                                    ["Avg. Resolve Time per Case", parsed_average_resolve_time / (1000 * 60 * 60)]
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

                        //Generating Column table
                        google.charts.load('current', {packages: ['corechart', 'bar']});
                        google.charts.setOnLoadCallback(totalNumber);


                        function totalNumber() {

                            //Remove missing information

                            if (total_number_of_cases_created === 0) {
                                $('#chart_div').remove();
                            } else {

                                var data = new google.visualization.DataTable();
                                data.addColumn('string', '# Total');
                                data.addColumn('number', '#');

                                data.addRows([
                                    [{
                                        v: '# of Cases Created',
                                        f: 'Total Number of Cases Created'
                                    }, total_number_of_cases_created],
                                    [{
                                        v: '# of Cases Resolved',
                                        f: 'Total Number of Cases Resolved'
                                    }, total_number_of_cases_resolved],

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

                        //Generating Pie Charts for cases created

                        google.charts.load("current", {packages: ["corechart"]});
                        google.charts.setOnLoadCallback(chartCasesCreated);

                        function chartCasesCreated() {

                            //Remove chart when lacking cases information
                            if (cases_created_today === 0 && cases_created_per_day === 0 || cases_created_today === 0 || cases_created_per_day === 0) {
                                $('#donutchartCasesCreated').remove();

                            } else {
                                var data = google.visualization.arrayToDataTable([
                                    ['Cases Created', 'Cases today & per day'],
                                    ['# of Cases Created Today', cases_created_today],
                                    ['Avg. Cases Created Per Day', cases_created_per_day],
                                ]);

                                var options = {
                                    title: 'Cases Created Performance',
                                    pieHole: 0.4,
                                };
                            }

                            var chart = new google.visualization.PieChart(document.getElementById('donutchartCasesCreated'));
                            chart.draw(data, options);
                        }

                        //Generating Pie Charts for cases resolved

                        google.charts.load("current", {packages: ["corechart"]});
                        google.charts.setOnLoadCallback(chartCasesResolved);

                        function chartCasesResolved() {

                            //Remove charts edge cases
                            if (cases_resolved_today === 0 && cases_resolved_per_day === 0 || cases_resolved_today === 0 || cases_resolved_per_day === 0) {
                                $('#donutchartCasesResolved').remove();
                            } else {
                                var data = google.visualization.arrayToDataTable([
                                    ['Cases Resolved', 'Cases today & per day'],
                                    ['# of Cases Resolved Today', cases_resolved_today],
                                    ['Avg. Cases Resolved Per Day', cases_resolved_per_day],
                                ]);

                                var options = {
                                    title: 'Cases Resolved Performance',
                                    pieHole: 0.4,
                                };

                            }

                            var chart = new google.visualization.PieChart(document.getElementById('donutchartCasesResolved'));
                            chart.draw(data, options);
                        }


                        if (counter_case_not_assigned === 0 && total_number_of_cases_assigned === 0) {
                            average_wait_time = 'N/A';
                            average_resolve_time = 'N/A';
                        } else {

                            if (total_wait_time_for_cases_not_assigned === undefined) {
                                total_wait_time_for_cases_not_assigned = 0;
                            } else if (total_wait_time_for_cases_Assigned === undefined) {
                                total_wait_time_for_cases_Assigned = 0;
                            }
                            average_wait_time = hm((total_wait_time_for_cases_Assigned + total_wait_time_for_cases_not_assigned) / (total_number_of_cases_assigned + counter_case_not_assigned));
                        }


                        //Push data to DataTables
                        return_data.push({

                            'Sorting_Drop_Down': "All ",
                            'Avg_Customer_Wait_Time_per_Case': average_wait_time,
                            'Avg_Resolve_Time_per_Case': average_resolve_time,
                            'Cases_Created_Today': cases_created_today,
                            'Cases_Created_per_Day': cases_created_per_day,
                            'Cases_Resolved_Today': cases_resolved_today,
                            'Cases_Resolved_per_Day': cases_resolved_per_day,
                            'Total_#_of_Cases_Created': total_number_of_cases_created,
                            'Total_#_of_Cases_Resolved': total_number_of_cases_resolved


                        });

                        return return_data;
                    }


                },

                //Column layout
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


        //Cases Table
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

                    //Loop through all cases

                    for (var i = 0; i < json.length; i++) {

                        //Comments not included and Cases has neither been assigned, resolved

                        if (json[i].case_open === null && json[i].case_closed === null && json[i].customer_comment === "") {

                            customer_wait_time = "Case Not Assigned";

                            resolve_time = "N/A";

                            customer_comment = "No comments provided";

                            writer = "No Representative associated with this case";

                            date_created_at = formatDate(json[i].created_at);


                            //Comments are included, and cases have neither been assigned or resolved

                        } else if (json[i].case_open === null && json[i].case_closed === null && json[i].customer_comment !== "") {

                            customer_wait_time = "Case Not Assigned";

                            resolve_time = "N/A";

                            customer_comment = json[i].customer_comment;

                            writer = "No Representative associated with this case";

                            date_created_at = formatDate(json[i].created_at);


                            //Comments are not included, but case as been assigned... and under review
                        } else if (json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment === "") {

                            resolve_time = "Under Review";

                            date_created_at = json[i].created_at;

                            date_case_open = json[i].case_open;

                            customer_comment = "No comments provided";

                            writer = json[i].writer.username;

                            customer_wait_time = date_case_open - date_created_at;

                            date_created_at = formatDate(json[i].created_at);

                            customer_wait_time = hm(customer_wait_time);

                            //Customer comments provided and Case has been assigned, and under review

                        } else if (json[i].case_open !== null && json[i].case_closed === null && json[i].customer_comment !== "") {

                            resolve_time = "Under Review";

                            date_created_at = json[i].created_at;

                            date_case_open = json[i].case_open;

                            customer_comment = json[i].customer_comment;

                            writer = json[i].writer.username;

                            customer_wait_time = date_case_open - date_created_at;

                            date_created_at = formatDate(json[i].created_at);

                            customer_wait_time = hm(customer_wait_time);

                            //Comments provided, and case has been assigned and resolved

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

                            //Comments not included, and case has been assigned and reviewed

                        } else if (json[i].case_open !== null && json[i].case_closed !== null && json[i].customer_comment === "") {


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

                        //Pushing information to DataTables

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
                            'rep_admin_comments': json[i].id
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
                {
                    "data": "rep_admin_comments",
                    "render": function (data, type) {
                        //Providing Comment Links
                        var comments = 'comments';

                        if (type === 'display') {

                            data = '<a href="/case/' + data + '/comment">' + comments + '</a>';

                        }

                        return data;
                    }

                },
                {"data": "customer_wait_time"},
                {"data": "resolve_time"}

            ]
        });

        //Format time to hours and minutes

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

        //Get today's date

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

        //Format date: year, month, day

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
