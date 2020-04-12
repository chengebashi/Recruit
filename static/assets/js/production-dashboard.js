/*!
 * AdminuxPRO script v1.0.0 (https://www.maxartkiller.com/)
 * Copyright 2019-2019 The Maxartkiller Authors
 * Copyright 2019-2019 Maxartkiller.com
 * Licensed: You must have a valid license purchased only from maxartkiller.com in order to legally use the theme for your project.
 */
'use strict'
$(document).ready(function () {
    /* task dropdown action */
    $('#tasks a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

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



});


$(window).on('load', function () {

    /* line chart summary box */
    var configsummaryone = {
        type: 'line',
        data: {
            labels: ['July', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'transparent',
                borderColor: '#FFFFFF',
                borderWidth: '1.5',
                radius: 0,
                data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
                fill: false,
				}]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: false,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
					}],
                yAxes: [{
                    display: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
					}]
            }
        }
    };


    var ctxsummaryone = document.getElementById('summary-one').getContext('2d');
    window.myLineChart = new Chart(ctxsummaryone, configsummaryone);

    setInterval(function () {
        configsummaryone.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });

        });
        window.myLineChart.update();
    }, 1500);

    var ctxsummarytwo = document.getElementById('summary-two').getContext('2d');
    window.myLineChart2 = new Chart(ctxsummarytwo, configsummaryone);

    setInterval(function () {
        configsummaryone.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });

        });
        window.myLineChart2.update();
    }, 1100);



    /* sales area chart */
    var areachart = document.getElementById('mixedchartjs').getContext('2d');
    var gradient1 = areachart.createLinearGradient(0, 0, 0, 450);
    gradient1.addColorStop(0, '#90b5ff');
    gradient1.addColorStop(0.5, 'rgba(152, 187, 255, 0)');

    var gradient2 = areachart.createLinearGradient(0, 0, 0, 450);
    gradient2.addColorStop(0, '#5B92FF');
    gradient2.addColorStop(0.5, 'rgba(91, 146, 255, 0)');

    var configareachart = {
        type: 'line',
        data: {
            labels: ['0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
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
    }, 1100);


    /* dognut chart */
    var configsalesdoghnut = {
        type: 'doughnut',
        data: {

            datasets: [{
                data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
                backgroundColor: [
						'rgba(240, 240, 240, 0.5)',
						'#5B92FF',
						'#1FC96E',
						'#F85778',
					],
                label: 'Dataset 1'
				}],
            labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
        },
        options: {
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            cutoutPercentage: 80,
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };


    var salesdoghnutchart = document.getElementById('donughtchart').getContext('2d');
    window.salesDoughnutChart = new Chart(salesdoghnutchart, configsalesdoghnut);

    setInterval(function () {
        configsalesdoghnut.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });

        window.salesDoughnutChart.update();
    }, 1100);

    /* line chart large for quarter*/
    var configlinechartlarge = {
        type: 'line',
        data: {
            labels: ['0', 'Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'My First dataset',
                borderWidth: '2',
                borderColor: '#efe9e9',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
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
                        display: false,
                        fontColor: "#90b5ff",
                    },
                    display: false,
                    stacked: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                    }]
            }
        }
    };

    var ctxlinechartlarge = document.getElementById('linechartlarge').getContext('2d');
    window.myLineChartlarge = new Chart(ctxlinechartlarge, configlinechartlarge);

    setInterval(function () {
        configlinechartlarge.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });

        });
        window.myLineChartlarge.update();
    }, 1100);

    var barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: '#efe9e9',
            borderColor: '#efe9e9',
            borderWidth: 1,
            data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
            label: 'Dataset 2',
            backgroundColor: '#5B92FF',
            borderColor: '#5B92FF',
            borderWidth: 1,
            data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}]

    };


    var mybarchart = document.getElementById('barcharts').getContext('2d');
    mybarchart.height = 242;
    window.myBar = new Chart(mybarchart, {
        type: 'bar',
        data: barChartData,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false,
                position: 'top',
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true,
                        fontColor: "#90b5ff",
                    },
                    categoryPercentage: 0.3,
                    barPercentage: 1,
                    barThickness: 5,
                }],
                yAxes: [{
                    display: false
                }]
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart'
            }
        }
    });

    setInterval(function () {
        var zero = Math.random() < 0.2 ? true : false;
        barChartData.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return zero ? 1 : randomScalingFactor();
            });

        });
        window.myBar.update();
    }, 1100);


    /* summary box green circle */
    $('#circle-green').circleProgress({
        value: 0.75,
        size: 80,
        startAngle: -Math.PI * .5,
        fill: {
            gradient: ["#1FC96E", "#67e242"]
        }
    });

    /* summary box spark lines  */
    $("#summarysparklines").sparkline([5, 6, 7, 2, 0, 5, 6, 7, 6, 7, 6, 5, 4], {
        type: 'bar',
        height: '37',
        barWidth: 3,
        barColor: '#ffffff'
    });

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

    /* jquery vectormap */
    $('#mapwrap').vectorMap({
        map: 'world_mill'
    });

    /* toast message */
    $.toast({
        heading: 'Information',
        text: '<div class="row"><div class="col-auto"><i class="material-icons mr-2">info</i></div><div class="col pl-0">A creative, Usable template with multipurpose dashboards and compontents. Made with <i class="material-icons text-danger fs13">favorite</i> by maxartkiller.com</div></div>',
        loader: true,
        loaderBg: '#ffffff',
        bgColor: '#1FC96E',
        position: 'bottom-center',
    })

});
