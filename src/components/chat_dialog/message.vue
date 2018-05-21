<script>
import Vue from 'vue'
export default {
  props: ['session', 'user', 'userList'],
  computed: {
    sessionUser () {
      return this.userList[this.session.userId]
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds()
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
  }
}
</script>

<template>
    <div class="vu_m-message" id = "chat_message_main">
        <ul v-if="session!=null">
            <li v-for="item in session.messages">
                <p class="vu_time"><span>{{item.date | time}}</span></p>
                <div class="vu_main" :class="{ vu_self: item.self }">
                    <img class="vu_avatar" width="30" height="30" :src="item.self ? user.img : userList[session.userId].img" />
                    <div class="vu_text">{{item.text}}</div>
                    <br clear="all"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>

</style>
