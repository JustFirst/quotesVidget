define(function (require) {
    var InstrumentCollection = require("coll/instrumentCollection");
    var $ = require("jquery");
    Backbone = require("backbone");
    describe("Request data checking", function() {
        beforeEach(function () {
            this.fakeAjax = $.Deferred();
            setTimeout(function() {fakeAjax.resolve({"Result":{
                "QuotesEquity":[],
                "QuotesTrade":[{"s":"EURJPY",
                        "r":120.06300,
                        "sp":0.01300,
                        "dt":"2017-03-02T02:58:35",
                        "n":5828326223,
                        "iw":true,
                        "om":true},
                    {"s":"AUDNZD",
                        "r":1.07268,
                        "sp":0.00007,
                        "dt":"2017-03-02T02:58:35",
                        "n":5828326211,
                        "iw":true,
                        "om":true},
                    {"s":"GBPUSD",
                        "r":1.22783,
                        "sp":0.00010,
                        "dt":"2017-03-02T02:58:35",
                        "n":5828326216,
                        "iw":true,
                        "om":true},
                    {"s":"EURUSD",
                        "r":1.05301,
                        "sp":0.00011,
                        "dt":"2017-03-02T02:58:35",
                        "n":5828326242,
                        "iw":true,
                        "om":true}],
                "Time":"2017-03-02T02:58:36",
                "Version":1488423516},
                "Error":null});}, 500);
        });
        it("should rehresh data that exactly returned from request", function (done) {
            var testCollection = new InstrumentCollection(null);
            spyOn(testCollection, "getData").and.returnValue(this.fakeAjax);
            testCollection.getData().done(function (ajaxResult) {
                testCollection.updateData(ajaxResult);
                for (var i = 0; i < ajaxResult.Result.QuotesTrade.length; i++) {
                    expect(testCollection.models[i].get("s")).toEqual(ajaxResult.Result.QuotesTrade[i].s);
                    expect(testCollection.models[i].get("r")).toEqual(ajaxResult.Result.QuotesTrade[i].r);
                }
            });
            done();
        });
    });
});