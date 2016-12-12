var app = app || {};

app.rowModel = Backbone.Model.extend({
    defaults: {
        alias: 'None',
        quote: 1,
        incrememnt:0.1
    }
});