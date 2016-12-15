/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
"use strict";

var app = app || {};

app.DataModel = Backbone.Model.extend({

    getData: function(){
        var request = $.ajax({
            async: false,
            type: "GET",
            url: "https://gaterest.fxclub.com/Real/RestApi/Quotes/CurrentQuotes",
            dataType: "json"});
        var parsedRequest = JSON.parse(request.responseText, function (key, value) {
            switch (key){
                case "r":
                    return +value;


                case "dt":
                    return  new Date(value);

                default: return value;
            }
        });

        return parsedRequest.Result.QuotesTrade;
    }
});