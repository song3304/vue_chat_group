<template>
	<div>
		<ul >
			<p style="height: 40px;line-height: 40px;margin: 0;color:#666666;font-size: 12px;text-align: center;">------最近3天的历史聊天列表------</p>
		    <li v-for="(recentItem,index) in recentList"  v-if="recentItem !=null && userList.hasOwnProperty(recentItem.id) && recentItem.type=='user'" @click="openChat(recentItem.id,recentItem)">
		    	<div :class="{'vu_m-touxiang':!userList[recentItem.id].isCalling,'vu_m-touxiang vu_touxiang':userList[recentItem.id].isCalling}"> <!--有新消息就添加vu_touxiang抖动-->
		    		<img class="vu_avatar"  width="30" height="30" :alt="userList[recentItem.id].name" :src="userList[recentItem.id].img" :class="{'vu_gray':!userList[recentItem.id].isOnline}">
		    	</div>
	        	
	        	<div class="vu_m-cs-cs">
	            	<p class="vu_name">{{userList[recentItem.id].name}}</p>
	            	<p class="vu_m-xiang"><span>{{recentItem|firstMsg}}</span></p> <!--最新消息-->
	            </div>
	            <div class="vu_m-list-del vu_m-list-daytime">
	            	<p class="vu_m-list-del-time">{{recentItem|lastTime}}</p>  <!--最新消息时间-->	   
	            	<div v-for="item in searchData" v-if="item.id==recentItem.id">
	            		<p class="vu_m-list-del-num" v-if="item.messages.some(function(i) { return !i.is_read})">{{item|noReadCnt}}</p>    <!--//未读消息-->	  
	            	</div>
	            	          	
	            	<!--<div class="vu_delet-li"  @click.stop="deletePersonn(index)"></div>-->   <!--删除记录-->
	            </div>
	             <span  v-if="userList[recentItem.id].friend_type!='friend'"></span>
	       </li>
		 </ul>
	</div>
</template>
<script>
import $ from 'jquery'

export default {
  data () {
    return {
      groupId: 0,
      uid: 0,
      delType: '',
      groupName: '',
      groupPlaceHolder: '请输入新分组名称',
      Qunfen: false, // 修改群分组名称弹窗关闭
      Qunpopup: false, // 确认弹窗关闭
      current_uerId: 0,
      firstselt:false, //分组名称
      namez:false,
      groupNew:false, //移动列表隐藏
      friendDel:false,//删除框隐藏
      lookInfoTag:-1,//验证资料卡隐藏
      tipsTag:false,//提示框
      tipsMsg:'',//提示信息
      search: '',
    }
  },
  props: ['session','user', 'userList', 'companyList', 'groupList', 'followList','verifyMsg','recentList','sessionList'],
  computed: {
  	searchData: function () {
  		var sec={}
  		sec=this.sessionList
        return sec
   },
  },
  methods: {
    openChat: function (uid,recentItem) {
      this.$emit('openChartEvent', uid, 'user')
      this.$emit('toReadEvent', recentItem)
      this.current_uerId = uid
      $('.vu_m-list').show()
      $(".vu_m-list ul").niceScroll({
    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        background: "", // 轨道的背景颜色
        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
     });
     var oDiv = document.getElementById('vu_m-chatmainn')
        localStorage.qunfak++
        oDiv.style.zIndex=localStorage.qunfak
    },
	deletePersonn: function (index) {
      this.$emit('delSessionEvent', index)
    }
  },
  filters: {
    lastTime: function (recentItem) {  //设置聊天日期
        var endTime = new Date();
        var year=endTime.getFullYear()
        var month=endTime.getMonth()+1
        var tian=endTime.getDate()
        if (month < 10) {month = "0" + month;}
		if (tian < 10) {tian = "0" + tian;}
        var endDay=month+'-'+tian
        var startDay = recentItem.last_time.substring(5, 10)
        if(startDay===endDay){
        	return recentItem.last_time.substring(11, 16)
        }else{
        	return recentItem.last_time.substring(5, 10)
        }
//		return recentItem.last_time.substring(11, 16)
	},
	firstMsg: function (recentItem) {
      if (recentItem.message) {
        return recentItem.message.text
      } else {
        return false
      }
    },
    noReadCnt: function (item) {
    	var i = 0
	      for (var j = 0, lg = item.messages.length; j < lg; j++) {
	        i += item.messages[j].is_read ? 0 : 1
	      }
	      if(i>99){
	      	i=99+'+'
	      }
	      return i
     },
	},
	mounted() {
		$(".vu_liaotian_left ul").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	}
}

</script>
<style>
</style>
