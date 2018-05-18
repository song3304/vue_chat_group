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
    <div class="vu_m-message" v-scroll-bottom="session.messages">
        <ul>
            <li v-for="item in session.messages">
                <p class="vu_time"><span>{{item.date | time}}</span></p>
                <div class="vu_main" :class="{ vu_self: item.self }">
                    <img class="vu_avatar" width="30" height="30" :src="item | avatar" />
                    <div class="vu_text">{{item.text}}</div>
                    <br clear="all"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
.vu_m-message {
    padding: 10px 15px;
    overflow-y: scroll;
}    
.vu_m-message li {
    margin-bottom: 15px;
}
.vu_m-message  .vu_time {
    margin: 7px 0;
    text-align: center;
}    
.vu_m-message  .vu_time> span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
}   
.vu_m-message .vu_avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
}
.vu_m-message .vu_text {
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
.vu_main .vu_text{float: left;}
.vu_self .vu_text{float: right!important;}
.vu_m-message .vu_text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #FFFFFF;
}
       
.vu_m-message .vu_self {
    text-align: right;
}    
.vu_m-message .vu_self .vu_avatar {
    float: right;
    margin: 0 0 0 10px;
}
.vu_m-message .vu_self .vu_text {
    background-color: #2089ff;
}    
.vu_m-message .vu_self .vu_text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2089ff;
}
</style>