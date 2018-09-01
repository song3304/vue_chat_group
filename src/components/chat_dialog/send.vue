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

      if (e.ctrlKey) {
        this.text = this.text + '\n'

      } else {
        // 输入内容为空 不提交
        if (this.text.replace(/(^\s*)|(\s*$)/g, '') === '') return
        // this.session.messages.push({
        //   messageId: 0,
        //   text: this.text,
        //   date: new Date(),
        //   self: true,
        //   is_read: true
        // })
        this.$emit('chatEvent', this.session.id, this.text)
        this.text = ''
      }
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
    <div class="vu_m-text">
    		<div class="vu_history" title="历史记录" @click="openHistoryDialog(session.id)"><img src="../../images/lishi .png" alt="" /> <span>历史记录</span> </div>
        <textarea placeholder="" v-model="text" @click="toRead(session)" @keyup.enter="inputing" @keyuo.13="toRead(session)" placeholder="聊一聊"></textarea>
        <span class="vu_send" @click="inputing">发送</span><!--<span class="vu_history" @click="openHistoryDialog(session.id)">历史记录<p></p></span>-->
    </div>
</template>
