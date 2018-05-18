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
    <div class="v-m-message" v-scroll-bottom="session.messages">
        <ul>
            <li v-for="item in session.messages">
                <p class="v-time"><span>{{item.date | time}}</span></p>
                <div class="v-main" :class="{ self: item.self }">
                    <img class="v-avatar" width="30" height="30" :src="item | avatar" />
                    <div class="v-text">{{item.text}}</div>
                    <br clear="all"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
.v-m-message {
    padding: 10px 15px;
    overflow-y: scroll;
}    
.v-m-message li {
    margin-bottom: 15px;
}
.v-m-message  .v-time {
    margin: 7px 0;
    text-align: center;
}    
.v-m-message  .v-time> span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
}   
.v-m-message .v-avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
}
.v-m-message .v-text {
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
.v-main .v-text{float: left;}
.v-self .v-text{float: right!important;}
.v-m-message .v-text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #FFFFFF;
}
       
.v-m-message .v-self {
    text-align: right;
}    
.v-m-message .v-self .v-avatar {
    float: right;
    margin: 0 0 0 10px;
}
.v-m-message .v-self .v-text {
    background-color: #2089ff;
}    
.v-m-message .v-self .v-text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #2089ff;
}
</style>