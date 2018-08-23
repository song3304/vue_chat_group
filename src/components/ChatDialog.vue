<script>
import card from './chat_dialog/card'
import list from './chat_dialog/list'
import send from './chat_dialog/send'
import message from './chat_dialog/message'
import $ from 'jquery'

export default {
  name: 'ChatDialog',
  props: ['user', 'userList', 'sessionList', 'sessionIndex'],
  data: function () {
    return {
      search: '',

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
        this.sessionList.length < 1 && this.close()
      }
    }
  },
  methods: {
  	vueshrink:function(){

  	},
    close: function () {
      this.$emit('closeEvent', {
        is_dialog_show: false,
        is_history_show: false
      })
    },
    toRead: function (value) {
      var msgIds = []
      value.messages.forEach(function (item) {
        if (!item.is_read) {
          msgIds.push(item.messageId)
        }
      })
      this.$emit('toReadEvent', msgIds, value.userId)
    },
//  drag: function (ev) {
//    var oDiv = document.getElementById('vu_chat')
//    var oEvt = ev || event
//    var disX = oEvt.clientX - oDiv.offsetLeft
//    var disY = oEvt.clientY - oDiv.offsetTop
//    document.onmousemove = function (ev) {
//      var oEvt = ev || event
//      var l = oEvt.clientX - disX// 计算
//      var t = oEvt.clientY - disY
//      // 限定
//      if (l < 5) l = 0
//      if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
//        l = document.documentElement.clientWidth - oDiv.offsetWidth
//      }
//
//      if (t < 5) t = 0
//      if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50) {
//        t = document.documentElement.clientHeight - oDiv.offsetHeight
//      }
//      oDiv.style.left = l + 'px'// 使用
//      oDiv.style.top = t + 'px'
//    }
//    document.onmouseup = function () {
//      document.onmouseup = document.onmousemove = null
//      oDiv.releaseCapture && oDiv.releaseCapture()
//    }
//    oDiv.setCapture && oDiv.setCapture()
//    return false
//  },
//  jinzhi: function (ev) {
//    ev.stopPropagation()
//  },
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
	 	$( "#resizable" ).resizable({
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
        <!--<div class="vu_sidebar" >
            <card :user="user" :search.sync="search"></card>
        </div>-->
        <!--<div class="vu_m_tubiao" @mouseenter="vueshrink"></div>-->
        <div class="vu_m-na" id="tuo" v-if="session">
        		<p class="vu_m-new">个人信息</p>
        		<div class="vu_m-newqun"><img :src="userList[session.userId].img" alt="" /></div>
        		<span class="vu_m-na-name">{{session!=null ? userList[session.userId].name : ''}}</span>
        		<p class="vu_m-new_com">公司：中化金服</p>
        		<p class="vu_m-new_phone">电话：<span>12365478952</span></p>
        		<div class="vu_m-new_friend">加为好友</div>  <!--//加好友-->
        		<!--<div class="vu_m-guan" @click="close" ><p><span></span></p></div>-->
        </div> <!--<div class="vu_m-minimum" @click="close" ></div>-->
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
