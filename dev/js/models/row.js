(function (global) {
    "use strict";

    var app = global.app || (global.app = {});

    app.RowModel = Backbone.Model.extend({
        defaults: {
            s: "None",
            r: 1,
            sp:0.1
        }
    });
})(this);