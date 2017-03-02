define(function (require) {
    var Instrument = require("models/instrument"),
    Backbone = require("backbone");
    describe("output check", function() {
        it("should return contructor", function () {
            expect(Instrument.prototype.constructor === Backbone.Model.prototype.constructor).toBe(true);
        });
    });
});