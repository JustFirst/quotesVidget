
requirejs.config({
    baseUrl: "js",
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

define(function (require){
    var InstrumentCollectionView = require("views/InstrumentCollectionView"),
        ChartInstane = require("views/chartView"),
        view = new InstrumentCollectionView();


    view.collection.checkRequest().then(function(data) {
        view.collection.updateData(data);
    });

    new ChartInstane();

    setInterval(function () {
        view.collection.checkRequest().then(function(data) {
            view.collection.updateData(data);
        });
    }.bind(view.collection),2000);
});
