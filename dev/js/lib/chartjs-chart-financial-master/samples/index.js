requirejs.config({
    baseUrl: "../../../../js",
    paths: {
        chartjs: "lib/Chart",
        zoomPlugin: "lib/chartjs-plugin-zoom",
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        wreqr: "lib/backbone.wreqr",
        hammerjs: "lib/hammer.min",
        moment: "lib/moment.min"
    },

    shim: {
        chartjs: {
            deps: ["lib/moment-fix"]
        },

        zoomPlugin: {
            deps: ["chartjs", "hammerjs"]
        }
    }
});

define (function (require){
    "use strict";
    require("lib/chartjs-chart-financial-master/src/scale.financialLinear");
    require("lib/chartjs-chart-financial-master/src/scale.timeseries");
    require("lib/chartjs-chart-financial-master/src/element.candlestick");
    require("lib/chartjs-chart-financial-master/src/controller.financial");
    var Chart = require("chartjs");
    var ZoomPlugin = require("zoomPlugin");

    function randomNumber(min, max) {
    	return Math.random() * (max - min) + min;
    }

    function randomBar(date, lastClose) {
    	var open = randomNumber(lastClose * .95, lastClose * 1.05);
    	var close = randomNumber(open * .95, open * 1.05);
    	var high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
    	var low = randomNumber(Math.min(open, close) * .9, Math.min(open, close));
    	return {
    		t: date.valueOf(),
    		o: open,
    		h: high,
    		l: low,
    		c: close
    	};
    }
    var dateFormat = "MMMM DD YYYY";
    var date = moment("April 01 2017", dateFormat);
    var data = [randomBar(date, 30)];
    while (data.length < 60) {
    	date = date.add(1, "d");
    	if (date.isoWeekday() <= 5) {
    		data.push(randomBar(date, data[data.length - 1].c));
    	}
    }

    var ctx = document.getElementById("chart1").getContext("2d");
    ctx.canvas.width = 1000;
    ctx.canvas.height = 300;
    var myChart = new Chart(ctx, {
    	type: "financial",
    	data: {
    		datasets: [{
    			label: "NASDAQ: MSFT - Microsoft Corporation",
    			data: data
    		}]
    	},
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: "Apr 1, 2017",
                        max: "Apr 3, 2017"
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

                speed: 100

            }
        }

    });
    document.addEventListener("click", function () {
        myChart.scales["x-axis-0"].options.ticks.max = myChart.scales["x-axis-0"].getLabels()[10];
        myChart.update();
        console.log("jf");
        console.log(myChart.scales["x-axis-0"]);
    });


});
