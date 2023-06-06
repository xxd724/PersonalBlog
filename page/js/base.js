var randomTags=new Vue({
    el:'#right_modul',
    data:{
        tags:[]
    },
    computed:{
        randomColor:function(){
            return function(){
                var red=Math.random() * 255;
                var green=Math.random() * 255;
                var blue=Math.random() * 255;
                return "rgb("+red+","+green+","+blue+")";
            }
        },
        randomSize:function(){
            return function(){
                var size=(Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function(res){
            var result=[];
            for(var i=0;i<res.data.data.length;i++){
                result.push({text:res.data.data[i].tag,link:"/?tag=" + res.data.data[i].tag});
            }
            randomTags.tags=result;
        }).catch(function(err){
            console.log("请求失败");
        })
    }
})
var newHot=new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(res){
            var result=[];
            for(var i=0;i<res.data.data.length;i++){
                var temp={};
                temp.title=res.data.data[i].title;
                temp.link="/blog_detail.html?bid=" + res.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList=result;
        }).catch(function(err){

        });
    }
})
var newComments=new Vue({
    el:'#new_comments',
    data:{
        commentsList:[]
    },
    computed:{

    },
    created:function(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function(res){
            var result=[];
            for(var i=0;i<res.data.data.length;i++){
                var temp={};
                temp.name=res.data.data[i].user_name;
                temp.date=res.data.data[i].ctime;
                temp.comment=res.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentsList=result;
        }).catch(function(err){

        });
    }
})