(function (global) {
    "use strict";

var app = global.app || (global.app = {});
    app.RowCollection = Backbone.Collection.extend({

        
        model: app.RowModel,

        addModels: function(models){
            this.reset(models);
        },

        getData: function(){
            var request = $.ajax({
                async: true,
                type: "GET",
                url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
                dataType: "json",
                data: {symbols: "EURUSD,XAUUSD"}
            }).done(function(data, textStatus, jqXHR){this.addModels(jqXHR.responseJSON.Result.QuotesTrade);});

            return request;
        }


    });
})(this);