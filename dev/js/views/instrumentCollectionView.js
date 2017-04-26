define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        InstrumentCollection = require( "coll/instrumentCollection"),
        InstrumentView = require( "views/instrumentView"),
        InstrumentCollectionView = Backbone.View.extend({

            el: "div.tool-box",

            getParams: function () {
                var urlParameters = window.location.search;
                var symbolsRegExp = /[?&]symbols=((?:[A-Za-z0-9]+,?)+)&?/gi;
                var symbols = symbolsRegExp.exec(decodeURIComponent(urlParameters));
                if ( symbols !== null) {
                    return {symbols:symbols[1]};
                }
                /*
                else
                {
                    return {symbols:"EURUSD,GBPUSD,AUDNZD,EURJPY"};
                }
                */
            },

            initialize: function() {
                this.collection = new InstrumentCollection(null, this.getParams());
                this.listenToOnce(this.collection, "reset", this.render);
            },

            render: function () {
                this.collection.each(function (item) {
                    this.renderInstrument(item);
                }, this);
            },

            renderInstrument:function (item) {
                var instrumentView = new InstrumentView({
                    model: item
                });
                this.$el.append(instrumentView.render().el);
            }
        });
    return InstrumentCollectionView;
});
