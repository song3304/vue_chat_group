<script>
import Vue from 'vue'
export default {
  props: ['session', 'user', 'userList'],
  computed: {
    sessionUser () {
      return this.userList[this.session.id]
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes:seconds
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      var hour = date.getHours()
      var min = date.getMinutes()
      var sec = date.getSeconds()
      function p (s) {
        return s < 10 ? '0' + s : s
      }
      return p(hour) + ':' + p(min) + ':' + p(sec)
    }
  },
  watch: {
    // 发送消息后滚动到底部
    session: {
      handler () {
        var el = document.getElementById('chat_message_main')
        Vue.nextTick(() => {
          el.scrollTop = el.scrollHeight - el.clientHeight
        })
      },
      deep: true
    }
  },
  methods: {
    toRead: function (session) {
      if (session != null) {
        this.$emit('toReadEvent', session)
      }
    },
    todayMsg: function (session) {
      if (session != null) {
        this.$emit('todayMsgEvent', session)
      }
      setTimeout(function () {
        var el = document.getElementById('chat_message_main')
        el.scrollTop = el.scrollHeight - localStorage.b
        localStorage.b = el.scrollHeight
      }, 10)
    },
    textFormat: function (text) {
      return typeof text !== 'undefined' ? text.replace(/\n/g, '<br/>') : text
    },
    messscroll:function(session) {
			this.scroll = document.getElementById('chat_message_main').scrollTop
		  if(this.scroll==0){
		  	if (session != null) {
	        this.$emit('todayMsgEvent', session)
	      }
	      setTimeout(function () {
	        var el = document.getElementById('chat_message_main')
	        el.scrollTop = el.scrollHeight - localStorage.aa
	        localStorage.aa = el.scrollHeight
	      }, 10)
		  }
		},
  },
  mounted() {
    $("#chat_message_main").niceScroll({
    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        background: "", // 轨道的背景颜色
        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
    });
  },
}
</script>

<template>
    <div class="vu_m-message" id = "chat_message_main" @click="toRead(session)" @scroll="messscroll(session)">
    		<div class="vu_seemore" v-show="session!=null&&!session.has_send_today&& session.type=='user'&&session.messages.length>3" @click="todayMsg(session)">
    				<p></p><span>查看更多</span>
    		</div>
        <ul v-if="session!=null && session.type=='user'">
            <li v-if="session.messages.length<1" class="vu_m-message-new">暂无最新消息！</li>
            <li v-for="item in session.messages">
                <p class="vu_time"><span>{{item.date}}</span></p>
                <div class="vu_main" :class="{ vu_self: item.userId === user.id}">
                    <img class="vu_avatar" width="30" height="30" :src="item.self ? user.img : userList[session.id].img" />
                    <div class="vu_text" v-html="textFormat(item.text)"></div>
                    <br clear="all"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>

</style>
