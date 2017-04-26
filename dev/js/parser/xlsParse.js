(function () {
    "use strict";
    const xlsx = require("node-xlsx");
    const fs = require("fs");
    const path = `../../../Users/dmitriy.shvakov/Downloads/instrums`;
    var instrums = {instruments: []};
    var instrument;
    var instrumentData;
    var temp;
    var name = [];
    var stringsArr;
    var data;
    var values;
    var json;
    fs.readdir(path, "utf8" ,(err, files) => {
        if (err) {
            throw err;
        }
        for (var i = 0; i < files.length; i++) {
            name.push(files[i].substring(0, files[i].indexOf("_")));
            instrument = {name: name[i], values: []};
            data = fs.readFileSync(path+ "/" + files[i], "utf8");
            stringsArr = data.split("\n");

            for (var j = 0; j < stringsArr.length-1; j++) {
                temp = stringsArr[j].split(",");
                instrumentData = {date: "", open: "", max: "", min: "", close: ""};
                for (var k = 0; k < temp.length - 1; k++) {
                    instrumentData[Object.keys(instrumentData)[k]] = temp[k];
                }
                instrument.values.push(instrumentData);
            }

            instrums.instruments.push(instrument);
        }
        json = JSON.stringify(instrums);
        fs.writeFile(path + "/" + "instruments.js", "define(function () { return " + json + ";});", "utf8", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
})();
