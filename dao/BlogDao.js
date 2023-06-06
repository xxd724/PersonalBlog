var dbutil=require('./DBUtil');

function insertBlog(title,content,tags,views,ctime,utime,success){
    var insertSql= "insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`) values(?,?,?,?,?,?);";
    var parms=[title,content,tags,views,ctime,utime];
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
function queryBlogByPage(page,pageSize,success){
    var querySql= "select * from blog order by id desc limit ?,?;";
    var parms=[page * pageSize,pageSize];
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
function queryBlogCount(success){
    var querySql= "select count(1) as count from blog;";
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

function queryBlogById(id,success){
    var querySql= "select * from blog where id = ?;";
    var parms=[id];
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
function queryAllBlog(success){
    var querySql= "select * from blog order by id desc;";
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
function addViews(id,success){
    var querySql= "update blog set views = views + 1 where id = ?;";
    var parms=[id];
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
function queryHotBlog(size,success){
    var querySql= "select * from blog order by views desc limit ?;";
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

module.exports.insertBlog=insertBlog;
module.exports.queryBlogByPage=queryBlogByPage;
module.exports.queryBlogCount=queryBlogCount;
module.exports.queryBlogById=queryBlogById;
module.exports.queryAllBlog=queryAllBlog;
module.exports.addViews=addViews;
module.exports.queryHotBlog=queryHotBlog;


