(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$ || (global.$ = {});
    var Backbone = global.Backbone || (global.Backbone = {});
    var previousRequest;
    var dfd;
    
    app.RowCollection = Backbone.Collection.extend({
            
        model: app.RowModel,
                        
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
                data: {symbols: "EURUSD,XAUUSD"}
            }).done(function(data, textStatus, jqXHR){
            dfd.resolve();    
            if (this.length > 0) {
                    this.set(jqXHR.responseJSON.Result.QuotesTrade);
                }
                else {
                    this.reset(jqXHR.responseJSON.Result.QuotesTrade);
                }
            }.bind(this)).fail(dfd.reject);
            
            previousRequest = request;
            return dfd.promise();
        }


    });
})(this);