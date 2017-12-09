const path = require('path');
const _ = require('underscore');
const csvReader = new (require('promised-csv'))(true); // true to remove null rows
const csvPath = path.join(__dirname, 'indego-trips-2017-q3.first100.csv');


(async () => {
    let columnNames = null;

    const csvData = await csvReader.read(csvPath, row => {
        if (!columnNames) {
            columnNames = row;
            return null;
        }

        return _.object(columnNames, row);
    });

    console.log('loaded CSV data', csvData);
})();