/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
(function (global) {
    
    "use strict";

    var app = global.app || (global.app = {});
    var Backbone = global.Backbone || (global.Backbone = {});
    app.RowCollectionView = Backbone.View.extend({

        el: "div.tool-box",

        initialize: function() {
            this.collection = new app.RowCollection();
            this.collection.once("reset", this.render, this);
            this.collection.listenTo(this.collection, "set", this.refreshCollection);
        },
        
        render: function () {
            this.$el.empty();
            this.collection.each(function ( item) {
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
})(this);