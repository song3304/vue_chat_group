// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueSocketio from 'vue-socket.io'
import 'font-awesome/css/font-awesome.css'
import store from './js/store'
import friendList from './components/FriendList'
import chatdialog from './components/ChatDialog'
import historylist from './components/HistoryList'
import groupdialog from './components/GroupDialog'
import echart from './components/Echart'
import qunnew from './components/QunNew'
import leftlist from './components/Leftlist'
import './css/chat_index.css'
import './css/chat_leftnav.css'
import './css/jquery-ui.min.css'
import './js/jquery-ui.min.js'
import 'babel-polyfill'
import 'jquery'
import 'jquery.nicescroll'

Vue.config.productionTip = false

// Vue.use(VueSocketio, 'http://localhost:8007')
let serverData = store.fetch()
/* eslint-disable no-new */
new Vue({
  el: '#chat_app',
  data: {
    // 控制面板是否显示
    panel_show: {
      is_friend_show: true,
      is_dialog_show: true,
      is_history_show: false,
      is_group_show: false,
      is_qun_show: false
    },
    // 登录用户
    user: serverData.user,
    // 盯盘或者被关注用户ids
    followList: serverData.followList,
    // 用户列表
    userList: serverData.userList,
    // 群聊
    qunList: serverData.qunList,
    // 分组列表
    groupList: serverData.groupList,
    // 会话列表
    sessionList: serverData.sessionList,
    // 保存已删除会话列表
    delSessionList: serverData.delSessionList,
    // 历史记录列表
    historyList: serverData.historyList,
    // 当前历史记录用户id
    historyUid: 0,
    // 大厅成员列表
    onlineUserList: serverData.onlineUserList,
    // 验证消息
    verifyMsg: serverData.verifyMsg,
    // 搜索key
    search: '',
    // 选中的会话Index
    sessionIndex: 0,
    // 默认创建分组
    groupType: 'common',
    // 群发消息内容
    groupMsg: '',
    // 群发消息对象
    targetObj: null,
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
  components: {friendList, chatdialog, historylist, groupdialog, qunnew,echart,leftlist},
  template: `<div id="chat_app">
  				<div class="vue-head"><span></span></div>
		    <friendList v-show="panel_show.is_friend_show" :user="user" :userList="userList" :groupList="groupList" @openGroupEvent="openGroup" @openTalkEvent="openTalk" @closeEvent="closePanel" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup" @delPersonEvent="delPerson" @modifyGroupEvent="modifyGroupName"></friendList>
		    <div id="vue_main_main">
		    <echart></echart>
		    <chatdialog v-show="panel_show.is_dialog_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" @closeEvent="closePanel" @delSessionEvent="delSession" @toReadEvent="toRead" @openHistoryEvent="openHistory" @updateIndexEvent="updateIndex" @todayMsgEvent="todayMsg" @chatEvent="toChat"></chatdialog>
		    <historylist ref="childhistory" v-show="panel_show.is_history_show" :user="user" :userList="userList" :hList="historyList" :historyUid="historyUid" @closeEvent="closePanel" @getMoreMsgEvent="getMoreMsg"></historylist>
				<groupdialog v-show="panel_show.is_group_show" :user="user" :userList="userList" :groupType="groupType" @createGroupEvent="createGroup" @closeEvent="closePanel"></groupdialog>
				<qunnew v-show="panel_show.is_qun_show" :user="user" :userList="userList" :groupMsg="groupMsg" :groupList="groupList" @createGroupEvent="createGroup" @closeEvent="closePanel" @sendGroupMsgEvent="sendGroupMsg" ></qunnew>
				<p class="vue_m_m_foot">Copyright©2017 - 2022 沪ICP备16041384号-2</p>
				</div>
				<leftlist :onlineUserList="onlineUserList"></leftlist>
				</div>`,
  created: function () {
    // 初始化数据 套接字
    if (typeof (socketGroupChat) !== 'undefined' && typeof (_chat_user) !== 'undefined' && _chat_user.id != 1) {
      this.socket = new socketGroupChat(this, _chat_user)
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
    delSessionList: {
      deep: true,
      handler () {
        store.update({delSessionList: this.delSessionList})
      }
    },
    qunList: {
      deep: true,
      handler () {
        store.update({qunList: this.qunList})
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
    },
    verifyMsg: {
      deep: true,
      handler () {
        store.update({verifyMsg: this.verifyMsg})
      }
    },
    onlineUserList: {
      deep: true,
      handler () {
        store.update({onlineUserList: this.onlineUserList})
      }
    },
    followList: {
      deep: true,
      handler () {
        store.update({followList: this.followList})
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
      if (this.socket !== null) {
        this.socket._create_group(data.groupName, data.groupType, data.userIds)
      }
    },
    // 打开对话框
    openTalk: function (uid) {
      if (this.sessionList.some(function (item) { return item.userId === uid })) {
        this.sessionList.sort(function (first, second) { if (first.userId === uid) { return -1 } else if (second.userId === uid) { return 1 } else { return 0 } })
      } else {
        var delIndex = this.delSessionList.findIndex(item => item.userId === uid)
        if (delIndex < 0) {
          var addSessionData = {
            userId: uid,
            has_send_today: false,
            messages: []
          }
          this.sessionList.unshift(addSessionData)
        } else {
          var findSessionData = this.delSessionList[delIndex]
          this.delSessionList.splice(delIndex, 1)
          this.sessionList.unshift(findSessionData)
        }
      }
      if (this.userList[uid].isCalling === true) {
        this.userList[uid].isCalling = false
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
      if (data.hasOwnProperty('is_qun_show')) {
        this.panel_show.is_qun_show = data.is_qun_show
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
    toRead: function (msgIds, userId, type) { // type:[single_chat->个人消息,group_chat->群聊消息]
      this.userList[userId].isCalling = false
      if (msgIds.length > 0) {
        if (this.socket !== null) { // type = [user or qun]
          this.socket._toReadMsg(userId, msgIds, type === 'user' ? 'single_chat' : 'group_chat')
        }
      }
    },
    // 打开历史记录
    openHistory: function (uid) {
      this.historyUid = uid
      this.panel_show.is_history_show = true
      this.getMoreMsg(uid)
    },
    // 更新索引
    updateIndex: function (index) {
      this.sessionIndex = index
    },
    delSession: function (index) {
      this.delSessionList.push(this.sessionList[index])
      this.sessionList.splice(index, 1)
      this.sessionIndex = 0
      store.update({sessionList: this.sessionList, delSessionList: this.delSessionList})
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
      if (data.hasOwnProperty('onlineUserList')) {
        this.onlineUserList = data.onlineUserList
      }
      if (data.hasOwnProperty('groupList')) {
        this.groupList = data.groupList
      }
      if (data.hasOwnProperty('qunList')) {
        this.qunList = data.qunList
      }
      if (data.hasOwnProperty('sessionList')) {
        this.sessionList = data.sessionList
      }
      if (data.hasOwnProperty('delSessionList')) {
        this.delSessionList = data.delSessionList
      }
      if (data.hasOwnProperty('historyList')) {
        this.historyList = data.historyList
        this.$refs.childhistory.$forceUpdate()
      }
      if (data.hasOwnProperty('verifyMsg')) {
        this.verifyMsg = data.verifyMsg
      }
      if (data.hasOwnProperty('followList')) {
        this.followList = data.followList
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
    // 获取更多数据
    todayMsg: function (session) {
      if (this.socket !== null) {
        var startTime = this._format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        session.messages.forEach(message => { startTime = startTime > message.date ? message.date : startTime })
        this.socket._getTodayMsg(session.userId, startTime)
      }
    },
    // 获取历史数据
    getMoreMsg: function (uid) {
      if (this.historyList.hasOwnProperty(uid)) {
        if (!this.historyList[uid].is_all) {
          if (this.socket !== null) {
            this.socket._getHistoryMsg(uid, this.historyList[uid].page + 1)
          }
        }
      } else {
        // 初始化 historyList
        if (this.socket !== null) {
          this.socket._getHistoryMsg(uid, 1)
        }
      }
    },
    // 聊天发送数据
    toChat: function (toUid, msg) {
      if (this.socket !== null) {
        this.socket._sendMsg(toUid, msg)
      }
    },
    // 删除分组
    delGroup: function (gid, gtype) {
      if (this.socket !== null) {
        this.socket._del_group(gid, gtype)
      }
    },
    // 删除好友
    delPerson: function (gid, gtype, uid) {
      if (this.socket !== null) {
        this.socket._del_person(gid, gtype, uid)
      }
    },
    // 修改组名
    modifyGroupName: function (gid, gtype, gname) {
      if (this.socket !== null) {
        this.socket._modify_group_name(gid, gtype, gname)
      }
    },
    // 打开群发窗口
    openGroupHair: function (msg, _targetObj) {
      this.groupMsg = msg
      this.targetObj = _targetObj
      this.panel_show.is_qun_show = true
    },
    // 触发群发
    sendGroupMsg: function (uids, msg) {
      if (this.socket !== null) {
        this.socket._sendGroupHair(uids, msg)
      }
    }
  }
})
