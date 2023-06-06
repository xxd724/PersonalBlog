var blogDao=require('../dao/BlogDao');
var tagsDao=require('../dao/TagsDao');
var tagBlogMappingDao=require('../dao/TagBlogMappingDao');
var timeUtil=require('../util/TimeUtil');
var respUtil=require('../util/RespUtil');
var url=require('url');
var path =new Map();

function queryHotBlog(request,response){
    blogDao.queryHotBlog(5,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}
path.set("/queryHotBlog",queryHotBlog);

function queryAllBlog(request,response){
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}
path.set("/queryAllBlog",queryAllBlog);

function queryBlogById(request,response){
    var parms=url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(parms.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
        blogDao.addViews(parseInt(parms.bid),function(result){})
    });
}
path.set("/queryBlogById",queryBlogById);

function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogCount",queryBlogCount);

function queryBlogByPage(request,response){
    var parms=url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(parms.page),parseInt(parms.pageSize),function(result){
        for(var i = 0; i < result.length; i++){
            result[i].content=result[i].content.replace(/<img[\w\W]*>/,"");
            result[i].content=result[i].content.replace(/<[\w\W]{1,5}>/g,"");
            result[i].content=result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}
path.set("/queryBlogByPage",queryBlogByPage);

 function editBlog(request,response){
     var parms=url.parse(request.url,true).query;
     var tags=parms.tags.replace(/ /g,"").replace(new RegExp("，","g"),",");
     request.on("data",function(data){
        blogDao.insertBlog(parms.title,data.toString().trim(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            var blogId=result.insertId;
            var tagList=tags.split(",");
            for(var i = 0; i < tagList.length; i++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        });
     });
 }
path.set("/editBlog",editBlog);

 function queryTag(tag,blogId){
     tagsDao.queryTag(tag,function(res){
         if(res == null || res.length == 0){
             insertTag(tag,blogId);
         }else{
            tagBlogMappingDao.insertTagBlogMapping(res[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function(res){

            });
         }
     });
 }
 function insertTag(tag,blogId){
     tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function (res) {
        insertTagBlogMapping(res.insertId,blogId);
    });
 }
 function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function(res){

    });
 }
 module.exports.path=path;