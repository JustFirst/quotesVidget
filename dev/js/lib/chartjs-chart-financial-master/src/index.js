"use strict";

var Chart = require("chartjs");
Chart = typeof(Chart) === "function" ? Chart : window.Chart;

require("./element.candlestick.js")(Chart);
require("./scale.financialLinear.js")(Chart);
require("./scale.timeseries.js")(Chart);
require("./controller.financial.js")(Chart);
