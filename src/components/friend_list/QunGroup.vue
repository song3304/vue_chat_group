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
	      	panelShow: {
		        searchShow: false // 搜索面板是否显示
		    },
	    }
	},
	props: ['user', 'userList', 'companyList', 'group_type', 'groupList','followList'],
	computed: {
	
	},
	methods: {
		isCalling (userIds, userList) {
	      	return userIds.some(uid => userList[uid].isCalling)
	    },
	    // 折叠
	    accordion: function (event) {
	      	var _this = $(event.currentTarget)
	      	_this.next('ul').slideToggle()
	      	_this.parent('li').toggleClass('vu_open')
	    },
	    quncancel: function () { // 关闭修改弹窗
	      	this.Qunfen = false
	    },
	    modifyGroupName: function () {
		    if (this.groupName === '') {
		        this.groupPlaceHolder = '组名不能为空，请重新输入'
		    }
		    this.$emit('modifyGroupEvent', this.groupId, this.group_type, this.groupName)
		    this.groupName = ''
		    this.Qunfen = false
	    },
	    popcancel: function () { // 关闭删除弹框
	      	this.Qunpopup = false
	    },
	    delConfirm: function () {
		    this.$emit('delGroupEvent', this.groupId, this.group_type)

		    this.Qunpopup = false
	    },
	    changefenzhu(event,companyItem){//分组设置
			event.stopPropagation();
			var el = event.currentTarget
			$('.vu_first_selt').hide()
			$('.vu_first_selt', $(el)).show()
			$('#vu_friend').css({'z-index':'99'})
	   		$('#vu_qun-fen').addClass('vu_qun-fen1')
	   		$('.vue_qun_fen_main').addClass('vue_qun_fen_main1')
    	},
	 	closefenzhu:function(){
	    	$('.vu_first_selt').hide()
	    	$('#vu_friend').css({'z-index':'1'})
		   	$('#vu_qun-fen').removeClass('vu_qun-fen1')
		   	$('.vue_qun_fen_main').removeClass('vue_qun_fen_main1')
	   	},
	   	changeQunName: function (event, groupId) { // 点击修改群分组名称
	      	event.stopPropagation()
	      	this.groupId = groupId
	      	this.Qunfen = true
	    },
	    Qundel: function (event, groupId) { // 点击弹出删除框
	      	event.stopPropagation()
	      	this.Qunpopup = true
	      	this.groupId = groupId
	      	this.delType = 'group'
	    },
	},
	filters: {
	
	},
	mounted() {
		if(this.groupList.groupHair.length!=0){
//	        this.activeTag = this.groupList.groupHair[0].groupName
//	        this.groupId = this.groupList.groupHair[0].groupId
//	        this.formData.groupName = this.groupList.groupHair[0].groupName
//	        this.formData.userIds = this.groupList.groupHair[0].userIds
	    }
	}
}

</script>
<template>
  	<div class="vue_Qungroup">
  		<ul>
            <li v-for="(groups,index) in groupList.groupHair">
		        <div class="vu_link" @click="accordion">
		        	<i class="fa fa-caret-right"></i>
		        	<span class="vu_first_title ">{{groups.groupName}}</span>
		        	<span></span>
		        	<div class="vu_qun-name" @click.stop="changefenzhu($event,groups)" @mouseleave="closefenzhu">
			        	<ul class="vu_first_selt">
				        	<li @click="Qundel($event,groups.groupId)">删除组</li>
		        			<li @click="changeQunName($event,groups.groupId)">重命名</li>
			        	</ul>
		        	</div>		
		        </div>
		        <ul class="vu_submenu vu_submenu_ul vu_submenu_group">
		          	<li v-for="uid in groups.userIds" v-if="userList[uid]!=null" class="vu_submenu-name vu_submenu-newname">
			          	<div class="vu_m-touxiang">
				          	<img :src="userList[uid].img"/>
				          	<span></span>
			          	</div> 
			          	<div class="vu_submenu_com">
			            	<a class="vu_submenu_name">{{userList[uid].friend_name?userList[uid].friend_name:userList[uid].name}}<b v-if="userList[uid].friend_name!==userList[uid].name">({{userList[uid].name}})</b> </a>
			            	<span v-if="followList.indexOf(userList[uid].id)>=0"></span> <!--已盯盘就显示图标-->
			            	<p class="vue_submen_company">{{userList[uid].company_short_name}}</p>
			            </div>
		          	</li>
		
		       </ul>
		      </li>
        </ul>
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
	    
  	</div>
</template>

<style>

</style>
