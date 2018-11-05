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
import 'bootstrap'
import 'bootstrap-table'

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
      is_dialog_show: false,
      is_history_show: false,
      is_group_show: false,
      is_qun_show: false
    },
    // 登录用户
    user: serverData.user,
    // 被关注人员的公司分组
    companyList: serverData.companyList,
    // 盯盘或者被关注用户ids
    followList: serverData.followList,
    // 默认群发组用户ids
    groupHairUsers: serverData.groupHairUsers,
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
    // 最近聊天列表
    recentList: serverData.recentList,
    // 竞价或者询价列表
    bidList: serverData.bidList,
    // 历史记录列表
    historyList: serverData.historyList,
    // 当前历史记录用户id
    historyUid: {id: 0, type: 'user'},
    // 当前详情cms弹框
    currentCms: null,
    // 推送资讯
    popCms: null,
    // 大厅成员列表
    onlineUserList: serverData.onlineUserList,
    // 验证消息
    verifyMsg: serverData.verifyMsg,
    // 搜索key
    search: '',
    // 群发是否解析报价
    is_parse_price: false,
    // 选中的会话Index
    sessionIndex: 0,
    // 默认创建分组
    groupType: 'common',
    // 群发消息内容
    groupMsg: '',
    // 群发消息对象
    targetObj: null,
    // socket
    socket: null,
    // 是否是临时消息
    is_temp: false,
    // 乙二醇种类
    chooseCatalog:0,
    // 全部成员
    chat_hall_members: _chat_hall_members,
    // 全部快讯消息
    match_hall_cms:match_hall_cms,
      //全部种类
      match_hall_catalogs:match_hall_catalogs,
      //全部公司
      match_hall_companies:match_hall_companies
  },
  // sockets: {
  // 所有sockect 事件放在这
  //  connect: function(){
  //   }
  // 发送emit用:this.$scoket.emit(key,val)
  // },
  components: {friendList, chatdialog, historylist, groupdialog, qunnew,echart,leftlist},
  template: `<div id="chat_app">
  				<div class="loader"></div>
  				<div class="vue-head"><a :href="'/'+user.plat+'/index/index'"><span></span>返回系统主页</a>	<span><a href="#" class="Vue_souye">直播间首页</a><a class="Vue_meg" href="/pindao" target="_blank">MEG资讯</a></span></div>
  			<div class="room_homepage">
		    <friendList v-show="panel_show.is_friend_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" :groupList="groupList" :followList="followList" :verifyMsg="verifyMsg" :recentList="recentList" @openGroupEvent="openGroup" @openTalkEvent="openTalk" @closeEvent="closePanel" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup" @delPersonEvent="delPerson" @modifyGroupEvent="modifyGroupName" @receiveFriendEvent="receiveFriend" @moveFriendEvent="moveFriend" @delSessionEvent="delSessionn" @todayMsgEvent="todayMsg"></friendList>
		    <div id="vue_main_main">
		    <echart :user="user" :userList="userList" :bidList="bidList" :groupList="groupList" :companyLists="companyList" :match_hall_catalogs="match_hall_catalogs" :match_hall_companies="match_hall_companies" @sendGroupMsgEvent="sendGroupMsg" @createGroupEvent="createGroup" @delGroupEvent="delGroup" @saveGroupEvent="saveGroup"  @modifyGroupEvent="modifyGroupName"></echart>
		    <chatdialog v-show="panel_show.is_dialog_show" :user="user" :userList="userList" :sessionList="sessionList" :sessionIndex="sessionIndex" :groupList="groupList" @closeEvent="closePanel" @delSessionEvent="delSession" @toReadEvent="toRead" @openHistoryEvent="openHistory" @updateIndexEvent="updateIndex" @todayMsgEvent="todayMsg" @chatEvent="toChat" @addFriendEvent="addFriend" ></chatdialog>
		    <historylist ref="childhistory" v-show="panel_show.is_history_show" :user="user" :userList="userList" :hList="historyList" :historyUid="historyUid" @closeEvent="closePanel" @getMoreMsgEvent="getMoreMsg"></historylist>
				<groupdialog v-show="panel_show.is_group_show" :user="user" :userList="userList" :groupType="groupType" @createGroupEvent="createGroup" @closeEvent="closePanel"></groupdialog>
				<qunnew v-show="panel_show.is_qun_show" :user="user" :userList="userList" :companyList="companyList" :groupMsg="groupMsg" :groupList="groupList" @createGroupEvent="createGroup" @closeEvent="closePanel" @sendGroupMsgEvent="sendGroupMsg" ></qunnew>
				<p class="vue_m_m_foot">Copyright©2017 - 2022 沪ICP备16041384号-2</p>
				</div></div>
				<leftlist :match_hall_cms="match_hall_cms" :chat_hall_members="chat_hall_members" :user="user" :currentCms="currentCms" :popCms="popCms" :onlineUserList="onlineUserList"  :userList="userList" @openTempTalkEvent="openTempTalk"  @addFriendEvent="addFriend" @getCmsDetailEvent="getCmsDetail"></leftlist>
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
    recentList: {
      deep: true,
      handler () {
        store.update({recentList: this.recentList})
      }
    },
    bidList: {
      deep: true,
      handler () {
        store.update({bidList: this.bidList})
      }
    },
    qunList: {
      deep: true,
      handler () {
        store.update({qunList: this.qunList})
      }
    },
    popCms: {
      deep: true,
      handler () {
      	setTimeout(function(){
      		$('.vue_left_message').css('display','block')
      		$('.vue_left_message').attr('id','vue-message')
      	},.5)
        setTimeout(function(){
        	$('.vue_left_message').removeAttr('id')
        	$('.vue_left_message').css('display','none')
        },4000)
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
    },
    groupHairUsers: {
      deep: true,
      handler () {
        store.update({groupHairUsers: this.groupHairUsers})
      }
    },
    companyList: {
      deep: true,
      handler () {
        store.update({companyList: this.companyList})
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
    // 打开临时会话
    openTempTalk: function (uid) {
      // 将在线用户添加到用户列表
      if (!this.userList.hasOwnProperty(uid)) {
        if (this.onlineUserList.hasOwnProperty(uid)) {
          var userList = this.userList
          var userItem = this.onlineUserList[uid]
          userItem.isCalling = 0
          userItem.isOnline = 1
          userItem.friend_type = 'online'
          userList[uid] = userItem
          this.updateData({userList: userList})
        } else {
          var userList = this.userList
          for(var index in this.chat_hall_members){
            if(this.chat_hall_members[index].id==uid){
              var userItem = this.chat_hall_members[index];
              break;
            }
          }
          userItem.isCalling = 0
          userItem.isOnline = 0
          userItem.friend_type = 'offline'
          userList[uid] = userItem
          this.updateData({userList: userList})
        }
      }
      this.is_temp = true
      this.openTalk(uid, 'user')
    },
    // 发送好友验证
    addFriend: function (uid, msg) {
      this.socket._addFreind(uid, msg);
    },
    // 打开对话框
    openTalk: function (uid, idType) {
      if (this.sessionList.some(function (item) { return idType === item.type && item.id === uid })) {
        this.sessionList.sort(function (first, second) { if (idType === first.type && first.id === uid) { return -1 } else if (idType === second.type && second.id === uid) { return 1 } else { return 0 } })
      } else {
        var delIndex = this.delSessionList.findIndex(item => idType === item.type && item.id === uid)
        if (delIndex < 0) {
          var addSessionData = {
            id: uid,
            type: idType,
            has_send_today: false,
            messages: []
          }
          this.sessionList.unshift(addSessionData)
          // 没有数据发送获取今日数据
          this.todayMsg(addSessionData)
        } else {
          var findSessionData = this.delSessionList[delIndex]
          this.delSessionList.splice(delIndex, 1)
          this.sessionList.unshift(findSessionData)
        }
      }
      if (idType === 'user' && this.userList[uid].isCalling === true) {
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
    // 接收拒绝验证
    receiveFriend: function (msgId, isAgree) {
      this.socket._toReceiveFreind(msgId, isAgree)
    },
    // 获取资讯详情
    getCmsDetail: function (cmsId) {
      this.socket._getCmsDetail(cmsId)
    },
    // 移动用户到其他分组
    moveFriend: function (friendId, groupId, toGroupId) {
      this.socket._moveFriendGroup(friendId, groupId, toGroupId);
    },
    // 修改用户名
    changeUserName: function (data) {
      this.socket._changeGroupUserName(data);
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
    openHistory: function (uid, type) {
      this.historyUid = {id: uid, type: type}
      this.panel_show.is_history_show = true
      this.getMoreMsg(uid, type)
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
    delSessionn: function (index) {
      this.delSessionList.push(this.recentList[index])
      this.recentList.splice(index, 1)
      this.sessionIndex = 0
      store.update({recentList: this.recentList, delSessionList: this.delSessionList})
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
      if (data.hasOwnProperty('recentList')) {
        this.recentList = data.recentList
      }
      if (data.hasOwnProperty('bidList')) {
        this.bidList = data.bidList
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
      if (data.hasOwnProperty('groupHairUsers')) {
        this.groupHairUsers = data.groupHairUsers
      }
      if (data.hasOwnProperty('companyList')) {
        this.companyList = data.companyList
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
        this.socket._getTodayMsg(session.id, startTime, session.type === 'user' ? 'single_chat' : 'group_chat')
      }
    },
    // 获取历史数据
    getMoreMsg: function (uid, type) {
      if (this.historyList.hasOwnProperty(type) && this.historyList[type].hasOwnProperty(uid)) {
        if (!this.historyList[type][uid].is_all) {
          if (this.socket !== null) {
            this.socket._getHistoryMsg(uid, this.historyList[type][uid].page + 1, type)
          }
        }
      } else {
        // 初始化 historyList
        if (this.socket !== null) {
          this.socket._getHistoryMsg(uid, 1, type)
        }
      }
    },
    // 聊天发送数据
    toChat: function (toUid, msg, isTemp) {
      if (this.socket !== null) {
        this.socket._sendMsg(toUid, msg, isTemp)
      }
      this.is_temp = false
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
    sendGroupMsg: function (uids, msg, isParsePrice) {
      if (this.socket !== null) {
        this.is_parse_price = isParsePrice
        this.socket._sendGroupHair(uids, msg, isParsePrice)
      }
    },
    // 保存分组人员
    saveGroup: function (groupId,groupType,uids) {
      if (this.socket !== null) {
        this.socket._save_group_person(groupId,groupType,uids)
      }
    }
  }
})
