(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$;
    var _ = global._;
    var Backbone = global.Backbone;

    app.InstrumentView = Backbone.View.extend({

        tagName: "div",

        className: "row",

        template: _.template($("#row-template").html()),
        
        initialize: function () {
            this.listenTo(this.model, "change:r", this.refreshRate);
            this.listenTo(this.model, "change:ch", this.refreshChange);
        },
        
        refreshRate: function () {
            $(".rate", this.$el).html(this.model.get("r"));
        },
        
        refreshChange: function () {
            $(".change", this.$el).html(this.model.get("ch").toFixed(2));
        },
        
        render: function () {
            this.$el.append(this.template(this.model.attributes), {variable:"instrument"});
            return this;
        }
    });
})(this);
