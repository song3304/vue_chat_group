<script>
export default {
  props: ['session'],
  data () {
    return {
      text: ''
    }
  },
  methods: {
    inputing: function (e) {
      // 输入内容为空 不提交
      if (this.text === '') return
      this.session.messages.push({
        messageId: 0,
        text: this.text,
        date: new Date(),
        self: true,
        is_read: true
      })
      this.text = ''
    },
    openHistoryDialog: function (uid) {
      this.$emit('openHistoryEvent', uid)
    },
    toRead: function (session) {
      if (session != null) {
        this.$emit('toReadEvent', session)
      }
    }
  }
}
</script>

<template>
    <div class="vu_m-text" v-if="session!=null">
        <textarea placeholder="" v-model="text" @click="toRead(session)"></textarea>
        <span class="vu_send" @click="inputing">发送</span><span class="vu_history" @click="openHistoryDialog(session.userId)">历史记录<p></p></span>
    </div>
</template>

<style>


</style>
