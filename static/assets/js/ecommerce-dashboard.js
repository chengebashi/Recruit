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


    /* charttime */

    var ctx3 = document.getElementById('charttime').getContext('2d');
    var gradient4 = ctx3.createLinearGradient(0, 0, 0, 350);
    gradient4.addColorStop(0, '#5B92FF');
    gradient4.addColorStop(1, 'rgba(255,255,255,0.0)');
    var myLineChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: '',
                data: [59, 60, 71, 56, 55, 40, 65, 59, 60, 71, 56, 55, 40, 65],
                borderColor: "#5B92FF",
                backgroundColor: gradient4,
                borderDash: [],
                borderWidth: 2,
                borderDashOffset: 1,
                borderJoinStyle: 'miter',
                pointBorderColor: "#ffffff",
                pointBackgroundColor: "#00d8ff",
                pointBorderWidth: 1,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: "#000000",
                pointHoverBorderColor: "#ffffff",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 10,
                lineTension: 0
        }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: 'Chart.js  Line Chart',
            },
            legend: {
                display: false,
                labels: {
                    fontColor: "#ffffff"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "rgba(255,255,255,0.5)",
                        beginAtZero: true,
                    },
                    gridLines: {
                        color: "rgba(255,255,255,0.1)",
                        zeroLineColor: "rgba(255,255,255,0.15)"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "rgba(255,255,255,0.5)",
                    },
                    gridLines: {
                        color: "rgba(255,255,255,0.1)",
                        zeroLineColor: "rgba(255,255,255,0.15)"
                    }
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
    
    
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
						'rgba(255, 255, 255, 0.5)',
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
    /* summary box spark lines  */
    $("#summarysparklines2").sparkline([5, 6, 7, 2, 0, 5, 6, 7, 6, 7, 6, 5, 4, 5, 6, 7, 2, 0, 5, 6, 7, 6, 7, 6, 5, 4], {
        type: 'bar',
        height: '140',
        barWidth: 6,
        barColor: 'rgba(144, 181, 255, 0.71)'
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

});
