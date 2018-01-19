var Airtable = require('airtable');
var base;

function dbAuthenticate() {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyeGu5D9YweNq8Iz'
    });

    base = Airtable.base('appstHcksn2trzOFY');
}

function readDatabase(tableName, options, callback) {
    base(tableName)
        .select(options)
        .eachPage(callback);
}

function createRecord(tableName, data) {
    base(tableName)
        .create(data, function(err, record) {
            if (err) { console.error(err); }
            console.log(record.getId());
        });
}

// exports.dbAuthenticate = dbAuthenticate;
// exports.readDatabase = readDatabase;
