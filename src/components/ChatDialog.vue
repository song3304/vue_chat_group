<script>
import card from './chat_dialog/card'
import list from './chat_dialog/list'
import send from './chat_dialog/send'
import message from './chat_dialog/message'
import $ from 'jquery'

export default {
  name: 'ChatDialog',
  props: ['user', 'userList', 'sessionList', 'sessionIndex','groupList'],
  data: function () {
    return {
      search: ''
    }
  },
  computed: {
    session: function () {
      return this.sessionList.hasOwnProperty(this.sessionIndex) ? this.sessionList[this.sessionIndex] : null
    }
  },
  components: {
    card, list, send, message
  },
  watch: {
    sessionList: {
      deep: true,
      handler () {
        // this.sessionList.length < 1 && this.close()
      }
    }
  },
  methods: {
  	vueshrink:function(){

  	},
    toRead: function (value) {
      var msgIds = []
      value.messages.forEach(function (item) {
        if (!item.is_read) {
          msgIds.push(item.messageId)
        }
      })
      this.$emit('toReadEvent', msgIds, value.id, value.type)
    },
    openHistory: function (uid) {
      this.$emit('openHistoryEvent', uid)
    },
    updateIndex: function (index) {
      this.$emit('updateIndexEvent', index)
    },
    delSession: function (index) {
      this.$emit('delSessionEvent', index)
    },
    todayMsg: function (session) {
      this.$emit('todayMsgEvent', session)
    },
    toChat: function (toUid, msg) {
      this.$emit('chatEvent', toUid, msg)
    }
 },
 mounted(){
    $("#resizable").resizable({
			 handles: "n",
			 minHeight:211,
			 maxHeight:916
		});
 }
}
</script>

<template>
<div class="vu_m-chatmain">
 <div class="vu_m-chat">
 			<list :user-list="userList" :session="session" :sessionList="sessionList"  @updateIndexEvent="updateIndex" :search="search" @toReadEvent="toRead" @delSessionEvent="delSession" ></list>
    	<div id="vu_chat" >
    		<div id="resizable">
        <div class="vu_m-na" id="tuo" v-if="session!=null && session.type=='user'">
        		<p class="vu_m-new">个人信息</p>
        		<div class="vu_m-newqun"><img :src="userList[session.id].img" alt="" /></div>
        		<span class="vu_m-na-name">{{session!=null ? userList[session.id].name : ''}}</span>
        		<p class="vu_m-new_com">公司：{{userList[session.id].company_name}}</p>
        		<p class="vu_m-new_phone">电话：<span>{{userList[session.id].phone}}</span></p>
        		<div class="vu_m-new_friend" v-if="userList[session.id].friend_type!=='friend'">加为好友</div>  <!--//加好友-->
        </div>
        <div class="vu_m-main" >
            <message :session="session" :user="user" :user-list="userList" @toReadEvent="toRead" @todayMsgEvent="todayMsg"></message>
            <send :session="session" @openHistoryEvent="openHistory" @toReadEvent="toRead" @chatEvent="toChat" ></send>
        </div>
      </div>
    </div>
 </div>

</div>
</template>

<style >

</style>
