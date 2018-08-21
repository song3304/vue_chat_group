<script>
import $ from 'jquery'
export default {
  props: ['userList', 'sessionIndex', 'session', 'search', 'sessionList'],
  data: function () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    searchData: function () {
      if (this.search === '') {
        return this.sessionList
      } else {
        return this.sessionList.filter(item => this.userList[item.userId].name.indexOf(this.search) > -1)
      }
    }
  },
  methods: {
    select (value, event) {
      this.currentIndex = this.sessionList.indexOf(value)
      this.$emit('updateIndexEvent', this.currentIndex)
      // 已读处理
      // var el = event.currentTarget
      // $('.vu_m-list-del .vu_m-list-del-num', el).hide()
      this.$emit('toReadEvent', value)
    },
    deletePerson: function (index) {
      this.$emit('delSessionEvent', index)
      // this.sessionList.splice(index, 1)
    }
  },
  filters: {
    firstMsg: function (item) {
      if (item.messages.length > 0) {
        return item.messages[item.messages.length - 1].text
      } else {
        return ''
      }
    },
    lastTime: function (item) {
      if (item.messages.length > 0) {
        var date = item.messages[item.messages.length - 1].date
        return date.substring(11, 16)
      } else {
        return ''
      }
    },
    noReadCnt: function (item) {
      var i = 0
      for (var j = 0, lg = item.messages.length; j < lg; j++) {
        i += item.messages[j].is_read ? 0 : 1
      }
      return i
    },
    online (userIds, userList) {
      var onlineCnt = 0
      userIds.forEach(uid => { if (userList[uid].isOnline) onlineCnt++ })
      return onlineCnt
    }
  },
  mounted() {
    $(".vu_m-list").niceScroll({
    	cursorcolor: "#525159", // 改变滚动条颜色，使用16进制颜色值
        
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
    <div class="vu_m-list">
        <ul v-if="session!=null">
            <li v-for="(item,index) in searchData" :class="{ vu_active: session.userId === item.userId }" @click="select(item,$event)">
                <img class="vu_avatar"  width="30" height="30" :alt="userList[item.userId].name" :src="userList[item.userId].img" :class="{'vu_gray':!userList[item.userId].isOnline}">
                <div class="vu_m-cs-cs">
                	<p class="vu_name">{{userList[item.userId].name}}(公司名称)</p>
                	<p class="vu_m-xiang">{{item|firstMsg}}</p>
                </div>
                <div class="vu_m-list-del">
                	<p class="vu_m-list-del-time">{{item|lastTime}}</p>
                	<p class="vu_m-list-del-num" v-show="item.messages.some(function(i) { return !i.is_read})">{{item|noReadCnt}}</p>
                	<div class="vu_delet-li"  @click.stop="deletePerson(index)"></div>
                </div>
            </li>
          <li v-if="searchData.length < 1" style="color:#000;">

          </li>     
        </ul>
        <ul>   <!--//假消息-->
        	<li class="">
	            <img class="vu_avatar"  width="30" height="30"  src="../../../static/img/chat/default.png">
	            <div class="vu_m-cs-cs">
	            	<p class="vu_name">小张(公司名称)</p>
	            	<p class="vu_m-xiang">最新消息</p>
	            </div>
	            <div class="vu_m-list-del">
	            	<p class="vu_m-list-del-time">09:21</p>
	            	<p class="vu_m-list-del-num">2</p>
	            	<div class="vu_delet-li"></div>
	            </div>
	        </li>
	        <li class="" >
	            <img class="vu_avatar"  width="30" height="30"  src="../../../static/img/chat/default.png">
	            <div class="vu_m-cs-cs">
	            	<p class="vu_name">小张(公司名称)</p>
	            	<p class="vu_m-xiang">最新消息</p>
	            </div>
	            <div class="vu_m-list-del">
	            	<p class="vu_m-list-del-time">09:21</p>
	            	<p class="vu_m-list-del-num">2</p>
	            	<div class="vu_delet-li"></div>
	            </div>
	        </li>
        </ul>
    </div>
</template>

<style>

</style>
