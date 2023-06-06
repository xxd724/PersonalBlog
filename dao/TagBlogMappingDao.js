var dbutil=require("./DBUtil");
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    var insertSql= "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values(?,?,?,?);";
    var parms=[tagId,blogId,ctime,utime];
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
function queryByTag(tagId,page,pageSize,success){
    var querySql= "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
    var parms=[tagId,page * pageSize,pageSize];
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
function queryByTagCount(tagId,success){
    var querySql= "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var parms=[tagId];
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

module.exports.insertTagBlogMapping=insertTagBlogMapping;
module.exports.queryByTag=queryByTag;
module.exports.queryByTagCount=queryByTagCount;