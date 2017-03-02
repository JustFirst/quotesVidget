
requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
    }
});

define(["require","views/instrumentCollectionView"], function (require, InstrumentCollectionView){
    var $ = require("jquery");
    var view = new InstrumentCollectionView();
    $.when(view.collection.getData()).done(function (ajaxResult) {view.collection.updateData(ajaxResult)});
    setInterval(function () {
        $.when(view.collection.getData()).done(function (ajaxResult) {view.collection.updateData(ajaxResult)});
    }.bind(view.collection),2000);
});