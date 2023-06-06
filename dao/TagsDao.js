var dbutil=require("./DBUtil");

function insertTag(tag,ctime,utime,success){
    var insertSql= "insert into tags (`tag`,`ctime`,`utime`) values(?,?,?);";
    var parms=[tag,ctime,utime];
    var connection=dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,parms,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();
}
function queryTag(tag,success){
    var querySql= "select * from tags where tag = ?;";
    var parms=[tag];
    var connection=dbutil.createConnection();
    connection.connect();
    connection.query(querySql,parms,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();
}
function queryAllTags(success){
    var querySql= "select * from tags;";
    var parms=[];
    var connection=dbutil.createConnection();
    connection.connect();
    connection.query(querySql,parms,function(error,result){
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();
}
module.exports.insertTag=insertTag;
module.exports.queryTag=queryTag;
module.exports.queryAllTags=queryAllTags;