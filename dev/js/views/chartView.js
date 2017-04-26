define(function (require) {
    "use strict";
    var chartInstance;
    var $ = require("jquery"),
        Backbone = require("backbone"),
        Chart = require("chartjs"),
        Wreqr = require("wreqr"),
        instrumentChannel = Wreqr.radio.channel("instrument"),
        ChartView = Backbone.View.extend({
            el: $("#chart"),

            initialize: function () {
                var data =  instrumentChannel.reqres.request("exportInitialData");
                console.log(data);
                this.renderChart(data);
                instrumentChannel.vent.on("activeModelSetted", function (data) {this.updateChart(data);}.bind(this));
            },

            renderChart: function (data) {
                var labels = [],
                    values = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        labels.push(data[i].date);
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
                                    position: "bottom",
                                    ticks: {
                                        min: 1,
                                        max:10
                                    }
                                }]
                            }
                        }
                    });
                }
            },

            updateChart: function(data) {
                var labels = [],
                    values = [];
                for (var i = 0; i < data.length; i++) {
                    labels.push(data[i].date);
                    values.push(data[i].close);
                }
                chartInstance.chart.config.data.labels = labels;
                chartInstance.chart.config.data.datasets[0].data = values;
                chartInstance.update();
            }

        });
    return ChartView;
});
