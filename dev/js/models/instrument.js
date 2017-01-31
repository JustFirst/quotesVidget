(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var Backbone = global.Backbone;

    app.InstrumentModel = Backbone.Model.extend({
        
        initialize: function(){
            this.on("change:r", this.countChange, this);
        },
        
        idAttribute: "s",
        
        defaults: {
            firstRate: 0,
            s: "None",
            r: 1,
            ch: 0
        },
        
        countChange: function () {
            var rate = this.get("r");
            var firstRate = this.get("firstRate");
            var change = (rate - firstRate)/firstRate * 100;
            this.set("ch", change);
        }
    });
})(this);