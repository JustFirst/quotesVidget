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
            var data =  instrumentChannel.reqres.request("exportInitialData");
            this.renderChart(data);
            instrumentChannel.vent.on("activeModelSetted", function (data) {this.updateChart(data);}.bind(this));
        },

        renderChart: function (data) {
            var labels = [],
                values = [];
            if (data) {
                for (var i = 1700; i < data.length; i++) {
                    labels.push(Date.parse(data[i].date));
                    values.push(data[i].close);
                }
                chartInstance = new Chart(this.el, {
                    type: "line",

                    data: {
                        labels: labels,
                        datasets:[
                            {
                                data: values
                            }
                        ]
                    },

                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: Date.parse("2017.04.18 21:00"),
                                    max: Date.parse("2017.04.20 22:00"),
                                }
                            }]
                        },

                        pan: {
                            enabled: true,

                            mode: "x",

                            speed: 50

                        },

                        zoom: {
                            enabled : true,

                            mode: "x",

                            sensitivity: 1

                        }
                    }
                });
            }
        },

        updateChart: function(data) {
            var labels = [],
                values = [];
            for (var i = 1700; i < data.length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
            chartInstance.chart.config.data.labels = labels;
            chartInstance.chart.config.data.datasets[0].data = values;
            chartInstance.chart.config.options.scales.xAxes[0].ticks.min = Date.parse("2017.04.18 21:00");
            chartInstance.chart.config.options.scales.xAxes[0].ticks.max = Date.parse("2017.04.20 21:00");
            chartInstance.update();
            console.log(chartInstance);

        }
    });
    return ChartView;
});
