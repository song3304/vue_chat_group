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
        },
        methods:{
		    close: function() {
		      this.$emit('closeEvent', {
		        is_dialog_show: false,
		        is_history_show: false,
		      });
		    },
        }
    };

</script>

<template>
 <div class="vu_m-chat">
    <div id="vu_chat">
        <div class="vu_sidebar">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :session-index.sync="sessionIndex" :search="search"></list>
        </div>
        <div class="vu_m-na"><span class="vu_m-na-name">小张</span><div class="vu_m-guan" @click="close"><p><span></span></p></div></div>
        <div class="vu_m-main">       	
            <message :session="session" :user="user" :user-list="userList"></message> 
            <test :session="session"></test>
        </div>
    </div>
    </div>
</template>

<style >
    #vu_chat {
        overflow: hidden;
        border-radius: 3px;
    }           
   #vu_chat .vu_sidebar {
        float: left;
        width: 220px;
        color: #f4f4f4;
        background-color: #eeeeee;
        height:540px;
        position: relative;
    }
   #vu_chat .vu_m-main {
        position: relative;
        overflow: hidden;   
        background-color: #F6F6F6;
        height: 490px;
    }
   #vu_chat .vu_m-text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
   #vu_chat .vu_m-message {
        height:350px;
    }
   
</style>