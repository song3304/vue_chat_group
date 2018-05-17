<template>
	<div id="friend">
	    <div class="m-search">
	      <input type="text" id="search" placeholder="查找联系人" v-model="seachKey" />
	      <div @click="search"></div>
	      <p><span @click="close"></span></p>
	    </div>
	    <div class="account-l fl">
	      <!--切换-->
	      <ul class="m_lei">
	        <li class=" {current_active == 'company'?' m-active':''}" @click="choose('company')"><img src="../images/m-chat.png" /></li>
	        <li class=" {current_active == 'group'?' m-active':''}" @click="choose('group')"><img src="../images/group.png" /></li>
	        <div class="m-add">
	          <p @click="toggle">+</p>
	          <ul v-show="groupShow">
	            <li class="fen-active" @click="createGroup('common')">创建新组</li>
	            <li @click="createGroup('group')">创建群发组</li>
	          </ul>
	        </div>
	      </ul>
	      <!--个人组-->
	      <companyPanel v-show="panelShow.companyShow" :user="user" :userList="userList" :companyList="companyList"></companyPanel>
	      <!--//群组-->
	      <div id="qun-fen" class="accordion qie_div" v-show="panelShow.groupShow">
	        <div class="qunfen_yi">
	          <p>普通组</p>
	          <groupPanel group_type="common" :user="user" :userList="userList" :companyList="groupList.common"></groupPanel>
	        </div>
	        <div class="qunfen_er">
	          <p>群发组</p>
	          <groupPanel group_type="group" :user="user" :userList="userList" :companyList="groupList.groupHair"></groupPanel>
	        </div>
	      </div>
	    </div>
	    <!--搜索页面-->
	    <searchDialog v-show="panelShow.searchShow" :serchList="searchList"></searchDialog>
	</div>
</template>
<script>
import companyPanel from './friend_list/Company'
import groupPanel from './friend_list/Group'
import searchDialog from './friend_list/Search'

export default {
  name: 'FriendList',
  props: ['user', 'userList', 'companyList', 'groupList'],
  data: function() {
    return {
      panelShow: {
        companyShow: true, //公司分组面板默认显示
        groupShow: false, //群分组面板是否显示
        searchShow: false //搜索面板是否显示
      },
      current_active: 'company',
      groupShow: false,
      seachKey: '',
      searchList: []
    }
  },
components: { companyPanel,groupPanel,searchDialog},
  watch: {
    searchKey: function(newValue) {
      this.searchList = [];
      for (var i = 0, lg = this.userList.length; i < lg; i++) {
        var item = this.userList[i];
        if (tem.name.indexOf(newValue) > -1) {
          this.searchList.push(item);
        }
      }
    }
  },
  methods: {
    // 搜索事件
    search: function(event) {
      this.panelShow.companyShow = false;
      this.panelShow.groupShow = false;
      this.panelShow.searchShow = true;
    },
    // 关闭事件
    close: function(event) {
      this.$emit('closeEvent', {
        is_friend_show: false,
        is_dialog_show: false,
        is_history_show: false,
        is_group_show: false,
      });
      this.panelShow.searchShow = false;
      this.panelShow.groupShow = false;
      this.panelShow.companyShow = true;
    },
    // 切换
    choose: function(type) {
      this.current_active = type;
      if (type == 'company') {
        this.panelShow.companyShow = true;
        this.panelShow.groupShow = false;
        this.panelShow.searchShow = false;
       	
      } else {
        this.panelShow.companyShow = false;
        this.panelShow.groupShow = true;
        this.panelShow.searchShow = false;
      }
    },
    // 创建组事件
    createGroup: function(type) {
//    this.panelShow.groupShow = false;
      this.$emit('openGroupEvent', type);
      this.groupShow=false;
    },
    toggle(){
    	this.groupShow=!this.groupShow;
    },
    
  }
}

</script>
