(function (global) {
    "use strict";

    var app = global.app || (global.app = {});
    var $ = global.$ || (global.$ = {});
    var Backbone = global.Backbone || (global.Backbone = {});
    app.RowCollection = Backbone.Collection.extend({
                
        model: app.RowModel,
                
        getFirstData: function(){

            var firstRequest = $.ajax({
                async: true,
                type: "GET",
                url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
                dataType: "json",
                data: {symbols: "EURUSD,XAUUSD"}
            }).done(function(data, textStatus, jqXHR){this.reset(jqXHR.responseJSON.Result.QuotesTrade);}.bind(this));

            return firstRequest;
        }, 
        
        getData: function(){

            var request = $.ajax({
                async: true,
                type: "GET",
                url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
                dataType: "json",
                data: {symbols: "EURUSD,XAUUSD"}
            }).done(function(data, textStatus, jqXHR){this.set(jqXHR.responseJSON.Result.QuotesTrade);}.bind(this));
            
            return request;

        }


    });
})(this);