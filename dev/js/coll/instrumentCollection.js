define(["require", "models/instrument"], function (require, InstrumentModel) {
    "use strict";
    var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    dfd,
    previousRequest;

    var InstrumentCollection = Backbone.Collection.extend({

        model: InstrumentModel,

        initialize: function (models, options) {
            if (options !== undefined) {
                this.options = options;
            }
            else
                this.options = "";
        },

        updateData: function(ajaxResult){
            if (this.length > 0) {
                this.set(ajaxResult);
            }
            else {
                this.reset(ajaxResult);
                for (var i = 0; i < this.length; i++) {
                    this.models[i].set("firstRate", ajaxResult[i].r);
                }
            }
        },

        getInterval: function (firstDate, secondDate) {

        },

        getData: function () {
            dfd = $.Deferred();
            var fileReader = new FileReader();
            var str = fileReader.readAsText(`../instruments.json`);
            console.log(str);
            /*
            previousRequest = $.ajax({
                async: true,
                type: "GET",
                url: "../parser/instruments.json+?callback=",
                dataType: "jsonp",
                jsonpCallback: "callback"
                //data: {symbols: this.options.symbols}
            })*/

        },

        callback: function () {
            console.log(json)
        },

        checkRequest: function(ajax) {
            if (dfd !== undefined) {
                if (dfd.state() === "pending") {
                    dfd.reject();
                    previousRequest.abort();
                }
            }
            return this.getData();
        }
    });
    return InstrumentCollection;
});
