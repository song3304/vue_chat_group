<template>

  <div id="vu_history" @mousedown="drag">
    <div class="vu_his-guan">
      <span>{{historyUid!=0?userList[historyUid].name:''}}</span>
      <p class="vu_his-hide" @click="close" @mousedown="jinzhi"><img src="../images/baise-x.png" alt="" /></p>
    </div>
    <ul class="vu_his-main" @mousedown="jinzhi">
      <div class="vu_baoliu">为您保留一周的聊天记录</div>
      <!--//时间-->
      <div class="vu_title">
        <p class="vu_title-text"><span>2018-05-07</span></p>
      </div>
      <!--对方信息-->
      <li class="vu_opposite">
        <p class="vu_oppo-title">小王 14:20:20</p>
        <p class="vu_oppo-xiang">我是小王</p>
      </li>
      <!--自己信息-->
      <li class="vu_oneself">
        <p class="vu_one-title">自己 14:33:20</p>
        <p class="vu_one-xiang">这是我自己说的话</p>
      </li>
      <div class="vu_baoliu" v-on:click='loadMore'>查看更多</div>
      <!--<div class="vu_baoliu">已经到底了</div>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryList',
  props: ['user', 'userList', 'historyList', 'historyUid'],
  data () {
    return {
      // 最早一次时间
      // lastTime: ''
    }
  },
  computed: {
    lastTime: function () {
      if (this.historyList.hasOwnProperty(this.historyUid)) {
        var theOldItme = this.historyList[this.historyUid].contents.pop()
        var theOldMsg = theOldItme.items.pop()
        return theOldMsg.createTime
      } else {
        return ''
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('closeEvent', {is_history_show: false})
    },
    getMoreMsg: function () {
      this.$emit('getMoreMsgEvent', {historyUid: this.historyUid, lastTime: this.lastTime})
    },
    drag: function (ev) {
      var oDiv = document.getElementById('vu_history')
      var oEvt = ev || event
      var disX = oEvt.clientX - oDiv.offsetLeft
      var disY = oEvt.clientY - oDiv.offsetTop
      document.onmousemove = function (ev) {
        var oEvt = ev || event
        var l = oEvt.clientX - disX// 计算
        var t = oEvt.clientY - disY
        // 限定
        if (l < 50) l = 0
        if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50)
          l = document.documentElement.clientWidth - oDiv.offsetWidth
        if (t < 50) t = 0
        if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50)
          t = document.documentElement.clientHeight - oDiv.offsetHeight
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function () {
        document.onmouseup = document.onmousemove = null
        oDiv.releaseCapture && oDiv.releaseCapture()
      }
      oDiv.setCapture && oDiv.setCapture()
      return false
    },
    jinzhi:function(ev){
		ev.stopPropagation();
	},
	loadMore:function(){//	查看更多
        
    }
  }
}
</script>
