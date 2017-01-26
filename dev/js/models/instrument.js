(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var Backbone = global.Backbone;

    app.InstrumentModel = Backbone.Model.extend({
        
        initialize: function(){
            this.listenTo(this, "change:r", this.countChange);
        },
        
        idAttribute: "s",
        
        defaults: {
            s: "None",
            r: 1,
            ch:"-"
        },
        
        countChange: function () {
            var rate = this.get("r");
            var firstRate = this.get("firstRate");
            var change = (firstRate - rate)/firstRate * -100;
            this.set("ch", change.toFixed(2));
        },
        
        firstRate:0,
    });
})(this);