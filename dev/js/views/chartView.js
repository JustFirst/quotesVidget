define(function (require) {
    "use strict";
    var chartInstance;
    var $ = require("jquery"),
        Backbone = require("backbone"),
        Chart = require("chartjs"),
        ZoomPlugin = require("zoomPlugin"),
        Wreqr = require("wreqr"),
        instrumentChannel = Wreqr.radio.channel("instrument");
    Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                var helpers = Chart.helpers;
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;

                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                ctx.restore();
            }
        }
    });
    var ChartView = Backbone.View.extend({
        el: $("#chart"),

        events: {
        },

        initialize: function () {
            this.renderChart();
            instrumentChannel.vent.on("activeModelSetted", function (data) {this.updateChartData(data);}.bind(this));
            chartInstance.chart.ctx.canvas.addEventListener("mousedown", function () {
                chartInstance.chart.ctx.canvas.addEventListener("mousemove", this.yAxisAutoscale);
            }.bind(this));
            document.addEventListener("mouseup", function () {
                chartInstance.chart.ctx.canvas.removeEventListener("mousemove", this.yAxisAutoscale);
            }.bind(this));
        },

        yAxisAutoscale: function () {
            var xScale;
            var valuesArray;
            var minValue;
            var maxValue;
            $.each(chartInstance.scales, function(id, scale) {
                if (scale.isHorizontal()) {
                    xScale = scale;
                    $.each(chartInstance.config.data.datasets, function (index, dataset) {
                        valuesArray = dataset.data.slice(chartInstance.config.data.labels.indexOf(xScale.min), chartInstance.config.data.labels.indexOf(xScale.max));
                    });
                }
                else {
                    if (valuesArray) {
                        minValue = +valuesArray[0];
                        maxValue = +valuesArray[0];
                        for (var i = 0; i < valuesArray.length; i++) {
                            valuesArray[i] = parseFloat(valuesArray[i]);
                            if (valuesArray[i] < minValue) {
                                minValue =  valuesArray[i];
                            }
                            if (valuesArray[i] > maxValue) {
                                maxValue = valuesArray[i];
                            }
                        }
                    }
                    scale.options.ticks.max = maxValue + maxValue/100;
                    scale.options.ticks.min = minValue - minValue/100;
                }
            });
            chartInstance.update();
        },

        renderChart: function (data) {
            var labels = [],
                values = [];
            if (data) {
                for (var i = 1700; i < data.length; i++) {
                    labels.push(data[i].date);
                    values.push(data[i].close);
                }
            }
            chartInstance = new Chart(this.el, {
                type: "line",

                data: {
                    labels: labels,
                    datasets:[
                        {
                            backgroundColor: "rgba(126, 152, 229, 0.6)",
                            borderColor: "rgba(126, 152, 229, 1.0)",
                            borderWidth: 1,
                            data: values,
                            lineTension: 0
                        }
                    ]
                },

                options: {
                    legend: {
                        display: false
                    },

                    chartArea: {
                        backgroundColor: "rgba(47, 48, 49, 1.0)",
                        top: 0
                    },

                    elements: {
                        point: {
                            radius: 0
                        }
                    },

                    tooltips: {
                        intersect: false,
                        position: "nearest",
                        x: 100,
                        y: 0
                    },

                    scales: {
                        xAxes: [{
                            ticks: {
                                //min: "2017.04.18 21:00",
                                //max: "2017.04.20 22:00",
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation:0
                            },

                            gridLines: {
                                color: "#909294"
                            },
                        }],

                        yAxes:[{
                            position: "right",

                            gridLines: {
                                color: "#909294"
                            },
                        }]
                    },

                    pan: {
                        enabled: true,

                        mode: "x",

                        speed: 10

                    },

                    zoom: {
                        enabled : true,

                        mode: "x",

                        sensitivity: 1

                    }
                }
            });
        },

        updateChartData: function(data) {
            var labels = [],
                values = [];
            for (var i = 0; i < 1000; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = values;
            chartInstance.update();
            this.yAxisAutoscale();
        }
    });
    return ChartView;
});
