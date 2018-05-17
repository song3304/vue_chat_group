<template>
  <div class="hello">
  	<div id="chitchat" @click="isfriend">
      <p></p>
      <span>私信<br>聊天</span>
    </div>
    <friendList v-show="panel_show.is_friend_show" v-bind:user="user" v-bind:userList="userList" v-bind:companyList="companyList" v-bind:groupList="groupList" @openGroupEvent="openGroup"  @openTalkEvent="openTalk"   @closeEvent="closePanel"></friendList>
    <chatdialog v-show="panel_show.is_dialog_show" v-bind:user="user" v-bind:sessionList="sessionList"></chatdialog>
    <historylist v-show="panel_show.is_history_show" v-bind:user="user" v-bind:historyList="historyList" v-bind:historyUid="historyUid"></historylist>
    <groupdialog v-show="panel_show.is_group_show" v-bind:user="user" v-bind:userList="userList" v-bind:companyList="companyList" v-bind:groupType="groupType" @createGroupEvent="createGroup"></groupdialog>
  </div>
</template>

<script>
import store from '../js/store'
import friendList from './FriendList'
import chatdialog from './ChatDialog'
import historylist from './HistoryList'
import groupdialog from './GroupDialog'


export default {	
	 data(){
	 	let serverData = store.fetch();
	 	return{
	 		
		 	// 控制面板是否显示
	    panel_show: {
	      is_friend_show: false,
	      is_dialog_show: false,
	      is_history_show: false,
	      is_group_show: false
	    },
	    // 登录用户
	    user: serverData.user,
	    // 用户列表
	    userList: serverData.userList,
	    // 公司列表
	    companyList: serverData.companyList,
	    // 分组列表
	    groupList: serverData.groupList,
	    // 会话列表
	    sessionList: serverData.sessionList,
	    // 历史记录列表
	    historyList: serverData.historyList,
	    // 当前历史记录用户id
	  	historyUid: 0,
	    // 搜索key
	    search: '',
	    // 选中的会话Index
	    sessionIndex: 0,
	    // 默认创建分组
	    groupType: 'common'
	 	}
    
  },
	 methods:{
	 		
	 },
	 components: { friendList,chatdialog, historylist,groupdialog},
	 mounted: function () {
    this.$nextTick(function () {
      // 初始化样式
    })
  },
  methods: {
  	isfriend(){
	 		this.panel_show.is_friend_show = true;
	 	},
    // 打开新建分组
    openGroup: function (type) {
      this.panel_show.is_group_show = true
      this.groupType = 'common'
    },
    // 创建分组
    createGroup: function (data) {
      // 通过sockectio,提交过去
    },
    // 打开对话框
    openTalk: function (data) {},
    closePanel: function (data) {
      this.panel_show = data
    }
  }
}
</script>

<style scoped>

</style>
