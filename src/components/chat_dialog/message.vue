<script>
	import Vue from 'vue';
    export default {
        props: ['session', 'user', 'userList'],
        computed: {
            sessionUser () {
                let users = this.userList.filter(item => item.id === this.session.userId);
                return users[0];
            }
        },
        filters: {
            // 筛选出用户头像
            avatar (item) {
                // 如果是自己发的消息显示登录用户的头像
                let user = item.self ;
                return user && user.img;
            },
            // 将日期过滤为 hour:minutes
            time (date) {
                if (typeof date === 'string') {
                    date = new Date(date);
                }
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        directives: {
            // 发送消息后滚动到底部
            'scroll-bottom' () {
                Vue.nextTick(() => {
//                  this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
                });
            }
        }
    };
</script>

<template>
    <div class="m-message" v-scroll-bottom="session.messages">
        <ul>
            <li v-for="item in session.messages">
                <p class="time"><span>{{item.date | time}}</span></p>
                <div class="main" :class="{ self: item.self }">
                    <img class="avatar" width="30" height="30" :src="item | avatar" />
                    <div class="text">{{item.text}}</div>
                    <br clear="all"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
.m-message {
    padding: 10px 15px;
    overflow-y: scroll;
}    
.m-message li {
    margin-bottom: 15px;
}
.m-message  .time {
    margin: 7px 0;
    text-align: center;
}    
.m-message  .time> span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
}   
.m-message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
}
.m-message .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width:360px;
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #FFFFFF;
    border-radius: 4px;
    
}  
.main .text{float: left;}
.self .text{float: right!important;}
.m-message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #FFFFFF;
}
       
.m-message .self {
    text-align: right;
}    
.m-message .self .avatar {
    float: right;
    margin: 0 0 0 10px;
}
.m-message .self .text {
    background-color: #2089ff;
}    
.m-message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2089ff;
}
</style>