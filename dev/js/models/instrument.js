(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var Backbone = global.Backbone;

    app.InstrumentModel = Backbone.Model.extend({
        
        idAttribute: "s",
        
        defaults: {
            s: "None",
            r: 1,
            sp:0.1
        }
    });
})(this);