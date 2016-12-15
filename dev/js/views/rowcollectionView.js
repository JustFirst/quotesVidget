/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
"use strict";

var app = app || {};

app.RowCollectionView = Backbone.View.extend({
    tagName:"div",

    className: "tool-box",

    initialize: function(quotes) {
        this.collection = new app.RowCollectionView( quotes );
        this.render();
    },

    render: function () {
        this.collection.each(function (item) {
            this.renderRow(item);
        }, this);
    },

    renderRow:function (item) {
        var rowView = new app.RowView({
            model: item
        });
        this.$el.append(rowView.render().el);

    }


});