const mySql = require('mysql');

const connection = mySql.createConnection({
    host:"localhost",
    user:"root",
    database:"grandgenexpress_db",
    password:"password"
});
   
   
    module.exports = connection;
