
define(function (require) {
    "use strict"
    var $ = require("jquery"),
        Backbone = require("backbone"),
        Chart = require("chartjs"),
        ChartVeiw = Backbone.View.extend({
            el: $("#chart"),

            initialize: function (data) {
                if (data)
                {
                    var chartInstance = new Chart(el, {
                        type: "line",

                        data:
                    });
                }
            },


        });
});
