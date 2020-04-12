 'use strict'
 $(document).ready(function () {

     /* checkbox select all */
     $('#selectall').on('click', function () {
         if ($(this).is(':checked') === true) {
             $('.checkbox-user-check').find('input[type="checkbox"]').attr('checked', true).parent().addClass('active');
         } else {
             $('.checkbox-user-check').find('input[type="checkbox"]').attr('checked', false).parent().removeClass('active');
         }
     });

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
     $('#circle-teal').circleProgress({
         value: 0.35,
         size: 80,
         startAngle: -Math.PI * .5,
         fill: {
             gradient: ["#17a2b8", "#40c9de"]
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
     /* summary box green circle */
     $('#circle-red').circleProgress({
         value: 0.10,
         size: 80,
         startAngle: -Math.PI * .5,
         fill: {
             gradient: ["#F85778", "#ff7591"]
         }
     });

     /* sales area chart */
     var areachart = document.getElementById('mixedchartjs').getContext('2d');

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
                    }, {
                 label: 'My Fourth dataset',
                 borderWidth: '2',
                 borderColor: '#FFBC47',
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
 });
