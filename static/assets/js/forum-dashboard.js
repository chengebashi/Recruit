'use strict'
$(document).ready(function () {
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


    /* summary box green circle */
    $('#circle-blue').circleProgress({
        value: 0.45,
        size: 80,
        startAngle: -Math.PI * .5,
        fill: {
            gradient: ["#5B92FF", "#7faaff"]
        }
    });
    /* summary box green circle */
    $('#circle-yellow').circleProgress({
        value: 0.20,
        size: 80,
        startAngle: -Math.PI * .5,
        fill: {
            gradient: ["#FFBC47", "#ffcd75"]
        }
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
    
    /* jquery vectormap */
     $('#mapwrap').vectorMap({map: 'world_mill'});
});
