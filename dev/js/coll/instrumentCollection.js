define(["require", "models/instrument"], function (require, InstrumentModel) {
    "use strict";
    var $ = require("jquery"),
    Backbone = require("backbone"),
    previousRequest,
    dfd;
    
    
    var InstrumentCollection = Backbone.Collection.extend({
            
        model: InstrumentModel,
                      
        initialize: function (models, options) {
            this.options = options;
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
        
        getData: function () {
            if (dfd !== undefined) {
                if (dfd.state() === "pending") {
                    dfd.reject();
                    previousRequest.abort();
                }
            }    
            dfd = $.Deferred();
            previousRequest = $.ajax({
                async: true,
                type: "GET",
                url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
                dataType: "json",
                data: {symbols: this.options.symbols}
            }).done(function (data, textStatus, jqXHR){
                dfd.resolve(jqXHR.responseJSON.Result.QuotesTrade);
            }).fail(dfd.reject);
            
            return dfd.promise();
        }, 
    });
    return InstrumentCollection;
});