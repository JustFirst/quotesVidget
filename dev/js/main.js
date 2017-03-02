
requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
    }
});

define(["views/instrumentCollectionView"], function (InstrumentCollectionView){
    var view = new InstrumentCollectionView();
    view.collection.updateData(view.collection.checkData(view.collection.getData()));
    setInterval(function () {
        view.collection.updateData(this.checkData(this.getData()));
    }.bind(view.collection),2000);
});