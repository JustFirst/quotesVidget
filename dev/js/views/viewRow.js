(function (global) {
    "use strict";

    var app = global.app || (global.app = {});

    app.RowView = Backbone.View.extend({

        tagName: "div",

        className: "row",

        template: _.template($("#row-template").html()),

        render: function () {
            this.$el.append(this.template(this.model.attributes));

            return this;

        }
    });
})(this);
