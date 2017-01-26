/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
(function (global) {
    "use strict";
    
    var app = global.app || (global.app = {});
    var view = new app.InstrumentCollectionView();
    view.collection.getData();
    setInterval(view.collection.getData.bind(view.collection),2000);
})(this);