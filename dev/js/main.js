
requirejs.config({
    baseUrl: "js",
    paths: {
        chartjs: "lib/Chart",
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
    }
});

define(["require","views/instrumentCollectionView"], function (require, InstrumentCollectionView){

    var view = new InstrumentCollectionView();

    view.collection.getData();
/*
    view.collection.checkRequest().then(function(data) {
        view.collection.updateData(data);
    });

    setInterval(function () {
        view.collection.checkRequest().then(function(data) {
            view.collection.updateData(data);
        });
    }.bind(view.collection),2000);
    */
});
