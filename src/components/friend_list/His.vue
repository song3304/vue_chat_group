<template>
	<div>
		<ul >
		    <li v-for="(recentItem,index) in recentList"  v-if="recentItem !=null && userList.hasOwnProperty(recentItem.id) && recentItem.type=='user'" @click="openChat(recentItem.id)">
	        	<img class="vu_avatar"  width="30" height="30" :alt="userList[recentItem.id].name" :src="userList[recentItem.id].img" :class="{'vu_gray':!userList[recentItem.id].isOnline}">
	        	<div class="vu_m-cs-cs">
	            	<p class="vu_name">{{userList[recentItem.id].name}}</p>
	            	<p class="vu_m-xiang"></p>
	            </div>
	            <div class="vu_m-list-del">
	            	<p class="vu_m-list-del-time">{{recentItem|lastTime}}</p>
	            	<!--<p class="vu_m-list-del-num" v-show="item.messages.some(function(i) { return !i.is_read})">{{recentItem|noReadCnt}}</p>-->
	            	<div class="vu_delet-li"  @click.stop="deletePersonn(index)"></div>
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
    }
  },
  props: ['session','user', 'userList', 'companyList', 'groupList', 'followList','verifyMsg','recentList','sessionList'],
  computed: {
  },
  methods: {
    openChat: function (uid) {
      this.$emit('openChartEvent', uid, 'user')
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
    },
	deletePersonn: function (index) {
      this.$emit('delSessionEvent', index)
    }
  },
  filters: {
    lastTime: function (recentItem) {
		return recentItem.last_time.substring(11, 16)
	},
	firstMsg: function (recentItem) {
      if (recentItem.messages.length > 0) {
        return recentItem.messages[recentItem.messages.length - 1].text
      } else {
        return ''
      }
    },
 },
}

</script>

<style>
</style>
