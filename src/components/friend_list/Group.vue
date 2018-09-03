<script>
import $ from 'jquery'

export default {
  data () {
    return {
      groupId: 0,
      uid: 0,
      delType: '',
      groupName: '',
      groupPlaceHolder: '请输入新分组名称',
      Qunfen: false, // 修改群分组名称弹窗关闭
      Qunpopup: false, // 确认弹窗关闭
      current_uerId: 0,
      firstselt:false, //分组名称
      namez:false,
      groupNew:false, //移动列表隐藏
      friendDel:false,//删除框隐藏
      lookInfoTag:-1,//验证资料卡隐藏
      tipsTag:false,//提示框
      tipsMsg:'',//提示信息
    }
  },
  props: ['user', 'userList', 'companyList', 'group_type', 'followList','verifyMsg'],
  computed: {
    myVerify: function () {
      var verifyCount = 0;
      for (var index in this.verifyMsg){
        if(this.verifyMsg[index].to_uid == this.user.id){
          verifyCount ++;
        }
      }
      if($('#new_firenfd_peo>div').length>0){
      	$('.vue_new_news').show()
      }
      return verifyCount;
    },
    onMyVerify: function () {
      var onverifyC = 0;
      for (var index in this.verifyMsg){
        if(this.verifyMsg[index].to_uid == this.user.id && this.userList[this.verifyMsg[index].uid].isOnline){
          onverifyC ++;
        }
      }
      return onverifyC;
    }
  },
  methods: {
//  mouseOver: function (event) {
//    var el = event.currentTarget
//    $('.vu_m-phone-img', $(el)).show()
//  },
//  mouseOut: function (event) {
//    var el = event.currentTarget
//    $('.vu_m-phone-img', $(el)).hide()
//  },
    lookInfo: function (index) {
      this.lookInfoTag = index
    },
    mouseLeave:function(event){
    	var el = event.currentTarget
    	$('.vu_m-phone-input', $(el)).hide()
    	$('.vue_name_sz').hide()
    },
    changeName: function (event) {
      var el = event.currentTarget
      $(el).parent().parent().next().show()
    },
    channame:function(){
    	 $('.vue_name_sz').hide()
    },
    modifyUserName: function (event) {
      var el = event.currentTarget
      var userId = $(el).data('uid')
      var groupId = $(el).data('gid')
      var userName = $(el).val()
      userName = userName.replace(/^\s+|\s+$/g, '') // 去空格
      if (userName !== '') {
        this.userList[userId].name = userName
        this.$emit('changeUserNameEvent', {friendId: userId, friendName: userName, groupId: groupId, type: 'user'})
      }
      // 回传提交保存

      $(el).hide()
    },
    openChat: function (uid) {
      this.$emit('openChartEvent', uid, 'user')
      $('.vu_m-list').show()
    },
    // 接收,拒绝好友
    receive: function (msgId, isAgree) {
      this.$emit('receiveFriendEvent', msgId, isAgree)
      // 后续处理
    },
    changeQunName: function (event, groupId) { // 点击修改群分组名称
      event.stopPropagation()
      this.groupId = groupId
      this.Qunfen = true
    },
    modifyGroupName: function () {
      if (this.groupName === '') {
        this.groupPlaceHolder = '组名不能为空，请重新输入'
      }
      this.$emit('modifyGroupEvent', this.groupId, this.group_type, this.groupName)
      this.groupName = ''
      this.Qunfen = false
    },
    quncancel: function () { // 关闭修改弹窗
      this.Qunfen = false
    },
    popcancel: function () { // 关闭删除弹框
      this.Qunpopup = false
    },
    tipscancel:function () {//关闭提示框
      this.tipsTag = false
    },
    Qundel: function (event, groupId) { // 点击弹出删除框
      event.stopPropagation()
      this.Qunpopup = true
      this.groupId = groupId
      this.delType = 'group'
    },
    delConfirm: function () {
      if (this.delType === 'group') {
        for(var index in this.companyList){
          if(this.companyList[index].groupId==this.groupId){
            if(this.companyList[index].userIds.length==0){
              this.$emit('delGroupEvent', this.groupId, this.group_type)
            }else{
              this.tipsMsg = '请先移出分组内的好友';
              this.tipsTag = true;
            }
          }
        }
      } else if (this.delType === 'person') {
        this.$emit('delPersonEvent', this.groupId, this.group_type, this.uid)
      }
      this.Qunpopup = false
    },
    delPen: function (event, groupId, uid) {
      if(this.followList.indexOf(this.userList[uid].id)>=0){
        this.tipsMsg = '请先取消盯盘'
        this.tipsTag = true
      }else{
        event.stopPropagation()
        this.Qunpopup = true
        this.groupId = groupId
        this.uid = uid
        this.delType = 'person'
      }
    },
    isCalling (userIds, userList) {
      return userIds.some(uid => userList[uid].isCalling)
    },
    // 折叠
    accordion: function (event) {
      var _this = $(event.currentTarget)
      _this.next('ul').slideToggle()
      _this.parent('li').toggleClass('vu_open')
    },
    // 切换当前
    changeCurrent: function (uid) {
      this.current_uerId = uid
    },
    sortOnline: function (userIds) {
      var tempIds = []
      userIds.forEach(item => { tempIds.push(item) })
      tempIds.sort((first, second) => {
        if (this.userList[first].isOnline) {
          return -1
        } else if (this.userList[second].isOnline) {
          return 1
        } else {
          return 0
        }
      })
      return tempIds
    },
    changefenzhu(companyItem){//分组设置
//    	if (companyItem.firstselt == false) {
//    		console.log(3)
//         this.$set(companyItem, "firstselt", true);
//      } else {
//      	console.log(345)
//         companyItem.firstselt = !companyItem.firstselt;
//      }
				event.stopPropagation();
				var el = event.currentTarget
			  $('.vu_first_selt').hide()
			  $('.vu_first_selt', $(el)).show()
    },
    nameSz:function(event){//划上头像出现弹窗
			event.stopPropagation();
			var el = event.currentTarget
			$('.vue_name_sz').hide()
			$('.vue_name_sz', $(el)).show()
    },
    namemove:function (friendId, groupId, toGroupId) {
      this.$emit('moveFriendEvent', friendId, groupId, toGroupId)
    	$('.vue_name_sz').hide()
    	this.groupNew=true
    },
    vueMove:function(){//划上移动，移动分组表显示
    	this.groupNew=true
    },
    vueLeave:function(){
    	this.groupNew=false
    },
    delfri:function(){//打开删除好友弹窗
    	this.friendDel=true
    },
    closedelfri:function(){//关闭删除好友弹窗
    	this.friendDel=false
    },
    closefenzhu:function(){
    	$('.vu_first_selt').hide()
    }
  },
  filters: {
    online (userIds, userList) {
      var onlineCnt = 0
      userIds.forEach(uid => { if (userList[uid].isOnline) onlineCnt++ })
      return onlineCnt
    }
  },
  mounted() {
//  $(".vu_qunfen_yi").niceScroll({
//  	cursorcolor: "#525159", // 改变滚动条颜色，使用16进制颜色值
//      cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
//      cursorwidth: "5px", // 滚动条的宽度，单位：便素
//      background: "", // 轨道的背景颜色
//      cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
//      autohidemode: false, // 隐藏滚动条的方式, 可用的值:
//  });
  }
}

</script>
<template>
  <ul class="vu_qun_fen">
  	<!--有新加好友时-->
  	<li id="new_firenfd_peo">
  			<div class="vu_link " @click="accordion" v-if="myVerify">
        	<i class="fa fa-caret-right"></i>
        	<span class="vu_first_title ">新的好友</span>
          <span>{{onMyVerify}}/{{myVerify}}</span>
        </div>
      <ul class="vu_submenu vu_submenu_ul ">
        <li class="vu_submenu-name" v-for="(addfriList,index) in verifyMsg" v-if="addfriList.to_uid==user.id">
          <div class="vu_m-touxiang"> <!--有消息头像动加类名 touxiang-->
            <img :src="userList[addfriList.uid].img" :class="{ 'vu_gray':!userList[addfriList.uid].isOnline} "/><!--class="gray "-->
            <!--//不在线，添加class=gray-->
          </div>
          <div class="vu_submenu_com">
            <a >{{addfriList.user_info.nickname}}</a>
            <p class="vue_submen_company">{{addfriList.message}}</p>
          </div>
          <div class="vu_ren-add" @click="lookInfo(index)">查看</div>
          <!--验证好友的资料卡-->
          <div class="vue_leftlist_tan" style="left: 300px;top:40px;position:fixed;z-index: 999;" v-if="userList[addfriList.uid]" v-show="lookInfoTag==index">   <!--加好友弹窗-->
            <img src="../../images/addfri_bg.png" alt="" />
            <div class="vue_leftlist_img"><img :src="userList[addfriList.uid].img" alt="" /></div>
            <p class="vue_leftlist_line verify">{{userList[addfriList.uid].name}}</p>
            <p v-if="userList[addfriList.uid].plat=='match'" class="vue_leftlist_companycuo verify">所属公司类型：<span>撮合公司</span></p>
            <p v-if="userList[addfriList.uid].plat=='trade'" class="vue_leftlist_companyjiao verify">所属公司类型：<span>交易公司</span></p>
            <p class="vue_leftlist_companyname">所属公司：{{userList[addfriList.uid].company_name}}</p>
            <p class="vue_leftlist_companyname">手机号：{{userList[addfriList.uid].phone||'无'}}</p>
            <div class="verifyMsg">验证信息：{{addfriList.message}}</div>
            <div class="vue_leftlist_companysz">
              <span class="vue_leftlist_companysz_yi" @click="receive(addfriList.id,false)">拒绝</span>
              <span class="vue_leftlist_companysz_er" @click="receive(addfriList.id,true)">接受</span>
              <!--<p>聊天</p>-->
            </div>
            <div class="vue_leftlist_close" @click="lookInfo"><span></span></div>
          </div>
        </li>
      </ul>
    </li>
  	<!--正常分组-->
    <li v-for="(companyItem,index) in companyList">
        <div :class="{'vu_link':!isCalling(companyItem.userIds, userList),'vu_link vu_accordion_li': isCalling(companyItem.userIds, userList)}" @click="accordion">
        	<i class="fa fa-caret-right"></i>
        	<span class="vu_first_title ">{{companyItem.groupName}}</span>
        	<span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span>
        	<div class="vu_qun-name" @click="changefenzhu(companyItem)" @mouseleave="closefenzhu" v-if="index">
		        	<ul class="vu_first_selt">
			        		<li @click="Qundel($event,companyItem.groupId)">删除组</li>
			        		<li @click="changeQunName($event,companyItem.groupId)">重命名</li>
		        	</ul>
        	</div>

        	<!--<span title="点击修改群名称" class="vu_qun-name" @click="changeQunName($event,companyItem.groupId)"></span>-->
        	<!--<p title="点击删除分组" class="vu_check-all" @click="Qundel($event,companyItem.groupId)">-</p>-->

        </div>
        <ul class="vu_submenu vu_submenu_ul ">
          <li v-for="userItem in sortOnline(companyItem.userIds)" :class="{'vu_submenu-name vu_current':userItem==current_uerId,'vu_submenu-name':userItem!=current_uerId}" @click="changeCurrent(userItem)"  @mouseleave="mouseLeave" @dblclick="openChat(userItem)">
            <div> <!--有消息头像动加类名 touxiang-->
            	<div :class="{'vu_m-touxiang':!userList[userItem].isCalling,'vu_m-touxiang vu_touxiang':userList[userItem].isCalling}">
              	<img :src="userList[userItem].img" alt=" " :class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              </div>
              <!--//不在线，添加class=gray-->

            </div>
            <div class="vu_submenu_com">
            	<a>{{userList[userItem].friend_name?userList[userItem].friend_name:userList[userItem].name}}<b v-if="userList[userItem].friend_name!==userList[userItem].name">({{userList[userItem].name}})</b> </a>
            	<span v-if="followList.indexOf(userList[userItem].id)>=0"></span> <!--已盯盘就显示图标-->
            	<p class="vue_submen_company">{{userList[userItem].company_short_name}}</p>
            </div>
            <div class="vu_submenu_shez" @click="nameSz">
            	<img src="../../images/shezhi.png" alt="" />
            	<ul class="vue_name_sz">
			          	<li @click="openChat(userItem)">发消息</li>
			          	<li @click="delPen($event,companyItem.groupId,userItem)">删除好友</li>  <!--@click="delfri"--><!--盯盘好友不可删除-->
			          	<li @mouseenter="vueMove" @mouseleave="vueLeave">移动到<span></span>
			          			<ul class="vue_name_move" v-show="groupNew">
						          		<li v-for="moveItem in companyList" v-if="companyItem.groupId !== moveItem.groupId" @click="namemove(userItem,companyItem.groupId,moveItem.groupId)">{{moveItem.groupName}}</li>
						          </ul>
			          	</li>
			          	<li @click="changeName">重命名</li>

		          	</ul>
            </div>
						<input class="vu_m-phone-input" type="text" :value="userList[userItem].friend_name?userList[userItem].friend_name:userList[userItem].name" :data-uid="userList[userItem].id" :data-gid="companyItem.groupId" @keyup.enter="modifyUserName" @blur="modifyUserName" @click="channame"/>
            <!--<span class="vu_m-phone-img " @click="changeName"></span>-->
           <!--<input class="vu_m-phone-input" type="text" :value="userList[userItem].name" :data-uid="userList[userItem].id" @keyup.enter="modifyUserName" @blur="modifyUserName"/>--> <!--data-uid="{{userList[userItem].id}} "  placeholder="{{userList[userItem].name}} "-->
            <!--删除人员-->
            <!--<p class="vu_ren-dele" @click="delPen($event,companyItem.groupId,userItem)"></p> <!--盯盘好友不可删除-->


          </li>

       </ul>
      </li>
      <!--//删除好友-->
      <div class="vue_del_friend" v-show="friendDel">
      	<div class="vue_del_friend_yi">
	      		<span>删除好友</span>
	      		<p @click="closedelfri"><span></span></p>
	      </div>
	  		<p class="vue_del_friend_er">确认要删除小张吗？</p>
	  		<div class="vue_del_friend_san">
	  			<span class="vue_del_friend_que" @click="delConfirm">确认</span>
	  			<span class="vue_del_friend_xiao" @click="closedelfri">取消</span> <!--@click="closedelfri"-->
	  		</div>

      </div>
      <!--//修改群分名字-->
      <div class="vu_qunzu_name" v-show="Qunfen">
      	<div class="vu_fen_zu_title">
      		<span>修改群组名称</span>
      		<p class="vu_fen_zu_tier"  @click="quncancel"><span></span></p>
      	</div>
      	<p class="vu_fenzu_name_na">请输入组名称(最多)：</p>
      	<input type="text" name="groupName" :placeholder="groupPlaceHolder" v-model="groupName" maxlength="6">
      	<div class="vu_fenzu_name_footer"><button @click="modifyGroupName">确认</button> <span class="vu_fen_zu_tier" @click="quncancel">取消</span></div>
      </div>
      <!--删除确认弹窗-->
      <div class="vu_del-popup" v-show="Qunpopup">
      	<div class="vu_fen_zu_title">
      		<span>删除</span>
      		<p class="vu_fen_zu_tier"  @click="popcancel"><span></span></p>
      	</div>
      	<p>是否确认删除？</p>
      	<div class="vu_fenzu_name_footer"><button @click="delConfirm">确认</button> <span class="vu_fen_zu_tier" @click="popcancel">取消</span></div>
      </div>
      <!--提示框-->
      <div class="vu_del-popup" v-show="tipsTag">
        <div class="vu_fen_zu_title">
          <span>提示</span>
          <p class="vu_fen_zu_tier"  @click="tipscancel"><span></span></p>
        </div>
        <p>{{this.tipsMsg}}</p>
        <div class="vu_fenzu_name_footer"><button @click="tipscancel">确认</button> <span class="vu_fen_zu_tier" @click="tipscancel">取消</span></div>
      </div>
    </ul>
</template>

<style>

</style>
