<template>
	<div id="vu_friend">
	    <div class="vu_m-search">
	      <input type="text" id="vu_search" placeholder="查找联系人" @keyup.enter="search" />
	      <div @click="search"></div>
	      <p><span @click="close"></span></p>
	    </div>
	    <div class="vu_account-l vu_fl">
	      <!--切换-->
	      <ul class="vu_m_lei">
	      	<li v-for="(item,index) in tabData" @click="clickTab(index)" :class="{'vu_m-active':index == activeIndex}">
				<img v-show="index!=activeIndex" :src="item.imgSrc" alt="" />
				<img v-show="index ==activeIndex" :src="item.activeImgSrc" alt="" />
			</li>
	        <div class="vu_m-add">
	          <p @click="toggle">+</p>
	          <ul v-show="groupShow">
	            <li class="vu_fen-active" @click="createGroup('common')">创建新组</li>
	            <li @click="createGroup('group')">创建群发组</li>
	          </ul>
	        </div>
	      </ul>
	      <!--个人组-->
	      <companyPanel v-show="panelShow.companyShow" :user="user" :userList="userList" :companyList="companyList" @openChartEvent="openChat" @changeUserNameEvent="changeUserName"></companyPanel>
	      <!--//群组-->
	      <div id="vu_qun-fen" class="vu_accordion vu_qie_div" v-show="panelShow.groupShow">
	        <div class="vu_qunfen_yi">
	          <p>普通组</p>
	          <groupPanel group_type="common" :user="user" :userList="userList" :companyList="groupList.common" @openChartEvent="openChat" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup"></groupPanel>
	        </div>
	        <div class="vu_qunfen_er">
	          <p>群发组</p>
	          <groupPanel group_type="groupHair" :user="user" :userList="userList" :companyList="groupList.groupHair" @openChartEvent="openChat" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup"></groupPanel>
	        </div>
	      </div>
	    </div>
	    <!--搜索页面-->
	    <searchDialog v-show="panelShow.searchShow" :searchList="searchList" @openChartEvent="openChat"></searchDialog>
	</div>
</template>
<script>
import companyPanel from './friend_list/Company'
import groupPanel from './friend_list/Group'
import searchDialog from './friend_list/Search'
import $ from 'jquery'

export default {
  name: 'FriendList',
  props: ['user', 'userList', 'companyList', 'groupList'],
  data: function () {
    return {
      activeIndex: 0,
      panelShow: {
        companyShow: true, // 公司分组面板默认显示
        groupShow: false, // 群分组面板是否显示
        searchShow: false // 搜索面板是否显示
      },
      current_active: 0,
      groupShow: false,
      searchList: [],
      tabData: [
        {
          imgSrc: require('../images/chat.png'),
          activeImgSrc: require('..//images/m-chat.png')
        },
        {
          imgSrc: require('../images/group.png'),
          activeImgSrc: require('../images/m-group.png')
        }]
    }
  },
  components: {companyPanel, groupPanel, searchDialog},
  watch: { },
  methods: {
    // 切换
    clickTab: function (index) {
      this.activeIndex = index
      if (index === 0) {
        this.panelShow.companyShow = true
        this.panelShow.groupShow = false
        this.panelShow.searchShow = false
      } else {
        this.panelShow.companyShow = false
        this.panelShow.groupShow = true
        this.panelShow.searchShow = false
      }
    },
    // 搜索事件
    search: function (event) {
      var searchKey = $('#vu_search').val()
      if (searchKey === '') {
        this.panelShow.searchShow = false
      } else {
        this.searchList = []
        for (var uid in this.userList) {
          var item = this.userList[uid]
          if (item.name.indexOf(searchKey) > -1) {
            this.searchList.push(item)
          }
        }
        this.panelShow.searchShow = true
      }
    },
    // 关闭事件
    close: function (event) {
      this.$emit('closeEvent', {
        is_friend_show: false,
        is_dialog_show: false,
        is_history_show: false,
        is_group_show: false
      })
      this.panelShow.searchShow = false
    },
    // 创建组事件
    createGroup: function (type) {
      this.$emit('openGroupEvent', type)
      this.groupShow = false
    },
    openChat: function (uid) {
      this.$emit('openTalkEvent', uid)
    },
    toggle: function () {
      this.groupShow = !this.groupShow
    },
    changeUserName: function (data) {
      this.$emit('changeUserNameEvent', data)
    },
    delGroup: function (groupId, groupType) {
      this.$emit('delGroupEvent', groupId, groupType)
    }
  }
}
</script>
