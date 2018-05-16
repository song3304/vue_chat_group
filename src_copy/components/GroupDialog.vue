<template>
<div class="fen_zu">
	<div class="fen_zu_title">
		<span>{{groupType=="common"?'创建分组':'创建群发组'}}</span>
		<p class="fen_zu_tiyi"><span></span></p>
	</div>
	<div class="fenzu_left accordion">
		<input type="text" class="fenzu_left_input" placeholder="搜索" @keyup.enter="search" @click="search" v-model="seachKey"/>
		<ul class="fenzu_left_ul">
			<li v-for="first in menu">
				<div class="link"><i class="fa fa-caret-right"></i><span class="first_title">{{first.title}}</span><span>5/6</span></div>				
				<ul class="submenu">
					<li v-for="second in first.name" class="submenu-name" >
						<div class="submenu-name-div">
							<div class="m-touxiang">
								<img src="dist/images/default.png" alt="" /><!--class="gray"-->
								<!--//不在线，添加class=gray-->
							</div>
							<a>{{second}}</a>
						</div>						
						<i class='input_style checkbox_bg'><input type="checkbox" name="{{second}}" id="" value="{{second}}" v-model="formData.userIds" ></i>						
					</li>
				</ul>
				<p class="check-all" @click="checkAll(orgId,this)">+</p>
			</li>
		</ul>
	</div>

	<div class="fenzu_right">
		<p>已选择<span>0</span>个联系人</p>
		<ul class="fenzu_right_ul">
			
		</ul>
	</div>

	<br clear="all"/>
	<div class="fenzu_footer">
		<button @click="submitUser">确认</button>
		<span class="fen_zu_tiyi">取消</span>
	</div>

	<!--//设置组名称-->
	<div class="fenzu_name" v-show="panelShow.setGroupShow">
		<div class="fen_zu_title">
			<span>设置组名称</span>
			<p class="fen_zu_tier"><span></span></p>
		</div>
		<p class="fenzu_name_na">请输入组名称：</p>
		<input type="text" name="groupName" v-model="formData.groupName" :placeholder="placeholder" />
		<div class="fenzu_name_footer">
			<button @click="submitGroup">确认</button>
			<span class="fen_zu_tier">取消</span>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'GroupDialog',
  props: ['user','userList','companyList','groupType']
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

  }
  computed: {
	chooseUserList: function(){//根据formData.userIds，输出列表
  				
  	}
  }
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
  		
  	}
  }
}
</script>