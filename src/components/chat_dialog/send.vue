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
	      $("#vu_m_mess_new").niceScroll({
	    		cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "8px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	        disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
	    	});
    },
    openHistoryDialog: function (uid, type) {
      this.$emit('openHistoryEvent', uid, type)
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
    <div class="vu_m-text" v-if="session!=null&&session.type!='qun'">
    		<div class="vu_history" title="历史记录" @click="openHistoryDialog(session.id,'user')"><img src="../../images/lishi .png" alt="" /> <span>历史记录</span> </div>
        <textarea placeholder="" v-model="text" @click="toRead(session)" @keyup.enter="inputing" @keyuo.13="toRead(session)" placeholder="聊一聊"></textarea>
        <span class="vu_send" @click="inputing">发送</span><!--<span class="vu_history" @click="openHistoryDialog(session.id)">历史记录<p></p></span>-->
   </div>
</template>
