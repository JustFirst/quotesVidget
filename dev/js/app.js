/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
(function (global) {
    "use strict";
    
    
    function bind(func, context) {
      return function() {
        return func.apply(context, arguments);
      };
    };

    var app = global.app || (global.app = {});
    var view = new app.RowCollectionView();
    setInterval(bind(view.collection.getData, view.collection),2000);
})(this);