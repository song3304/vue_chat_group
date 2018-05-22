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
    close: function () {
      this.$emit('closeEvent', {
        is_dialog_show: false,
        is_history_show: false
      });
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
    drag: function (ev) {
      var oDiv = document.getElementById('vu_chat')
      var oEvt = ev || event
      var disX = oEvt.clientX - oDiv.offsetLeft
      var disY = oEvt.clientY - oDiv.offsetTop
      document.onmousemove = function (ev) {
        var oEvt = ev || event
        var l = oEvt.clientX - disX// 计算
        var t = oEvt.clientY - disY
        // 限定
        if (l < 50) l = 0
        if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
          l = document.documentElement.clientWidth - oDiv.offsetWidth
        }

        if (t < 50) t = 0
        if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50) {
          t = document.documentElement.clientHeight - oDiv.offsetHeight
        }
        oDiv.style.left = l + 'px'// 使用
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function () {
        document.onmouseup = document.onmousemove = null
        oDiv.releaseCapture && oDiv.releaseCapture()
      }
      oDiv.setCapture && oDiv.setCapture()
      return false
    },
    jinzhi: function (ev) {
      ev.stopPropagation()
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
    todayMsg: function (uid) {
      this.$emit('todayMsgEvent', uid)
    }
  }
}
</script>

<template>
 <div class="vu_m-chat">
    <div id="vu_chat" @mousedown="drag">
        <div class="vu_sidebar" @mousedown="jinzhi">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :sessionList="sessionList"  @updateIndexEvent="updateIndex" :search="search" @toReadEvent="toRead" @delSessionEvent="delSession"></list>
        </div>
        <div class="vu_m-na" id="tuo"><span class="vu_m-na-name">{{session!=null ? userList[session.userId].name : ''}}</span><div class="vu_m-guan" @click="close" @mousedown="jinzhi"><p><span></span></p></div></div>
        <div class="vu_m-main" @mousedown="jinzhi">
            <message :session="session" :user="user" :user-list="userList" @toReadEvent="toRead" @todayMsgEvent="todayMsg"></message>
            <send :session="session" @openHistoryEvent="openHistory" @toReadEvent="toRead" ></send>
        </div>
    </div>
    </div>
</template>

<style >

</style>
