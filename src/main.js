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
import './css/chat_index.css'
import './css/chat_leftnav.css'

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
		    <chatdialog v-show="panel_show.is_dialog_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" @closeEvent="closePanel" @delSessionEvent="delSession" @toReadEvent="toRead" @openHistoryEvent="openHistory" @updateIndexEvent="updateIndex"></chatdialog>
		    <historylist v-show="panel_show.is_history_show" :user="user" :userList="userList" :historyList="historyList" :historyUid="historyUid" @closeEvent="closePanel"></historylist>
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
      if (this.sessionList.some(function (item) { return item.userId === uid })) {
        this.sessionList.sort(function (first, second) { if (first.userId === uid) { return -1 } else if (second.userId === uid) { return 1 } else { return 0 } })
      } else {
        var addSessionData = {
          userId: uid,
          messages: []
        }
        this.sessionList.unshift(addSessionData)
      }
      this.sessionIndex = 0
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
    },
    // 打开历史记录
    openHistory: function (uid) {
      this.historyUid = uid
      this.panel_show.is_history_show = true
    },
    // 更新索引
    updateIndex: function (index) {
      this.sessionIndex = index
    },
    delSession: function (index) {
      this.sessionList.splice(index, 1)
      this.sessionIndex = 0
      store.save({user: this.user, userList: this.userList, companyList: this.companyList, groupList: this.groupList, sessionList: this.sessionList, historyList: this.historyList})
    }
  }
})
