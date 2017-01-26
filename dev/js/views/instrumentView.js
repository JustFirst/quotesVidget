(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$;
    var _ = global._;
    var Backbone = global.Backbone || (global.Backbone = {});

    app.InstrumentView = Backbone.View.extend({

        tagName: "div",

        className: "row",

        template: _.template($("#row-template").html()),
        
        initialize: function () {
            this.listenTo(this.model, "change", this.refresh);
        },
        
        refresh: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        
        render: function () {
            this.$el.append(this.template(this.model.attributes));
            return this;
        }
    });
})(this);
