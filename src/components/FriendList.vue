<template>
	<div id="vu_friend" @click="chuangjian" > 		
	    <!--<div class="vu_m-search">
	      <input type="text" id="vu_search" placeholder="查找联系人" @keyup.enter="search" />
	      <div @click="search"></div>
	      <p><span ></span></p>
	    </div>-->
	    <div class="vu_account-l vu_fl" @mouseover="vue_frit" @mouseleave="vue_frie">
	      <!--切换-->
	      <ul class="vu_m_lei">
	      	<li v-for="(item,index) in tabData" @click="clickTab(index)"  :class="{'vu_m-active':index == activeIndex}">
				<img v-show="index!=activeIndex" :src="item.imgSrc" alt="" />
				<img v-show="index ==activeIndex" :src="item.activeImgSrc" alt="" />
				<span>{{item.activSpan}}</span>
			</li>
			<div class="vue_new_news"></div>  <!--有新加好友就显示-->
	        <!--<div class="vu_m-add">
	          <p @click="toggle">+</p>
	          <ul v-show="groupShow">
	            <li @click="createGroup('common')">创建新组</li>

	          </ul>
	        </div>-->
	      </ul>
	      <!--聊天-->
	      <div v-show="panelShow.chatShow" class="vu_liaotian_left">
	      	<hisPanel :session="session" :user="user" :userList="userList" :companyList="companyList" :recentList="recentList" :sessionList="sessionList" @todayMsgEvent="todayMsg" @openChartEvent="openChat" @delSessionEvent="delSessionn" @toReadEvent="toRead"></hisPanel>
	      </div>
	      <!--//分组-->
	      <div id="vu_qun-fen" class="vu_accordion vu_qie_div" v-show="panelShow.companyShow">
	      	<div class="vue_qun_fen_main">
	      		<div class="vue_qun_fentitle">
	      			<span class="vue_qun_fentitle_active" @click="qun_com_mon">普通组</span>
	      			<span @click="qun_qun_fa">群发组</span>
	      			<div @click="createGroup('common')"  v-show="vue_new_putong">+  新建</div>
	      			<div @click="creatQunfen" v-show="vue_new_qunfa">+  新建</div>
	      		</div>
	      		<div class="vue_qun_common" v-show="qun_common"> <!--普通组-->
	      			<!--<div class="vu_qunfen_new">
			      		
			      	</div>-->
			        <div class="vu_qunfen_yi">
			          <!--p>普通组</p-->
			          <groupPanel group_type="common" :user="user" :userList="userList" :companyList="groupList.common" :followList="followList" :verifyMsg="verifyMsg" @openChartEvent="openChat" @receiveFriendEvent="receiveFriend" @changeUserNameEvent="changeUserName" @delGroupEvent="delGroup" @delPersonEvent="delPerson" @modifyGroupEvent="modifyGroupName" @moveFriendEvent="moveFriend"></groupPanel>
			        </div>
	      		</div>
	      		<div class="vue_qun_qunfa" v-show="qun_qunfa"> <!--群发组-->
	      			<div class="vu_qunfen_er">
			          <qungroupPanel group_type="groupHair" :user="user" :userList="userList" :groupList="groupList" :companyList="groupList.groupHair" :followList="followList" @modifyGroupEvent="modifyGroupName" @delGroupEvent="delGroup"></qungroupPanel>
			       </div>
	      		</div>
	      		
	      	</div>
	      	
	      </div>
	      <!--群组-->
	      <companyPanel v-show="panelShow.groupShow" :user="user" :userList="userList" :companyList="companyList" @openChartEvent="openChat" @changeUserNameEvent="changeUserName"></companyPanel>

	    </div>
	    <!--搜索页面-->
	    <searchDialog v-show="panelShow.searchShow" :searchList="searchList" @openChartEvent="openChat"></searchDialog>
	    <!--群发报价-->
	    <!--<div class="vue_qun_offer">-->
	    	<!--<p></p>-->
	    	<!--<span>群发报价</span>-->
	    <!--</div>-->
	    <div class="vu_friend_tubiao vu_friend_xiao" @click="friend_tubiao" v-show="friendtubiao"></div>
	    <div class="vu_friend_tubiaoxiao vu_friend_xiao" @click="friend_tubiaoxiao" v-show="friendtubiaoxiao"></div>
	</div>
</template>
<script>
import companyPanel from './friend_list/Company'
import groupPanel from './friend_list/Group'
import searchDialog from './friend_list/Search'
import hisPanel from './friend_list/His'
import qungroupPanel from './friend_list/QunGroup'
import $ from 'jquery'

export default {
  name: 'FriendList',
  props: ['user', 'userList', 'companyList', 'groupList', 'followList','verifyMsg','recentList','sessionList','sessionIndex'],
  data: function () {
    return {
      activeIndex: 0,
      current_uerId: 0,
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
      friendtubiao:true,
      friendtubiaoxiao:false,
      qun_common:true,
      qun_qunfa:false,
      vue_new_putong:true,
      vue_new_qunfa:false,
      formData_qunfa: {
      	    groupId:0,
	        userIds: [],
	        groupName: ''
        },
    }
  },
  components: {companyPanel, groupPanel, searchDialog, hisPanel,qungroupPanel},
  computed: {
      session: function () {
        return this.sessionList.hasOwnProperty(this.sessionIndex) ? this.sessionList[this.sessionIndex] : null
      }
    },
  watch: {},
  methods: {
  	delSessionn: function (index) {
        this.$emit('delSessionEvent', index)
      },
  	todayMsg: function (session) {
        this.$emit('todayMsgEvent', session)
      },
    // 切换
    clickTab: function (index) {
      this.activeIndex = index
      if (index === 0) {
      	this.panelShow.chatShow = true
        this.panelShow.companyShow = false
        this.panelShow.groupShow = false
//      this.panelShow.searchShow = false
        $('.vu_m-list').show()
      } else if(index == 1){
        this.panelShow.chatShow = false
        this.panelShow.companyShow = true
        this.panelShow.groupShow = false
//      this.panelShow.searchShow = false
        $('.vue_new_news').hide()
      }else{
      	this.panelShow.chatShow = false
        this.panelShow.companyShow = false
        this.panelShow.groupShow = true   //群隐藏
//      this.panelShow.searchShow = false
      };
      this.friendtubiao = true
    	this.friendtubiaoxiao = false
    	$('#vu_friend').css('width','22.5%')
    	$('#vue_main_main').css('width','76.7%')
    	$('.vu_m_lei').removeClass('vu_m_leier')
    	$('.c_btn_box,.vue_qun_offf').removeClass('c_btn_boxer')
		var widtnn=$('#leftlist').width()
    	if(widtnn>0){
    		$('#vu_friend').css({'width':'22.6%'})
    	}else if(widtnn==0){
    		$('#vu_friend').css({'width':'18.5%'})
    		$('#vue_main_main').css('width','80.5%')
    	}
    	var realWidth=$("#myTabContent").width();        
    	$('.chart-pane,.chart-pane>div').width(realWidth*0.75-30);
    	$('.price-list').width(realWidth*0.25-30);
    	$(window).resize()
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
    },
    creatQunfen:function(){//打开新建群分组框
    	$('.vu_fenzu_name_input').attr('disabled',false)
    	$('.vue_baojia1').show()
    	var oDiv = document.getElementById('vu_baojia')
        localStorage.qunfak++
        oDiv.style.zIndex=localStorage.qunfak        
    },
    openChat: function (uid, idType) {
    	this.activeIndex = 0
	    this.panelShow.chatShow = true
        this.panelShow.companyShow = false
        this.panelShow.groupShow = false
//      this.panelShow.searchShow = false
      	this.$emit('openTalkEvent', uid, idType)
    },
    toggle: function (event) {
      event.stopPropagation()
      this.groupShow = !this.groupShow
    },
    changeUserName: function (data) {
      this.$emit('changeUserNameEvent', data)
    },
    receiveFriend: function (msgId, isAgree) {
      this.$emit('receiveFriendEvent', msgId, isAgree)
    },
    moveFriend: function (friendId, groupId, toGroupId) {
      this.$emit('moveFriendEvent', friendId, groupId, toGroupId)
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
    },
    friend_tubiao:function(){//点击缩
    	this.friendtubiao = false
    	this.friendtubiaoxiao = true
    	$('#vu_friend').css('width','5%')
    	$('#vue_main_main').css('width','94.2%')
    	$('.vu_m_lei').addClass('vu_m_leier')
    	$('.c_btn_box,.vue_qun_offf').addClass('c_btn_boxer')
    	$('#vu_qun-fen,#vu_accordion,.vu_liaotian_left').hide()
    	var widtnn=$('#leftlist').width()
    	if(widtnn>0){
    		$('#vu_friend').css({'width':'5%'})
    	}else if(widtnn==0){
    		$('#vu_friend').css({'width':'3%'})
    		$('#vue_main_main').css('width','96.2%')
    	}
    	var realWidth=$("#myTabContent").width();        
    	$('.chart-pane,.chart-pane>div').width(realWidth*0.75-30);
    	$('.price-list').width(realWidth*0.25-30); 
    	$(window).resize()
    },
    friend_tubiaoxiao:function(){//点击伸
    	this.friendtubiao = true
    	this.friendtubiaoxiao = false
    	$('#vu_friend').css('width','22.6%')
    	$('#vue_main_main').css('width','76.8%')
    	$('.vu_m_lei').removeClass('vu_m_leier')
    	$('.c_btn_box,.vue_qun_offf').removeClass('c_btn_boxer')
    	this.activeIndex=0
		this.panelShow.chatShow = true
        this.panelShow.companyShow = false
        this.panelShow.groupShow = false
//      this.panelShow.searchShow = false
        $('.vu_liaotian_left').show()
        var widtnn=$('#leftlist').width()
        if(widtnn>0){
    		$('#vu_friend').css({'width':'22.6%'})
    	}else if(widtnn==0){
    		$('#vu_friend').css({'width':'20%'})
    		$('#vue_main_main').css('width','79.3%')
    	}
    	var realWidth=$("#myTabContent").width();        
    	$('.chart-pane,.chart-pane>div').width(realWidth*0.75-30);
    	$('.price-list').width(realWidth*0.25-30);
    	$(window).resize()
	},
	vue_frit:function(){
	   		
	},
	vue_frie:function(){
	   	
	},
	qun_com_mon:function(event){ //普通组切换
		var el = event.currentTarget
		$('.vue_qun_fentitle span').removeClass('vue_qun_fentitle_active')
		$(el).addClass('vue_qun_fentitle_active')
		this.qun_common=true
		this.qun_qunfa=false
		this.vue_new_putong=true
		this.vue_new_qunfa=false
	},
	qun_qun_fa:function(event){ //群发组切换
		var el = event.currentTarget
		$('.vue_qun_fentitle span').removeClass('vue_qun_fentitle_active')
		$(el).addClass('vue_qun_fentitle_active')
		this.qun_common=false
		this.qun_qunfa=true
		this.vue_new_putong=false
		this.vue_new_qunfa=true
	},
	toRead: function(recentItem) { //已读
		var msgIds = []
		msgIds.push(recentItem.message.messageId)
		this.$emit('toReadEvent',msgIds, recentItem.id, recentItem.type)
	},
  },
  filters: {
    lastTime: function (recentItem) {
		return recentItem.last_time.substring(11, 16)
	},	
  },
  mounted(){
//    $(".resizabl").resizable({
//      handles: "e",       
//    });
//    $(".resizabl").resize(function(){
//      var widt=$("#vu_friend").width()
//      var wid=$(".room_homepage").width()-7
//      var nuw=(widt/wid)*100
//      $("#vu_friend").width(nuw+"%")
//      $("#vue_main_main").width(98-nuw+"%")
//      $('.vu_m-chatmain').width(83.5-nuw+"%")
//    })
      
    }
}
</script>
