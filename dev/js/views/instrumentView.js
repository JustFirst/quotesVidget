define(function (require) {
    "use strict";
    var $ = require("jquery"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        Wreqr = require("wreqr"),
        instrumentChannel = Wreqr.radio.channel("instrument"),
        InstrumentView;


    InstrumentView = Backbone.View.extend({

        tagName: "div",

        className: "row",

        template: _.template($("#row-template").html(), {variable:"instrument"}),

        events: {
            "click": "exportHistory"
        },

        initialize: function () {
            this.listenTo(this.model, "change:r", this.refreshRate);
            this.listenTo(this.model, "change:ch", this.refreshChange);
        },

        refreshRate: function () {
            if (String(this.model.get("r")).length > 7) {
                if (String(this.model.get("r")).indexOf(".") === 6) {
                    this.$(".rate").html(String(this.model.get("r")).substring(0, String(this.model.get("r")).indexOf(".")));
                }
                else {
                    this.$(".rate").html(String(this.model.get("r")).substring(0, 7));
                }
            }
            else {
                this.$(".rate").html(this.model.get("r"));
            }
        },

        refreshChange: function () {
            this.$(".change").html(this.model.get("ch").toFixed(2));
        },

        render: function () {
            this.$el.append(this.template(this.model.toJSON()), {variable:"instrument"});
            return this;
        },

        exportHistory: function () {
            this.$el.addClass("active");
            instrumentChannel.vent.trigger("active", this.model.id);
        }
    });
    return InstrumentView;
});
