<template>

  <div id="vu_history" @mousedown="drag">
    <div class="vu_his-guan">
      <span>{{historyUid.type=='user'&&historyUid.id!=0?userList[historyUid.id].name:''}}</span>
      <p class="vu_his-hide" @click="close" @mousedown="jinzhi"><span></span></p>
    </div>
    <div id="vu_his-head">
    <ul class="vu_his-main" @mousedown="jinzhi" v-show="is_show(hList)" id="vu_his-main">
      <div class="vu_baoliu" @click="getMoreMsg" v-show="!is_all(hList)">查看更多</div>
      <div class="vu_baoliu" v-show="is_all(hList)">已经到底了</div>
      <div v-for="item in contents(hList)" class="vu_title">
        <!--//时间-->
        <p class="vu_title-text"><span>{{item.date}}</span></p>
        <!--对方信息-->
        <li v-for="date_item in item.items" :class="{'vu_opposite':date_item.userId!==user.id,'vu_oneself':date_item.userId===user.id}">
          <p :class="{'vu_oppo-title':date_item.userId!==user.id,'vu_one-title':date_item.userId===user.id}">{{date_item.userId===user.id?'自己':userList[date_item.userId].name}} {{date_item.createTime}}</p>
          <p :class="{'vu_oppo-xiang':date_item.userId!==user.id,'vu_one-xiang':date_item.userId===user.id}" v-html="textFormat(date_item.content)"></p>
        </li>
      </div>
      <div class="vu_baoliu">为您保留一周的聊天记录</div>
    </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['user', 'userList', 'hList', 'historyUid'],
  data () {
    return {
      // 最早一次时间
      // lastTime: ''
    }
  },
  computed: {
  },
  methods: {
  	menuscroll () {
			this.scroll = document.getElementById('vu_his-head').scrollTop
		  if(this.scroll==0){
		  	this.$emit('getMoreMsgEvent', this.historyUid.id, this.historyUid.type)
	      setTimeout(function () {
	        var el = document.getElementById('vu_his-head')
	        el.scrollTop = el.scrollHeight - localStorage.a
	        localStorage.a = el.scrollHeight
	      }, 1)
		  }
		},
    contents: function (data) {
      if (data[this.historyUid.type] !== {} && this.historyUid.id !== 0 && data[this.historyUid.type].hasOwnProperty(this.historyUid.id) && data[this.historyUid.type][this.historyUid.id].hasOwnProperty('contents')) {
        return data[this.historyUid.type][this.historyUid.id].contents
      } else {
        return []
      }
    },
    close: function () {
      this.$emit('closeEvent', {is_history_show: false})
    },
    getMoreMsg: function () {
      this.$emit('getMoreMsgEvent', this.historyUid)
      setTimeout(function () {
        var el = document.getElementById('vu_his-head')
        el.scrollTop = el.scrollHeight - localStorage.a
        localStorage.a = el.scrollHeight
      }, 1)
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
        if (l < 5) l = 0
        if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
          l = document.documentElement.clientWidth - oDiv.offsetWidth
        }
        if (t < 5) t = 0
        if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50) {
          t = document.documentElement.clientHeight - oDiv.offsetHeight
        }
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
    jinzhi: function (ev) {
      ev.stopPropagation()
    },
    is_all: function (data) {
      if (this.historyUid.type === 'user' && data.user.hasOwnProperty(this.historyUid.id)) {
        return data.user[this.historyUid.id].is_all
      } else {
        return false
      }
    },
    is_show: function (data) {
      return this.historyUid.type === 'user' && data.user.hasOwnProperty(this.historyUid.id)
    },
    textFormat: function (text) {
      return text.replace(/\n/g, '<br/>')
    },

  },
  mounted () {
	  document.getElementById("vu_his-head").addEventListener('scroll', this.menuscroll)
	},
}
</script>
