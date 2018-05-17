<script>
	import Vue from 'vue'
    import store from '../js/store';   
    import card from './chat_dialog/card';
    import list from './chat_dialog/list';
    import test from './chat_dialog/test';
    import message from './chat_dialog/message';

    export default {
        data () {       	
            let serverData = store.fetch();			
            return {
                // 登录用户
                user: serverData.user,
                // 用户列表
                userList: serverData.userList,
                // 会话列表
                sessionList: serverData.sessionList,
                // 搜索key
                search: '',
                // 选中的会话Index
                sessionIndex: 0
            };
        },
        computed: {
            session () {
                return this.sessionList[this.sessionIndex];
            }
        },
        watch: {
            // 每当sessionList改变时，保存到localStorage中
            sessionList: {
                deep: true,
                handler () {
                    store.save({
                        user: this.user,
                        userList: this.userList,
                        sessionList: this.sessionList
                    });
                }
            }
        },
        components: {
            card,list,test,message
        }
    };

</script>

<template>
    <div id="chat">
        <div class="sidebar">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :session-index.sync="sessionIndex" :search="search"></list>
        </div>
        <div class="m-na"><span class="m-na-name">小张</span><div class="m-guan"><p><span></span></p></div></div>
        <div class="m-main">       	
            <message :session="session" :user="user" :user-list="userList"></message> 
            <test :session="session"></test>
        </div>
    </div>
</template>

<style >
    #chat {
        overflow: hidden;
        border-radius: 3px;
    }           
   #chat .sidebar {
        float: left;
        width: 220px;
        color: #f4f4f4;
        background-color: #eeeeee;
        height:540px;
        position: relative;
    }
   #chat .m-main {
        position: relative;
        overflow: hidden;   
        background-color: #F6F6F6;
        height: 490px;
    }
   #chat .m-text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
   #chat .m-message {
        height:350px;
    }
   
</style>