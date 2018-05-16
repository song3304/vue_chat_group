// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueSocketio from 'vue-socket.io'
import store from './js/store'
import friendList from './components/FriendList'
import chat-dialog from './components/ChatDialog'
import history-list from './components/HistoryList'
import group-dialog from './components/GroupDialog'
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
  components: {}, // friendList, chat-dialog, history-list, group-dialog
  template: `<div id="chat_app">
    <div id="chitchat">
      <p></p>
      <span>私信<br>聊天</span>
    </div>
     <friendList v-show="panel_show.is_friend_show" v-bind:user="user" v-bind:userList="userList" v-bind:companyList="companyList" v-bind:groupList="groupList" @openGroupEvent="openGroup" @openTalkEvent="openTalk" @closeEvent="closePanel"></frienList>
    <chat-dialog v-show="panel_show.is_dialog_show" v-bind:user="user" v-bind:sessionList="sessionList"></chat-dialog>
    <history-list v-show="panel_show.is_history_show" v-bind:user="user" v-bind:historyList="historyList" v-bind:historyUid="historyUid"></history-list>
    <group-dialog v-show="panel_show.is_group_show" v-bind:user="user" v-bind:userList="userList" v-bind:companyList="companyList" v-bind:groupType="groupType" @createGroupEvent="createGroup"></group-dialog>
</div>`,
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
})
