/**
 * Created by dmitriy.shvakov on 15.12.2016.
 */
"use strict";

var app = app || {};

var data = new app.DataModel;
new app.RowCollectionView(data.getData());