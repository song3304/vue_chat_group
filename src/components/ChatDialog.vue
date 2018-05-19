<script>
import card from './chat_dialog/card'
import list from './chat_dialog/list'
import send from './chat_dialog/send'
import message from './chat_dialog/message'

export default {
  name: 'ChatDialog',
  props: ['user', 'userList', 'sessionList', 'sessionIndex'],
  data: function () {
    return {
      search: ''
    }
  },
  computed: {
    session: function () {
      return this.sessionList[this.sessionIndex]
    }
  },
  // watch: {
  //   // 每当sessionList改变时，保存到localStorage中
  //   sessionList: {
  //               deep: true,
  //               handler () {
  //                   store.save({
  //                       user: this.user,
  //                       userList: this.userList,
  //                       sessionList: this.sessionList
  //                   });
  //               }
  //           }
  //       },
  components: {
    card, list, send, message
  },
  methods: {
    close: function () {
      this.$emit('closeEvent', {
        is_dialog_show: false,
        is_history_show: false
      })
    }
  }
}
</script>

<template>
 <div class="vu_m-chat">
    <div id="vu_chat">
        <div class="vu_sidebar">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :sessionList="sessionList" :session-index.sync="sessionIndex" :search="search"></list>
        </div>
        <div class="vu_m-na"><span class="vu_m-na-name">{{userList[session.userId].name}}</span><div class="vu_m-guan" @click="close"><p><span></span></p></div></div>
        <div class="vu_m-main">
            <message :session="session" :user="user" :user-list="userList"></message>
            <send :session="session"></send>
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
