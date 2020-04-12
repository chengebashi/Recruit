/* Dashboard chart combo line and bar */
bar();

function bar() {
    var color = Chart.helpers.color;
    var barChartData = {

        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            type: 'bar',
            maintainAspectRatio: false,
            backgroundColor: '#ff6e73',
            borderColor: '#ff6e73',
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
            type: 'line',
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: 'rgba(91, 146, 255, 0.18)',
            borderColor: '#5B92FF',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#ffc322',
            borderColor: '#ffc322',
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

    // Define a plugin to provide data labels

    var ctx = $("#mixchartfull");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: 'Chart.js Combo Bar Line Chart',

            },
            legend: {
                display: false,
                labels: {
                    fontColor: "#cccccc"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#bbbbbb",
                    },
                    gridLines: {
                        color: "rgba(0,0,0,0.05)",
                        zeroLineColor: "rgba(255,255,255,0.2)"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#bbbbbb"
                    },
                    gridLines: {
                        color: "rgba(0,0,0,0.05)",
                        zeroLineColor: "rgba(0,0,0,0.2)"
                    }
                }]
            }
        }
    });


    setInterval(function () {
        barChartData.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            })
        });
        window.myBar.update();
    }, 3000);


}



bubblechart();

function bubblechart() {

    var DEFAULT_DATASET_SIZE = 7;

    var addedCount2 = 0;
    var color2 = Chart.helpers.color;
    var bubbleChartData = {
        animation: {
            duration: 10000
        },
        datasets: [{
            label: "My First dataset",
            backgroundColor: '#5B92FF',
            borderColor: '#5B92FF',
            borderWidth: 1,
            data: [{
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }]
        }, {
            label: "My Second dataset",
            backgroundColor: '#ff6e73',
            borderColor: '#ff6e73',
            borderWidth: 1,
            data: [{
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }, {
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: Math.abs(randomScalingFactor()) / 5,
            }]
        }]
    };

    window.onload = function () {
        var ctx2 = document.getElementById("bubble").getContext("2d");
        window.myChart2 = new Chart(ctx2, {
            type: 'bubble',
            data: bubbleChartData,
            options: {
                responsive: true,
                title: {
                    display: false,
                    text: 'Chart.js Bubble Chart'
                },
                tooltips: {
                    mode: 'point'
                },
                legend: {
                    labels: {
                        fontColor: "#cccccc"
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "#bbbbbb",
                        },
                        gridLines: {
                            color: "rgba(160, 160, 160, 0.05)",
                            zeroLineColor: "rgba(160,160,160,0.2)"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "#bbbbbb"
                        },
                        gridLines: {
                            color: "rgba(160, 160, 160, 0.05)",
                            zeroLineColor: "rgba(160,160,160,0.2)"
                        }
                    }]
                }
            }
        });
    };


    setInterval(function () {
        bubbleChartData.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return {
                    x: randomScalingFactor(),
                    y: randomScalingFactor(),
                    r: Math.abs(randomScalingFactor()) / 5,
                };
            });
        });
        window.myChart2.update();
    }, 1800);


}


donutchart();

function donutchart() {
    var ctx3 = document.getElementById("donutchart-area").getContext("2d");
    window.myDoughnut = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    '#ff6e73',
                    '#ff7600',
                    '#ffc322',
                    '#0fddad',
                    '#5B92FF',
                ],
                label: 'Dataset 1',
                borderColor: "rgb(0, 0, 0, 0)",
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
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
    });

    setInterval(function () {
        myDoughnut.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        window.myDoughnut.update();
    }, 2000);


}

myRadarChart();

function myRadarChart() {
    var color = Chart.helpers.color;
    var ctx5 = document.getElementById("radar-area").getContext("2d");
    window.myRadarChart = new Chart(ctx5, {
        type: 'radar',
        data: {
            labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: '#ff6e73',
                borderColor: '#ff6e73',
                pointBackgroundColor: '#ff898d',
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
                label: "My Second dataset",
                backgroundColor: '#5B92FF',
                borderColor: '#5B92FF',
                pointBackgroundColor: '#8bb2ff',
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
                label: "My Third dataset",
                backgroundColor: '#ffc322',
                borderColor: '#ffc322',
                pointBackgroundColor: '#ffd461',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }, ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Radar Chart'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                pointLabels: {
                    fontColor: '#a1c1ff',
                }
            },
        }
    });

    setInterval(function () {
        myRadarChart.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        window.myRadarChart.update();
    }, 2000);


}
myPolarChart();

function myPolarChart() {
    var chartColors = window.chartColors;
    var color = Chart.helpers.color;
    var ctx6 = document.getElementById("polar-area");
    window.mypolarChart = new Chart.PolarArea(ctx6, {
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    '#ff6e73',
                    '#ff7600',
                    '#ffc322',
                    '#0fddad',
                    '#5B92FF',
                ],
                borderColor: "rgb(0, 0, 0, 0)",
                label: 'My dataset' // for legend
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: false,
                text: 'Chart.js Polar Area Chart'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
        }
    });

    setInterval(function () {
        mypolarChart.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        window.mypolarChart.update();
    }, 2000);

}
myPeChart();

function myPeChart() {
    var chartColors = window.chartColors;
    var color = Chart.helpers.color;
    var ctx6 = document.getElementById("pie-area");
    window.mypieChart = new Chart(ctx6, {
        type: 'pie',
        data: {

            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    '#ff6e73',
                    '#ff7600',
                    '#ffc322',
                    '#0fddad',
                    '#5B92FF',
                ],
                label: 'Dataset 1',
                borderColor: "rgb(0, 0, 0, 0)",
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
            }
        }
    });

    setInterval(function () {
        mypieChart.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        window.mypieChart.update();
    }, 2000);

}



/* sales area chart */
var areachart = document.getElementById('mixedchartjs2').getContext('2d');

var configareachart = {
    type: 'line',
    data: {
        labels: ['0', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'My First dataset',
            borderWidth: '2',
            borderColor: '#5B92FF',
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
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }, {
            label: 'My Second dataset',
            borderWidth: '2',
            borderColor: '#F85778',
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
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }, {
            label: 'My Third dataset',
            borderWidth: '2',
            borderColor: '#1FC96E',
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
