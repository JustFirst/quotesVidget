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
        beforeDraw: function (chart) {
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

        initialize: function () {
            this.renderChart();
            instrumentChannel.vent.on("activeModelSetted", function (data) {this.updateChartData(data);}.bind(this));
            instrumentChannel.vent.on("newData", function (actualModel) {this.addNewDataPoint(actualModel);}.bind(this));
            chartInstance.chart.ctx.canvas.addEventListener("mousedown", function (event) {
                chartInstance.chart.ctx.canvas.addEventListener("mousemove", this.yAxisAutoscale);
                event.preventDefault();
            }.bind(this));
            document.addEventListener("mouseup", function () {
                chartInstance.chart.ctx.canvas.removeEventListener("mousemove", this.yAxisAutoscale);
            }.bind(this));
            chartInstance.chart.ctx.canvas.addEventListener("wheel", this.yAxisAutoscale);
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
                    scale.options.ticks.stepSize = (scale.options.ticks.max-scale.options.ticks.min)/10;
                }
            });
            chartInstance.update();
        },

        renderChart: function () {
            var labels = [],
                values = [];
            chartInstance = new Chart(this.el, {
                type: "line",

                data: {
                    labels: labels,
                    datasets:[{
                        backgroundColor: "rgba(126, 152, 229, 0.6)",
                        borderColor: "rgba(126, 152, 229, 1.0)",
                        borderWidth: 2,
                        data: values,
                        lineTension: 0
                    }]
                },

                options: {
                    legend: {
                        display: false
                    },

                    chartArea: {
                        backgroundColor: "rgba(47, 48, 49, 1.0)"
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
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation:0,
                                callback: function (label) {
                                    return label.substring(label.indexOf(" "), label.length);
                                }
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

                        speed: 1000

                    },

                    zoom: {
                        enabled : true,

                        mode: "x",

                        sensitivity: 0.1

                    }
                }
            });
        },

        updateChartData: function(data) {
            var labels = [],
                values = [];
            for (var i = 0; i < data.length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = values;
            chartInstance.scales["x-axis-0"].options.ticks.min = chartInstance.data.labels.length > 50 ? chartInstance.data.labels[chartInstance.data.labels.length - 51] : chartInstance.data.labels[0];
            chartInstance.scales["x-axis-0"].options.ticks.max = chartInstance.data.labels[chartInstance.data.labels.length-1];
            chartInstance.update();
            this.yAxisAutoscale();
        },

        addNewDataPoint: function (actualModel) {
            chartInstance.data.labels.push(actualModel.get("date"));
            chartInstance.data.datasets[0].data.push(actualModel.get("r"));
            if (chartInstance.scales["x-axis-0"].options.ticks.max === chartInstance.data.labels[chartInstance.data.labels.length-2]) {
                chartInstance.scales["x-axis-0"].options.ticks.min = chartInstance.data.labels[chartInstance.data.labels.indexOf(chartInstance.scales["x-axis-0"].options.ticks.min)+1];
                chartInstance.scales["x-axis-0"].options.ticks.max = chartInstance.data.labels[chartInstance.data.labels.length-1];
                this.yAxisAutoscale();
            }
        }
    });
    return ChartView;
});
