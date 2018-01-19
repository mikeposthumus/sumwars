var db = require("./js/database");

db.dbAuthenticate();

db.readDatabase(
    "leaderboard",
    {
        maxRecords: 10,
        sort: [{
            field: "points",
            direction: "desc"
        }]
    },
    function(records) {
        records.forEach(function(rec) {
            console.log(rec.fields);
        });
    }
);
