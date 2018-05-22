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
    groupType: 'common',
    // socket
    socket: null
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
		      <p :class="{'vu_jump':isCalling(userList)}"></p>
		      <span>私信<br>聊天</span>
		    </div>
		    <friendList v-show="panel_show.is_friend_show" :user="user" :userList="userList" :companyList="companyList" :groupList="groupList" @openGroupEvent="openGroup" @openTalkEvent="openTalk" @closeEvent="closePanel" @changeUserNameEvent="changeUserName"></friendList>
		    <chatdialog v-show="panel_show.is_dialog_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" @closeEvent="closePanel" @delSessionEvent="delSession" @toReadEvent="toRead" @openHistoryEvent="openHistory" @updateIndexEvent="updateIndex" @todayMsgEvent="todayMsg"></chatdialog>
		    <historylist v-show="panel_show.is_history_show" :user="user" :userList="userList" :historyList="historyList" :historyUid="historyUid" @closeEvent="closePanel" @getMoreMsgEvent="getMoreMsg"></historylist>
				<groupdialog v-show="panel_show.is_group_show" :user="user" :userList="userList" :companyList="companyList" :groupType="groupType" @createGroupEvent="createGroup" @closeEvent="closePanel"></groupdialog></div>`,
  created: function () {
    // 初始化数据 套接字
    if (typeof (socketChat) !== 'undefined' && typeof (_chat_user) !== 'undefined') {
      this.socket = new socketChat(this, _chat_user)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 初始化样式
    })
  },
  watch: {
    // 每当数据发生改变时，保存到localStorage中
    user: {
      deep: true,
      handler () {
        store.update({user: this.user})
      }
    },
    userList: {
      deep: true,
      handler () {
        store.update({userList: this.userList})
      }
    },
    sessionList: {
      deep: true,
      handler () {
        store.update({sessionList: this.sessionList})
      }
    },
    companyList: {
      deep: true,
      handler () {
        store.update({companyList: this.companyList})
      }
    },
    groupList: {
      deep: true,
      handler () {
        store.update({groupList: this.groupList})
      }
    },
    historyList: {
      deep: true,
      handler () {
        store.update({historyList: this.historyList})
      }
    }
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
      for (var uid in this.userList) {
        if (this.userList[uid].isCalling) {
          this.panel_show.is_dialog_show = true
        }
      }
    },
    // 修改用户名
    changeUserName: function (data) {
      // this.$sockect.emit('changeUserName',data)
    },
    // 更新已读
    toRead: function (msgIds, userId) {
      this.userList[userId].isCalling = false
      // this.$sockect.emit('toReadMsg', $msgIds)
    },
    // 打开历史记录
    openHistory: function (uid) {
      this.historyUid = uid
      this.getMoreMsg(uid)
      this.panel_show.is_history_show = true
    },
    // 更新索引
    updateIndex: function (index) {
      this.sessionIndex = index
    },
    delSession: function (index) {
      this.sessionList.splice(index, 1)
      this.sessionIndex = 0
      store.update({sessionList: this.sessionList})
    },
    isCalling (userList) {
      for (var uid in userList) {
        if (userList[uid].isCalling) return true
      }
      return false
    },
    // 更新本地存储
    updateData: function (data) {
      if (data.hasOwnProperty('user')) {
        this.user = data.user
      }
      if (data.hasOwnProperty('userList')) {
        this.userList = data.userList
      }
      if (data.hasOwnProperty('companyList')) {
        this.companyList = data.companyList
      }
      if (data.hasOwnProperty('groupList')) {
        this.groupList = data.groupList
      }
      if (data.hasOwnProperty('sessionList')) {
        this.sessionList = data.sessionList
      }
      if (data.hasOwnProperty('historyList')) {
        this.historyList = data.historyList
      }
    },
    // 格式化时间
    _format: function (date, format) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
    },
    // 获取今天数据
    todayMsg: function (uid) {
      if (this.socket !== null) {
        // 判断当天历史记录是否有当天的
        var today = this._format(new Date(), 'yyyy-MM-dd')
        if (this.historyList.hasOwnProperty(uid) && this.historyList[uid].contents.some(item => item.date === today)) {
          var index = this.historyList[uid].contents.findIndex(item => item.date === today)
          var todayMsgs = this.historyList[uid].contents[index].items
          var sessIndex = this.sessionList.findIndex(item => item.userId === uid)
          if (sessIndex < 0) {
            // 没找到
            this.sessionList.push({
              userId: uid,
              has_send_today: true,
              messages: todayMsgs.map(item => {
                return {messageId: item.messageId, text: item.content, date: item.createTime, self: item.self, is_read: item.is_read}
              })})
          } else {
            this.sessionList[sessIndex].has_send_today = true
            var userSessionList = todayMsgs.map(item => {
              return {messageId: item.messageId, text: item.content, date: item.createTime, self: item.self, is_read: item.is_read}
            })
            // 合并
            this.sessionList[sessIndex].messages.forEach(function (item) {
              if (userSessionList.messages.every(i => i.messageId !== item.messageId)) {
                userSessionList.messages.push(item)
              }
            })
            this.sessionList[sessIndex].messages = userSessionList.messages.sort(function (a, b) { return Date.parse(a.date) - Date.parse(b.date) })
          }
        } else {
          this.socket._getTodayMsg(uid)
        }
      }
    },
    // 获取历史数据
    getMoreMsg: function (uid) {
      if (this.historyList.hasOwnProperty(uid)) {
        if (!this.historyList[uid].is_all) {
          this.socket._getHistoryMsg(uid, this.historyList[uid].page + 1)
        }
      } else {
        // 初始化 historyList
        this.historyList[this.historyUid] = {is_all: false, page: 1, contents: []}
        this.socket._getHistoryMsg(uid, 1)
      }
    }
  }
})
