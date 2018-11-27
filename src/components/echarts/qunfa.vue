<template>
<!--群分组框-->
<div>
	

    <div class="vue_baojia1" id="vu_baojia"  v-show="bianji_linshi" @click="creat_qunfenzu">
  		<div class="vu_baojia_title"  @mousedown="dragqun_bianji" @mouseup="dragqun_bianji_1"><span class="vu_m-na-na" v-if="this.qunzuName==false">新建群发组</span><span class="vu_m-na-na" v-if="this.qunzuName==true">编辑群发组人员</span>
        	<div class="vu_m-guan" @click="guan_bianji"><p><span></span></p></div>
       </div>
        <div class="c_qunPeo">
        	<div class="sz_qunfa"> <!--设置群发组名称-->
        			<p class="vu_fenzu_name_na">设置群发组名称：</p>
  					<input type="text" class="vu_fenzu_name_input" name="groupName" v-model="createGroupName" :placeholder="placeholder" maxlength="6" />	
        	</div>
        	<div class="vu_m-search">
        		<span>添加成员</span>
			      <input type="text" id="vu_search" :placeholder="search_people" @keyup.enter="search" />
			      <div @click="search_yi"></div>
			      <div class="search_tu" @click="search($event)" v-show="search_kong"></div>
			      <!--<p><span ></span></p>-->
			    </div>
          <div class="c_qunPeoTitle"><span :class="{every:everyone}" @click="everyOne($event,companyLists)"></span>全选</div>
          <!--搜索页面-->
				<!--<searchDialog  :searchList="searchList" ></searchDialog>-->
				<div class="vu_input-search" v-show="panelShow.searchShow">
					    <ul v-for="userItem in searchList" class="vu_submenu vu_submenu_ul vu_search_ul">
					      <li :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem.id,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem.id,formData.userIds)}">
					        <div class="vu_m-touxiang newQunFa">
					          <img :src="userItem.img"  :class="{'vu_gray': !userItem.isOnline}" />
					          <!--class="gray"-->
					          <!--//不在线，添加class=gray-->
					        </div>
					        <a>{{userItem.name}}</a>
					        <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem.id,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem.id,formData.userIds)}" >
					        	<input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userItem.id" >
					        </i>
					      </li>
					    </ul>
					    <ul v-if="searchList.length < 1">
					      <li class="vu_submenu-name vu_submenu-none">暂无信息,请重新搜索!</li>
					    </ul>
					</div>

          <div class="vu_fenzu_left vu_accordion"  style="width: 100%!important;height: 100%px!important;position: relative;
    z-index: 3;">
            <div v-if="user.plat=='match'&&this.companyLists.length==0" class="c_dingTips">暂无盯盘</div>
            <div v-if="user.plat=='trade'&&this.companyLists.length==0" class="c_dingTips">您还没有对任何人进行盯盘<br/>请<a href="/trade/collect/create">[添加盯盘]</a>
            </div>
            <ul class="vu_fenzu_left_ul scrollCss" style="width: 100%;height:100%;">
              <li v-for="companyItem in companyLists" :class="{'vu_accordion_li': companyItem.isCalling}">
                <div class="vu_link newQunFa" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span><p class="vu_check-all" title="点击全选" @click.stop="checkAll($event,companyItem.userIds)">+</p></div>
                <ul class="vu_submenu vu_submenu_ul qunfenzu_new">
                  <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem,formData.userIds)}" >
                    <div class="vu_m-touxiang newQunFa">
                      <img :src="userList[userItem].img"  :class="{ 'vu_gray': !userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
                    </div>
                    <a class="newQunFa">{{userList[userItem].name}}</a>
                    <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" @click.stop="dange_xuan"><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="c_qunDi">
        <div class="c_zuB">
          <ul>
            <li class="c_active">
            	<div class="c_newQunBo">
	                <div @click.stop="submitGroup" class="c_queren" >确认</div>
	                <!--<div class="c_sanchu" @click.stop="zuDel($event,groups.groupId)">删除组</div>-->
	              </div>
            </li>
          </ul>
        </div>
        <p class="vue_main_left" v-show="formData.userIds.length!=0">已选择<span>{{formData.userIds.length}}</span>个群成员</p>
        <ul class="vu_fenzu_right_ul newQunFa">
          <li v-for="uid in formData.userIds" v-if="userList[uid]!=null" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" :class="{ 'vu_gray':userList[uid]!=null && !userList[uid].isOnline}"/></div> <a>{{userList[uid].name}}</a> <span @click="delUser(uid)"></span></li>
          <br clear="all"/>
        </ul>
      </div>

	</div>
	
	<!--提示框-->
    <div class="vu_del-popup" v-show="tipsTag" style="left:45%;">
      <div class="vu_fen_zu_title">
        <span>提示</span>
        <p class="vu_fen_zu_tier"  @click="tipscancel"><span></span></p>
      </div>
      <p>{{tipsMsg}}</p>
      <div class="vu_fenzu_name_footer"><button @click="tipscancel">确认</button> <span class="vu_fen_zu_tier" @click="tipscancel">取消</span></div>
    </div>
    <!--清空分组操作-->
    <div class="vu_del-popup" v-show="kongTag" style="left:25%;">
      <div class="vu_fen_zu_title">
        <span>提示</span>
        <p class="vu_fen_zu_tier"  @click="kongcancel"><span></span></p>
      </div>
      <p>请先选择人员</p>
      <div class="vu_fenzu_name_footer"><button @click="kongOK">确认</button> <span class="vu_fen_zu_tier" @click="kongcancel">取消</span></div>
    </div>
</div>
</template>

<script>
//	import searchDialog from './friend_list/Search'
import qunzu from '../../js/qunzu.js'
export default {
  props: ['user', 'userList', 'groupList', 'companyLists'],
  data: function () {
    return {
        formData: {
	        userIds: [],
	        groupName: ''
        },
        createGroupName:'',//新建群组名称
        searchList: [],
        panelShow: {
	        searchShow: false // 搜索面板是否显示
	    },
	    bianji_linshi:false,
	    everyone:false, //默认不全选
	    placeholder: '请输入分组名称.',
	    qunzuName:false,
	    tipsTag:false,//提示框
        tipsMsg:'',//提示信息
        kongTag:false,//清空好友标识
        search_kong:false,
        search_people:'查找人员',
        ss:1
    }
  },
  methods: {
  	creat_qunfenzu:function(){
  		var oDiv = document.getElementById('vu_baojia')
        localStorage.qunfak++
        oDiv.style.zIndex=localStorage.qunfak
  	},
    dragqun_bianji: function (ev) {
        var oDiv = document.getElementById('vu_baojia')       
        var oEvt = ev || event
        var disX = oEvt.clientX - oDiv.offsetLeft
        var disY = oEvt.clientY - oDiv.offsetTop
        document.onmousemove = function (ev) {
          var oEvt = ev || event
          var l = oEvt.clientX - disX
          var t = oEvt.clientY - disY
          // 限定
          if (l < 5) l = 0
          if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 5) {
            l = document.documentElement.clientWidth - oDiv.offsetWidth
          }
          if (t < 5) { t = 0 }
          if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 5) {
            t = document.documentElement.clientHeight - oDiv.offsetHeight
          }
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        }
        document.onmouseup = function () {
          document.onmouseup = document.onmousemove = null
          oDiv.releaseCapture && oDiv.releaseCapture()
        }
        oDiv.setCapture && oDiv.setCapture()
        return false
    },
    dragqun_bianji_1:function(){
//    	var oDiv = document.getElementById('vu_baojia')
//    	localStorage.qunfak++
//      oDiv.style.zIndex=localStorage.qunfak
    },
    guan_bianji:function(){ //关闭编辑/临时加入框
      	$('.vue_baojia1').hide()
      	this.Qunfen=false
      	this.formData.userIds = []
      	this.panelShow.searchShow=false
      	this.kongTag=false
      	this.tipsTag = false
      	this.everyone=false
      	this.placeholder='请输入分组名称.'
      	this.qunzuName = false
      	this.createGroupName=''
      	$('#vu_search').val('')
      	this.search_people = '查找人员'		
    },
    search_yi:function(){
    	this.search_kong=true
    	$('#vu_search').animate({width:"130px"})   	
    },
    search: function (event) {      
      var searchKey = $('#vu_search').val()
      if (searchKey === '') {  
      	$('#vu_search').animate({width:"0"})
      	this.search_kong=false
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
    everyOne:function(event,companyLists,userIds){ //是否全选
    	this.formData.userIds=[] 
    	this.formData.groupName=''
      	this.everyone=!this.everyone
      	var el = event.currentTarget
      	if(this.everyone==true){
      		for (var i = 0, lg = companyLists.length; i < lg; i++) {     			
      			for (var j = 0, la = companyLists[i].userIds.length; j < la; j++) {
		          if (!this.in_array(companyLists[i].userIds[j],this.formData.userIds)) {	          	
	              	this.formData.userIds.push(companyLists[i].userIds[j])
	              }
	         	}
        	}
      		$('.vu_check-all').html('-')
      	}else{
      		this.formData.userIds = []
      		$('.vu_check-all').html('+')
      	}
    },
    // 折叠
	accordion: function (event) {
	    var _this = $(event.currentTarget)
	    _this.next('ul').slideToggle()
	    _this.parent('li').toggleClass('vu_open')
	},
	checkAll: function (event, userIds) {
		var fort=this.formData.userIds
		var for_test=[]		
	    var el = event.currentTarget
	    var opt = $(el).html()
	    if (opt === '+') {
	    	this.formData.userIds=[]
	      // 添加formData.userIds
	      $(el).html('-')
	      for (var i = 0, lg = userIds.length; i < lg; i++) {
	        if (!this.in_array(userIds[i], this.formData.userIds)) {           	
	          for_test.push(userIds[i])
	        }
	      }
	      this.formData.userIds=for_test.concat(fort)
	    } else {
	      // 删除formData.userIds
	      $(el).html('+')
	      this.formData.userIds = this.formData.userIds.filter(t => !this.in_array(t, userIds))
	      this.everyone=false
	    }
	},
	tipscancel: function () {//关闭提示框
        this.tipsTag = false
      },
      kongOK: function(){ //确认清空
        this.kongTag = false
//      this.delConfirm()
      },
      dange_xuan:function(event){
      	var el = event.currentTarget
      	var dan_long_yi
      	if($(el).hasClass('vu_checkbox_bg_check')){
      		this.everyone=false
      		dan_long_yi=$('.qunfenzu_new .vu_checkbox_bg_check').length-1
      	}else{
      		dan_long_yi=$('.qunfenzu_new .vu_checkbox_bg_check').length+1
      	}
      	var dan_long=$('.qunfenzu_new .vu_input_style').length
      	if(dan_long==dan_long_yi){
      		this.everyone=true
      	}else{
      		this.everyone=false
      	}
      },
      kongcancel: function () {//关闭清空提示框
        this.kongTag = false
      },
      in_array: function (search, array) {
        for (var i in array) {
          if (array[i] === search) {
            return true
          }
        }
        return false
      },
      submitGroup: function (groupId,groupType,uids) {
        if (this.createGroupName === '') {
        	this.tipsTag = true        	
	        this.tipsMsg = '组名称未输入'	          
        }else{ 
        	if(this.qunzuName == true){   
        		this.groupName=this.formData.groupName
        		this.groupId=this.formData.groupId
        		this.group_Type="groupHair"
        		this.uids=this.formData.userIds
        		if(this.formData.userIds.length==0){
		            if(this.groupList.groupHair.length!=0){
		              this.kongTag = true
		            }
		        }else{
		            this.$emit('saveGroupEvent', this.groupId, 'groupHair', this.uids)
		            this.qunzuName = false
		            this.formData.userIds = []
			        $('.vue_baojia1').hide()
		            this.everyone=false
		            this.panelShow.searchShow=false		            
		        }
        	}else{
        		this.formData.groupName = this.createGroupName       
	            this.newZuTag = false
	            this.formData.groupType = 'group'	           
	            this.activeTag = this.formData.groupName	                       
	            if(this.formData.userIds.length==0){	            	
	            		this.kongTag = true			            
		        }else{
		          	this.$emit('createGroupEvent', this.formData)
		          	this.createGroupName = ''
	            	this.groupTag++
		            this.formData.userIds = []
			          $('.vue_baojia1').hide()
		            this.everyone=false
		            this.panelShow.searchShow=false
		        }
        	}   
        	$('#vu_search').val('')
      		this.search_people = '查找人员'
        	this.placeholder='请输入分组名称.' 
        	this.createGroupName=''
        }  
      },
      delUser: function (uid) {
        this.formData.userIds = this.formData.userIds.filter(t => t !== uid)
        this.everyone=false
      },
  },
  filters: {
      online (userIds, userList) {
        var onlineCnt = 0
        userIds.forEach(uid => { if (userList[uid].isOnline) onlineCnt++ })
        return onlineCnt
      }
    },
    mounted() {
    	var vm=this
    	qunzu.$on('qunval',qundata =>{  
    		vm.formData = qundata     		
    		this.createGroupName=this.formData.groupName
    		vm.qunzuName=true
    		$('.vu_fenzu_name_input').attr('disabled',true)
    	})
    	if(this.qunzuName==false){
    		this.createGroupName=''
    	}
    },
}
</script>

<style>
</style>