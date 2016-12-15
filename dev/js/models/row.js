"use strict";
var app = app || {};

app.RowModel = Backbone.Model.extend({
    defaults: {
        s: "None",
        r: 1,
        p:0.1
    },
});