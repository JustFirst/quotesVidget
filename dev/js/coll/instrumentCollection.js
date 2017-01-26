(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$;
    var Backbone = global.Backbone;
    var previousRequest;
    var dfd;

    app.InstrumentCollection = Backbone.Collection.extend({
            
        model: app.InstrumentModel,
                      
        initialize: function (models, options) {
            this.options = options;
        },
                        
        getData: function(){
            
            if (dfd !== undefined) {
                if (dfd.state() === "pending") {
                    dfd.reject();
                    previousRequest.abort();
                }
            }
            
            dfd = $.Deferred();
            
            var request = $.ajax({
                async: true,
                type: "GET",
                url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
                dataType: "json",
                data: {symbols: this.options.symbols}
            }).done(function(data, textStatus, jqXHR){
            dfd.resolve();    
            if (this.length > 0) {
                    this.set(jqXHR.responseJSON.Result.QuotesTrade);
                }
                else {
                    this.reset(jqXHR.responseJSON.Result.QuotesTrade);
                    for (var i = 0; i < this.length; i++) {
                        this.models[i].set("firstRate", jqXHR.responseJSON.Result.QuotesTrade[i].r);
                    }
                }
            }.bind(this)).fail(dfd.reject);
            
            previousRequest = request;
            return dfd.promise();
        }


    });
})(this);