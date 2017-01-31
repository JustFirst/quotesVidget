(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$;
    var _ = global._;
    var Backbone = global.Backbone;

    app.InstrumentView = Backbone.View.extend({

        tagName: "div",

        className: "row",

        template: _.template($("#row-template").html(), {variable:"instrument"}),
        
        initialize: function () {
            this.listenTo(this.model, "change:r", this.refreshRate);
            this.listenTo(this.model, "change:ch", this.refreshChange);
        },
        
        refreshRate: function () {
            this.$(".rate").html(this.model.get("r").toFixed(5));
        },
        
        refreshChange: function () {
            this.$(".change").html(this.model.get("ch").toFixed(2));
        },
        
        render: function () {
            this.$el.append(this.template(this.model.toJSON()), {variable:"instrument"});
            return this;
        }
    });
})(this);
