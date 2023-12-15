const pg = require('pg')

let pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'koala_sql'
});

module.exports = pool