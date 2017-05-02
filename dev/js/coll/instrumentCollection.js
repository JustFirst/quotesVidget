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
                instrumentChannel.vent.trigger("active", this.models[0].id);
            }
        },

        getData: function () {
            dfd = $.Deferred();
            var currentQuotes = [];
            setTimeout(function () {
                for (var i = 0; i < data.instruments.length; i++) {
                    if (k > data.instruments[i].values.length - 1) {
                        k++;
                        currentQuotes.push({
                            s: data.instruments[i].name,
                            r: data.instruments[i].values[data.instruments[i].values.length - 1].close,
                            ch: data.instruments[i].values[data.instruments[i].values.length - 1].close - data.instruments[i].values[data.instruments[i].values.length - 1].open,
                            prevCh: data.instruments[i].values[data.instruments[i].values.length - 2].close - data.instruments[i].values[data.instruments[i].values.length - 2].open
                        });
                        continue;
                    }
                    if (k>0) {
                        currentQuotes.push({
                            s: data.instruments[i].name,
                            r: data.instruments[i].values[k].close,
                            ch: data.instruments[i].values[k].close - data.instruments[i].values[k].open,
                            prevCh: data.instruments[i].values[k-1].close - data.instruments[i].values[k-1].open
                        });
                    }
                    else {
                        currentQuotes.push({
                            s: data.instruments[i].name,
                            r: data.instruments[i].values[k].close,
                            ch: data.instruments[i].values[k].close - data.instruments[i].values[k].open,
                            prevCh: data.instruments[i].values[k].close - data.instruments[i].values[k].open
                        });
                    }
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

        activeModel: {
            currentActiveModel: null,
            previousActiveModel: null
        },

        setActiveModel: function (modelId) {
            for (var i = 0; i < this.length; i++) {
                if (this.models[i].id === modelId) {
                    instrumentChannel.vent.trigger("activeModelSetted", function (activeModelIndex) {
                        for (var j = 0; j < data.instruments.length; j++) {
                            if (data.instruments[j].name === this.models[activeModelIndex].id) {
                                this.activeModel.previousActiveModel = this.activeModel.currentActiveModel;
                                this.activeModel.currentActiveModel = this.models[activeModelIndex];
                                if (this.activeModel.previousActiveModel !== null) {
                                    this.activeModel.previousActiveModel.trigger("setActive");
                                }
                                this.activeModel.currentActiveModel.trigger("setActive");
                                return data.instruments[j].values;
                            }
                        }
                    }.bind(this)(i));
                }
            }
        }
    });
    return InstrumentCollection;
});
