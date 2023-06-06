var dbutil=require('./DBUtil');

function insertEveryDay(content,ctime,success){
    var insertSql= "insert into every_day (`content`,`ctime`) values(?,?);";
    var parms=[content,ctime];
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
function queryEverDay(success){
    var querySql= "select * from every_day order by id desc limit 1;";
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
module.exports.insertEveryDay=insertEveryDay;
module.exports.queryEverDay=queryEverDay;

