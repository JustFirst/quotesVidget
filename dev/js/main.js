
requirejs.config({
    baseUrl: "js",
    paths: {
        chartjs: "lib/Chart",
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        wreqr: "lib/backbone.wreqr"
    }
});

define(function (require){
    var InstrumentCollectionView = require("views/InstrumentCollectionView"),
        ChartInstane = require("views/chartView"),
        view = new InstrumentCollectionView();


    view.collection.checkRequest().then(function(data) {
        view.collection.updateData(data);
    });

    chart = new ChartInstane();

    setInterval(function () {
        view.collection.checkRequest().then(function(data) {
            view.collection.updateData(data);
        });
    }.bind(view.collection),2000);
});
