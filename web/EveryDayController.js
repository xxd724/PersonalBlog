var everyDayDao=require('../dao/EveryDayDao');
var timeUtil=require('../util/TimeUtil');
var respUtil=require('../util/RespUtil');
var path =new Map();
function editEveryDay(request,response) {  
    request.on("data",function (data){
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function(res){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}
path.set("/editEveryDay",editEveryDay);
function queryEverDay(request,response) {  
    everyDayDao.queryEverDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}
path.set("/queryEverDay",queryEverDay);

module.exports.path=path;