<template>
	<div id="vu_friend" @click="chuangjian">
	    <!--<div class="vu_m-search">
	      <input type="text" id="vu_search" placeholder="查找联系人" @keyup.enter="search" />
	      <div @click="search"></div>
	      <p><span ></span></p>
	    </div>-->
	    <div class="vu_account-l vu_fl">
	      <!--切换-->
	      <ul class="vu_m_lei">
	      	<li v-for="(item,index) in tabData" @click="clickTab(index)" :class="{'vu_m-active':index == activeIndex}">
				<img v-show="index!=activeIndex" :src="item.imgSrc" alt="" />
				<img v-show="index ==activeIndex" :src="item.activeImgSrc" alt="" />
				<span>{{item.activSpan}}</span>
			</li>
	        <!--<div class="vu_m-add">
	          <p @click="toggle">+</p>
	          <ul v-show="groupShow">
	            <li @click="createGroup('common')">创建新组</li>
	            
	          </ul>
	        </div>-->
	      </ul>
	      <!--聊天-->
	      <div v-show="panelShow.chatShow"></div>
	      <!--//分组-->
	      <div id="vu_qun-fen" class="vu_accordion vu_qie_div" v-show="panelShow.companyShow">
	      	<div class="vu_qunfen_new">
	      		<div @click="createGroup('common')">+  新建分组</div>
	      	</div>
	        <div class="vu_qunfen_yi">
	          <!--p>普通组</p-->
	          <groupPanel group_type="common" :user="user" :userList="userList" :companyList="groupList.common" @openChartEvent="openChat" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup" @delPersonEvent="delPerson" @modifyGroupEvent="modifyGroupName"></groupPanel>
	        </div>
	        <!--div v-if="user.plat=='match'" class="vu_qunfen_er">
	          <p>群发组</p>
	          <groupPanel group_type="groupHair" :user="user" :userList="userList" :companyList="groupList.groupHair" @openChartEvent="openChat" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup" @delPersonEvent="delPerson" @modifyGroupEvent="modifyGroupName"></groupPanel>
	        </div-->
	      </div>
	      <!--群组-->
	      <companyPanel v-show="panelShow.groupShow" :user="user" :userList="userList" :companyList="companyList" @openChartEvent="openChat" @changeUserNameEvent="changeUserName"></companyPanel>
	      
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
        chatShow: true,
        companyShow:false,// 公司分组面板是否显示
        groupShow: false, // 群分组面板是否显示
        searchShow: false // 搜索面板是否显示
      },
      current_active: 0,
      groupShow: false,
      searchList: [],
      tabData: [
        {
          imgSrc: require('../images/m-chat.png'),
          activeImgSrc: require('../images/chat.png'),
          activSpan:'聊天'
        },
        {
          imgSrc: require('../images/group.png'),
          activeImgSrc: require('../images/m-group.png'),
          activSpan:'分组'
        },
        {
          imgSrc: require('../images/qun.png'),
          activeImgSrc: require('../images/m-qun.png'),
          activSpan:'群'
        }],
      createType: 'common',
    }
  },
  components: {companyPanel, groupPanel, searchDialog},
  watch: { },
  methods: {
    // 切换
    clickTab: function (index) {
      this.activeIndex = index
      if (index === 0) {
      	this.panelShow.chatShow = true
        this.panelShow.companyShow = false
        this.panelShow.groupShow = false
        this.panelShow.searchShow = false
        $('.vu_m-list').show()
      } else if(index == 1){
        this.panelShow.chatShow = false
        this.panelShow.companyShow = true
        this.panelShow.groupShow = false
        this.panelShow.searchShow = false
        $('.vu_m-list').hide()
      }else{
      	this.panelShow.chatShow = false
        this.panelShow.companyShow = false
        this.panelShow.groupShow = false   //群隐藏
        this.panelShow.searchShow = false
        $('.vu_m-list').hide()
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


    // 创建组事件
    createGroup: function (type) {
      this.createType = type
      this.$emit('openGroupEvent', type)
      this.groupShow = false
//    $('.vu_m-add ul li').attr('class', '')
//    $(this).attr('class', 'vu_fen-active')
    },
    openChat: function (uid) {
      this.$emit('openTalkEvent', uid)
    },
    toggle: function (event) {
      event.stopPropagation()
      this.groupShow = !this.groupShow
    },
    changeUserName: function (data) {
      this.$emit('changeUserNameEvent', data)
    },
    chuangjian: function () {
      this.groupShow = false
    },
    delGroup: function (groupId, groupType) {
      this.$emit('delGroupEvent', groupId, groupType)
    },
    delPerson: function (groupId, groupType, uid) {
      this.$emit('delPersonEvent', groupId, groupType, uid)
    },
    modifyGroupName: function (groupId, groupType, groupName) {
      this.$emit('modifyGroupEvent', groupId, groupType, groupName)
    }
  },
}
</script>
