var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply:function(){
            return function(commentId,userName){
                document.getElementById("comment_reply").value=commentId;
                document.getElementById("comment_reply_name").value=userName;
                location.href="#send_comment";
            }
        }
    },
    created: function () {
        var bid = -1;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function(res){
            blogComments.comments=res.data.data;
            for(var i=0;i<blogComments.comments.length;i++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options="回复@" + blogComments.comments[i].parent_name;
                }
            }
        }).catch(function(err){
            console.log("请求错误");
        });
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid=" + bid
        }).then(function(res){
            blogComments.total=res.data.data[0].count;
        }).catch(function(err){
            console.log("请求失败");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightcode: ""
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (res) {
                    sendComment.vcode = res.data.data.data;
                    sendComment.rightcode = res.data.data.text;
                });
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightcode) {
                    alert("验证码有误");
                    return;
                }
                var bid = -1;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&parentName=" + replyName + "&userName=" + name + "&email=" + email + "&comments=" + content
                }).then(function (res) {
                    alert(res.data.msg);
                })
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});