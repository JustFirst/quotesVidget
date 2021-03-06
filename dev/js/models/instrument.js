define(function (require) {
    "use strict";
    var $ = require("jquery"),
        Backbone = require("backbone"),
        InstrumentModel = Backbone.Model.extend({

            initialize: function(){
                //this.on("change:r", this.countChange, this);
                //this.chart();
            },

            idAttribute: "s",

            defaults: {
                s: "None",
                r: 1,
                ch: 0,
                prevCh: 0,
                date: ""
            },

            countChange: function () {
                var rate = this.get("r");
                var firstRate = this.get("firstRate");
                var change = (rate - firstRate)/firstRate * 100;
                this.set("ch", change);
            }

        });
    return InstrumentModel;
});
