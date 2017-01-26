/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
(function (global) {
    
    "use strict";

    var app = global.app || (global.app = {});
    var Backbone = global.Backbone;
    app.InstrumentCollectionView = Backbone.View.extend({

        el: "div.tool-box",

        getParams: function () {
            var urlParameters = window.location.search;
            var symbolsRegExp = /[?&]symbols=((?:[A-Za-z0-9]+,?)+)&?/gi;
            var symbols = symbolsRegExp.exec(decodeURIComponent(urlParameters));
            if ( symbols !== null) {
                return {symbols:symbols[1]}
            }
            else
            {
                return {symbols:"EURUSD,GBPUSD,AUDNZD"}
            }
        },

        initialize: function() {
            this.collection = new app.InstrumentCollection(null, this.getParams());
            this.collection.once("reset", this.render, this);
        },
        
        render: function () {
            this.collection.each(function (item) {
                this.renderInstrument(item);
            }, this);
        },
        
        renderInstrument:function (item) {
            var instrumentView = new app.InstrumentView({
                model: item
            });
            this.$el.append(instrumentView.render().el);
        }
    });
})(this);