var mysql= require("mysql");
function createConnection(){
    var connection=mysql.createConnection({
        host:"",
        port:"",
        user:"",
        password:"",
        database:""
    });
    return connection;
}
module.exports.createConnection=createConnection;