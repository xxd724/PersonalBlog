var dbutil=require("./DBUtil");

function inserComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success){
    var insertSql= "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`) values(?,?,?,?,?,?,?,?);";
    var parms=[blogId,parent,parentName,userName,email,comments,ctime,utime];
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
function queryCommentsByBlogId(blogId,success){
    var querySql= "select * from comments where blog_id = ?";
    var parms=[blogId];
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
function queryCommentsCountByBlogId(blogId,success){
    var querySql= "select count(1) as count from comments where blog_id = ?";
    var parms=[blogId];
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
function queryNewComments(size,success){
    var querySql= "select * from comments order by id desc limit ?";
    var parms=[size];
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
module.exports.inserComment=inserComment;
module.exports.queryCommentsByBlogId=queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId=queryCommentsCountByBlogId;
module.exports.queryNewComments=queryNewComments;