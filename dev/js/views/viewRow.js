"use strict";
var app = app || {};

app.RowView = Backbone.View.extend({

    tagName: "div",

    className: "row",

    template: _.template($("#row-template").html()),

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        return this;

    }
});