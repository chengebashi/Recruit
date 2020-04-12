'use strict'
$(document).ready(function () {
    /* calander picker */
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#daterangeadminux span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
    }

    $('#daterangeadminux').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    $('#daterangeadminux').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
            thisdp.addClass('active');
        }, 100);
    });
    $('#daterangeadminux').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

    });
    var path = '../../static/assets/img/background-part.png';
    $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../../static/assets/img/background-part.png" alt="" style="display:none"></div>')
    /* calander picker ends */

    /* calander picker */
    function cb(start, end) {
        $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
    }
    $('#daterangeadminux2').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
            thisdp.addClass('active');
        }, 100);
    });
    $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

    });

    /* calander picker ends */


    /* sales area chart */
    var barChartData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Students',
            backgroundColor: '#1c62ef',
            data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
            label: 'Male',
            backgroundColor: '#558eff',
            data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
            label: 'Female',
            backgroundColor: '#89b0ff',
            data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}]

    };

    var ctx = document.getElementById('barchart').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart - Stacked Area'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true,
                        fontColor: "#90b5ff",
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                    }],
                yAxes: [{
                    ticks: {
                        display: true,
                        fontColor: "#90b5ff",
                    },
                    display: true,
                    stacked: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                    }]
            }
        }
    });

    setInterval(function () {
        barChartData.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        window.myBar.update();
    }, 2100);

    /* sales area chart */
    var areachart = document.getElementById('mixedchartjs').getContext('2d');
    var gradient1 = areachart.createLinearGradient(0, 0, 0, 450);
    gradient1.addColorStop(0.0, '#90b5ff');
    gradient1.addColorStop(0.9, 'rgba(152, 187, 255, 0)');

    var gradient2 = areachart.createLinearGradient(0, 0, 0, 450);
    gradient2.addColorStop(0, '#5B92FF');
    gradient2.addColorStop(0.8, 'rgba(91, 146, 255, 0)');

    var configareachart = {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'My First dataset',
                borderWidth: '1',
                borderColor: 'rgba(144, 181, 255, 0)',
                backgroundColor: gradient1,
                data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }, {
                label: 'My Second dataset',
                borderWidth: '1',
                borderColor: 'rgba(91, 146, 255, 0)',
                backgroundColor: gradient2,
                data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart - Stacked Area'
            },
            tooltips: {
                mode: 'index',
            },
            hover: {
                mode: 'index'
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true,
                        fontColor: "#90b5ff",
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                    }],
                yAxes: [{
                    ticks: {
                        display: true,
                        fontColor: "#90b5ff",
                    },
                    display: true,
                    stacked: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                    }]
            }
        }
    };

    window.salesareachart = new Chart(areachart, configareachart);

    setInterval(function () {
        configareachart.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });

        });
        window.salesareachart.update();
    }, 2100);


    /* data Table */
    $('.datatable').DataTable({
        'responsive': true,
        'searching': false,
        "bLengthChange": false,
        "pageLength": 4,
        "columnDefs": [{
            "targets": 5,
            "orderable": false
        }]
    });
});
