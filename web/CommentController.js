var commentDao = require('../dao/CommentDao')
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var captcha = require("svg-captcha");
var url = require('url');
var path = new Map();

function addComment(request, response) {
    var parms = url.parse(request.url, true).query;
    commentDao.inserComment(parseInt(parms.bid), parseInt(parms.parent), parms.parentName,parms.userName, parms.email, parms.comments, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end()
    })
}
path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({ fontSize: 35, width: 100, height: 34 });
    // response.writeHead(200,{"Content-Type":"image/svg+xml"});
    // response.write(img.data);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "生成随机验证码成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request,response){
    var parms=url.parse(request.url,true).query;
    commentDao.queryCommentsByBlogId(parseInt(parms.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })

}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentsCountByBlogId(request,response){
    var parms=url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(parms.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

function queryNewComments(request,response){
    commentDao.queryNewComments(5,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryNewComments", queryNewComments);
module.exports.path = path;