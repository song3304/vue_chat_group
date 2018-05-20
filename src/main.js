// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueSocketio from 'vue-socket.io'
import 'font-awesome/css/font-awesome.css'
import './js/leftnav.js'
import store from './js/store'
import friendList from './components/FriendList'
import chatdialog from './components/ChatDialog'
import historylist from './components/HistoryList'
import groupdialog from './components/GroupDialog'
import './css/index.css'
import './css/leftnav.css'

Vue.config.productionTip = false

// Vue.use(VueSocketio, 'http://localhost:8007')
let serverData = store.fetch()
/* eslint-disable no-new */
new Vue({
  el: '#chat_app',
  data: {
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
  },
  // sockets: {
  // 所有sockect 事件放在这
  //  connect: function(){
  //    console.log('socket connected')
  //   }
  // 发送emit用:this.$scoket.emit(key,val)
  // },
  components: {friendList, chatdialog, historylist, groupdialog},
  template: `<div id="chat_app"><div id="vu_chitchat" @click="firstopen()">
		      <p></p>
		      <span>私信<br>聊天</span>
		    </div>
		    <friendList v-show="panel_show.is_friend_show" :user="user" :userList="userList" :companyList="companyList" :groupList="groupList" @openGroupEvent="openGroup" @openTalkEvent="openTalk" @closeEvent="closePanel" @changeUserNameEvent="changeUserName"></friendList>
		    <chatdialog v-show="panel_show.is_dialog_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" @closeEvent="closePanel" @toReadEvent="toRead"></chatdialog>
		    <historylist v-show="panel_show.is_history_show" :user="user" :historyList="historyList" :historyUid="historyUid" @closeEvent="closePanel"></historylist>
				<groupdialog v-show="panel_show.is_group_show" :user="user" :userList="userList" :companyList="companyList" :groupType="groupType" @createGroupEvent="createGroup" @closeEvent="closePanel"></groupdialog></div>`,
  created: function () {
    // 初始化数据
  },
  mounted: function () {
    this.$nextTick(function () {
      // 初始化样式
    })
  },
  methods: {
    // 打开新建分组
    openGroup: function (type) {
      this.panel_show.is_group_show = true
      this.groupType = type
    },
    // 创建分组
    createGroup: function (data) {
      // this.$sockect.emit('createGroup',data)
    },
    // 打开对话框
    openTalk: function (uid) {
      this.panel_show.is_dialog_show = true
    },
    closePanel: function (data) {
      if (data.hasOwnProperty('is_friend_show')) {
        this.panel_show.is_friend_show = data.is_friend_show
      }
      if (data.hasOwnProperty('is_dialog_show')) {
        this.panel_show.is_dialog_show = data.is_dialog_show
      }
      if (data.hasOwnProperty('is_history_show')) {
        this.panel_show.is_history_show = data.is_history_show
      }
      if (data.hasOwnProperty('is_group_show')) {
        this.panel_show.is_group_show = data.is_group_show
      }
    },
    // 私信聊天打开好友列表
    firstopen: function () {
      this.panel_show.is_friend_show = true
    },
    // 修改用户名
    changeUserName: function (data) {
      // this.$sockect.emit('changeUserName',data)
    },
    // 更新已读
    toRead: function ($msgIds) {
      // this.$sockect.emit('toReadMsg', $msgIds)
    }
  }
})
