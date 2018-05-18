<template>
	<div class="v-xuan-fen">
	<div class="v-fen_zu">
		<div class="v-fen_zu_title">
			<span>{{groupType == "common"?'创建分组':'创建群发组'}}</span>
			<p class="v-fen_zu_tiyi"  @click="close"><span></span></p>
		</div>
		<div class="v-fenzu_left v-accordion">
			<input type="text" class="v-fenzu_left_input" placeholder="搜索" @keyup.enter="search" @click="search" v-model="seachKey"/>
			<ul class="v-fenzu_left_ul">
				<li v-for="companyItem in companyList" :class="{'v-accordion_li': companyItem.isCalling}">
			        <div class="v-link"><i class="fa fa-caret-right"></i><span class="v-first_title ">{{companyItem.orgName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
			        <ul class="v-submenu v-submenu_ul ">
			          <li v-for="userItem in companyItem.userIds " class="v-submenu-name" >
			            <div class="v-m-touxiang"> <!--有消息头像动加类名 touxiang-->
			              <img :src="userList[userItem].img" alt=" " class="{ 'v-gray':!userList[userItem].isOnline} "/><!--class="gray "-->
			              <!--//不在线，添加class=gray-->
			            </div>
			            <a>{{userList[userItem].name}}</a>
			            <!--<span class="m-phone-img" @click="changeName "></span>
			            <input class="m-phone-input" type="text" v-model="userList[userItem].name" :data-uid="userList[userItem].id"  :placeholder="userList[userItem].name" @blur="modifyUserName "/>-->
			            <i class='v-input_style v-checkbox_bg' ><input type="checkbox" name="userList[userItem].name" id="" value="userList[userItem].name"  ></i>	
			          </li>
			        </ul>
			        <p class="v-check-all">+</p>
			      </li>			
			</ul>
		</div>
	
		<div class="v-fenzu_right">
			<p>已选择<span>0</span>个联系人</p>
			<ul class="v-fenzu_right_ul">
				
			</ul>
		</div>
	
		<br clear="all"/>
		<div class="v-fenzu_footer">
			<button @click="submitUser">确认</button>
			<span class="v-fen_zu_tiyi" @click="close">取消</span>
		</div>
	
		<!--//设置组名称-->
		<div class="v-fenzu_name" v-show="panelShow.setGroupShow">
			<div class="v-fen_zu_title">
				<span>设置组名称</span>
				<p class="v-fen_zu_tier"><span></span></p>
			</div>
			<p class="v-fenzu_name_na">请输入组名称：</p>
			<input type="text" name="groupName" v-model="formData.groupName" :placeholder="placeholder" />
			<div class="v-fenzu_name_footer">
				<button @click="submitGroup">确认</button>
				<span class="v-fen_zu_tier">取消</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'GroupDialog',
  props: ['user','userList','companyList','groupType'],
  data () {
    return {
    	panelShow: {
    		//searchShow: false,
    		setGroupShow: false
    	},
    	formData:{
    		userIds:[],
    		groupName:''
    	},
    	placeholder:'请输入分组名称',
    	seachKey: '',
      	searchList: []
    }
  },
  created: function(){

  },
  computed: {
	chooseUserList: function(){//根据formData.userIds，输出列表
  				
  	}
  },
  methods: {
  	
  	search: function(){
  		this.searchList = [];
      	for(var i=0,lg=this.userList.length;i<lg;i++){
        	var item  = this.userList[i];
        	if(tem.name.indexOf(newValue) > -1){
          	this.searchList.push(item);
        	}
      	}
  	},
  	// 关闭事件
    close: function() {
      this.$emit('closeEvent', {
        is_friend_show: false,
        is_dialog_show: false,
        is_history_show: false,
        is_group_show: false
      })
    },
  	checkAll: function(orgId,obj){
  		var opt = obj.innerHTML;
  		if(opt == '+'){
  			//添加formData.userIds
  			
  			obj.innerHTML = '-';	
  		}else{
  			//删除formData.userIds

  			obj.innerHTML = '+';
  		}
  	},
  	submitUser: function(){
  		if( this.formData.userIds.length < 1){
  			alert('请先选择人员，再创建组');
  		}else{
  			this.panelShow.setGroupShow = true;
  		}
  	},
  	submitGroup: function(){
  		if( this.formData.userIds.length < 1){
  			alert('请先选择人员，再创建组');
  			return false;
  		}else if(this.formData.groupName == ''){
  			this.placeholder = '请输入分组名称，再提交';
  			return false;
  		}
  		this.formData.groupType = this.groupType;
  		
  	},  
  	onCopy: function (e) {
      console.log('你刚刚复制: ' + e.text)
    },
    onError: function (e) {
      console.log('无法复制文本！')
    }
  }
}
</script>