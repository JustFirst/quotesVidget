define(function (require) {
    "use strict";
    var $ = require("jquery"),
        Backbone = require("backbone"),
        _ = require("underscore"),
        data = require("parser/instruments"),
        InstrumentModel = require("models/instrument"),
        Wreqr = require("wreqr"),
        instrumentChannel = Wreqr.radio.channel("instrument"),
        dfd,
        k;

    var InstrumentCollection = Backbone.Collection.extend({

        model: InstrumentModel,

        initialize: function (models, options) {
            instrumentChannel.reqres.setHandler("exportInitialData", function () {
                return data.instruments[0].values;
            });
            instrumentChannel.vent.on("active", function (modelId) {
                this.setActiveModel(modelId);
            }.bind(this));

            if (options !== undefined) {
                this.options = options;
            }
            else {
                this.options = "";
            }
            k=0;
        },

        updateData: function(ajaxResult){
            if (this.length > 0) {
                this.set(ajaxResult);
            }

            else {
                this.reset(ajaxResult);
            }
        },

        getData: function () {
            dfd = $.Deferred();
            var currentQuotes = [];
            setTimeout(function () {
                for (var i = 0; i < data.instruments.length; i++) {
                    if (k > data.instruments[i].values.length - 1) {
                        k++;
                        continue;
                    }
                    currentQuotes.push({
                        s: data.instruments[i].name,
                        r: data.instruments[i].values[k].close,
                        ch: data.instruments[i].values[k].close - data.instruments[i].values[k].open
                    });
                }
                dfd.resolve(currentQuotes);
                k++;
            }, 0);
            return dfd.promise();
        },

        checkRequest: function() {
            if (dfd !== undefined) {
                if (dfd.state() === "pending") {
                    dfd.reject();
                }
            }
            return this.getData();
        },

        activeModel: function (activeModelIndex) {
            instrumentChannel.vent.trigger("activeModelSetted", function (activeModelIndex) {
                for (var i = 0; i < data.instruments.length; i++) {
                    if (data.instruments[i].name === this.models[activeModelIndex].id) {
                        return data.instruments[i].values;
                    }
                }
            }.bind(this)(activeModelIndex));
        },

        setActiveModel: function (modelId) {
            for (var i = 0; i < this.length; i++) {
                if (this.models[i].id === modelId) {
                    this.activeModel(i);
                }
            }
        }
    });
    return InstrumentCollection;
});
