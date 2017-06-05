define(function (require) {
    "use strict";
    var chartInstance;
    var $ = require("jquery"),
        Backbone = require("backbone"),
        Chart = require("chartjs"),
        ZoomPlugin = require("zoomPlugin"),
        Wreqr = require("wreqr"),
        instrumentChannel = Wreqr.radio.channel("instrument");
    var ChartView = Backbone.View.extend({
        el: $("#chart"),

        initialize: function () {
            this.renderChart();
            instrumentChannel.vent.on("activeModelSetted", function (data) {this.updateChartData(data);}.bind(this));
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
                            data: values,
                            lineTension: 0
                        }
                    ]
                },

                options: {
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
                                min: "2017.04.10 21:00",
                                max: "2017.04.20 22:00",
                            }
                        }]
                    },

                    pan: {
                        enabled: true,

                        mode: "x",

                        speed: 1

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
            for (var i = 1700; i < data.length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = values;
            chartInstance.update();
        }
    });
    return ChartView;
});
