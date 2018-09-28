<script>
import $ from 'jquery'
export default {
  props: ['userList', 'sessionIndex', 'session', 'search', 'sessionList'],
  data: function () {
    return {
      currentIndex: 0,
      tag: 0
    }
  },
  computed: {
    searchData: function () {
//    if (this.search === '') {
//      return this.sessionList
//    } else {
        return this.sessionList.filter(item => item.type === 'user' && this.userList[item.id].name.indexOf(this.search) > -1)
//    }
    },
    isUserMsg: function () {
      var userMsgCount = 0
      for (var index in this.sessionList) {
        if (this.sessionList[index].type === 'user') {
          userMsgCount++
        }
      }
      return userMsgCount
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
      	this.duihuaXiao=true
      	this.duihuaDa=false
      	$('.vu_m-chatmain').css('height','25.6%')
      	$('.vu_xiao_main').hide()
      	this.gerenXiao=false
      	this.gerenDa=true
      	$('.vu_m-text').css('height','20%')
      	$('#vue_echart').css('height','72%')
      	$('.vue-chart-foot').css('height','28.6%')
      	$('.vu_resizable').attr('id','resizable')
      	var height=$("#resizable").height()
	      $("#resizable").resizable({
	        handles: "n",
	        minHeight:height,
	        maxHeight:770
	      });
	      $('.ui-resizable-handle').show()
        $('#mytrade_form').css('height','67.1%')
        var arr=[]
        $("#resizable").resize(function(){
        	var height=$("#resizable").height()        	
        	arr.push(height)
        	if(arr[0]<height){
        		$('.vu_m_tubiaoxia').hide()
        	}else if(arr[0]=height){
        		$('.vu_m_tubiaoxia').show()
        	}
        })
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
        function p(s) {
		        return s < 10 ? '0' + s: s;
		    }
        var myDate = new Date();
        var yue = myDate.getMonth() + 1;
        var ri = myDate.getDate();
        var day1 = p(yue) + '-' + p(ri);
        var day2 = date.substring(5, 10)
        if(day1==day2){
        	return date.substring(11, 16)
        }else{
        	return date.substring(5, 10)
        }
        
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
          <li v-for="(item,index) in searchData" v-if="item.type==='user'" :class="{ vu_active: session.id === item.id }" @click="select(item,$event)">
                <img class="vu_avatar"  width="30" height="30" :alt="userList[item.id].name" :src="userList[item.id].img" :class="{'vu_gray':!userList[item.id].isOnline}">
                <div class="vu_m-cs-cs">
                	<p class="vu_name">{{userList[item.id].name}}</p>
                	<p class="vu_m-xiang">{{item|firstMsg}}</p>
                </div>
                <div class="vu_m-list-del">
                	<p class="vu_m-list-del-time">{{item|lastTime}}</p>
                	<p class="vu_m-list-del-num" v-show="item.messages.some(function(i) { return !i.is_read})">{{item|noReadCnt}}</p>
                	<div class="vu_delet-li"  @click.stop="deletePerson(index)"></div>
                </div>
                <span  v-if="userList[item.id].friend_type!='friend'"></span>
          </li>
        </ul>
        <div v-show="isUserMsg==0" style="color:#ccc; text-align:center;line-height:50px;">
            暂无聊天消息
        </div>
        <!--<div class="vue_qun_offer"><p></p> <span>群发报价</span></div>-->
    </div>
</template>

<style>

</style>
