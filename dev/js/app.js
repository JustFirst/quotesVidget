/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
(function (global) {
    "use strict";
    var app = global.app || (global.app = {});
    var quotes = new app.RowCollectionView();
    setInterval(quotes.collection.getData,2000);
})(this);