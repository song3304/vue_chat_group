<template>
  <div id="vue_echart">

    <!--echart模块--start-->
    <chartModule :user='user' :match_hall_companies='match_hall_companies' :bidList='bidList' :match_hall_catalogs='match_hall_catalogs' :my_match_hall_catalogs='my_match_hall_catalogs'></chartModule>
    <!--echart模块--end-->
    <!-- 群发框 -->
    <div class="c_qunBox" id="vu_div-qun" v-show="showQunFa" @click="qunfakuang">
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='match'" @mousedown="dragqun" @mouseup="dragqun_1">乙二醇-一键报盘<span @click="closeQunFa"></span></div>
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='trade'" @mousedown="dragqun" @mouseup="dragqun_1">乙二醇-一键询价<span @click="closeQunFa"></span></div>
      <div class="c_imgntent">
      	 <div class="c_qun_qiehuan">
      	 		<div class="c_qunquan_qie">
		      	 	 <span @click="qun_qunfazhu" class="c_qunquan_active">群发组</span>
		      	 	 <span @click="qun_qunbuzhu">全部成员</span>
		      	</div>
		      	<div class="vu_fenzu_left vu_accordion" v-show="qunfazhu"  style="width: 100%!important;height: 100%px!important;position: relative;
			    z-index: 3;"> <!--//群发组-->
	              <!--<ul v-if="cnewkai==true">-->
	                <!--<li class="vue_qun_bianji" :class="{c_active:groups.groupName==activeTag}" v-for="(groups,index) in groupList.groupHair" @click="onGroup(groups,index)" :value="groups.groupId">{{groups.groupName}}</li>-->
	                <ul class="vu_fenzu_left_ul scrollCss vu_qunfenzhu_ul" style="width: 100%;height:100%;">
			              <li  v-for="(groups,index) in groupList.groupHair"   @click="onGroup(groups,index,$event)" :value="groups.groupId">
			                <div class="vu_link newQunFa" :class="{newqun_fa:groups.groupName==activeTag}"  :value="groups.groupId"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{groups.groupName}}</span><span>{{groups.userIds|online(userList)}}/{{groups.userIds.length}}</span>
			                	<p class="vu_check-all" title="点击全选" @click.stop="checkAll($event,groups.userIds)">+</p>
			                </div>
			                <ul class="vu_submenu vu_submenu_ul new_qunfabeijing" :class="{new_qunfabei:groups.groupName==activeTag}">
			                  <li v-for="userItem in groups.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem,formData.userIds)}" >
			                    <div class="vu_m-touxiang newQunFa">
			                      <img :src="userList[userItem].img" alt=" " :class="{ 'vu_gray': !userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
			                    </div>
			                    <a class="newQunFa">{{userList[userItem].name}}</a>
			                    <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" @click.stop="dange_xua($event)"><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
			                  </li>
			                </ul>
			              </li>
			            </ul>
	              <p v-if="cnewguan==true" style="display: inline-block;">只报价不群发</p>
            </div>
            <div class="c_qunPeo"  v-show="qunbuzhu">	<!--全部成员-->
			          <div class="vu_fenzu_left vu_accordion" @mousedown="jinzhi" style="width: 100%!important;height: 100%px!important;position: relative;
			    z-index: 3;">
			          		<div style="font-size: 12px;color: #666666;padding-left:12px;line-height: 24px;">临时添加/删除人员</div>
			            <div v-if="user.plat=='match'&&this.companyLists.length==0" class="c_dingTips">暂无盯盘</div>
			            <div v-if="user.plat=='trade'&&this.companyLists.length==0" class="c_dingTips">您还没有对任何人进行盯盘<br/>请<a href="/trade/collect/create">[添加盯盘]</a>
			            </div>
			            <ul class="vu_fenzu_left_ul scrollCss" style="width: 100%;height: 93%;">
			              <li v-for="companyItem in companyLists" :class="{'vu_accordion_li': companyItem.isCalling}">
			                <div class="vu_link newQunFa" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span><p class="vu_check-all" title="点击全选" @click.stop="checkAll($event,companyItem.userIds)">+</p></div>
			                <ul class="vu_submenu vu_submenu_ul">
			                  <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem,formData.userIds)}" >
			                    <div class="vu_m-touxiang newQunFa">
			                      <img :src="userList[userItem].img" alt=" " :class="{ 'vu_gray': !userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
			                    </div>
			                    <a class="newQunFa">{{userList[userItem].name}}</a>
			                    <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" @click.stop="dange_xuan"><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
			                  </li>
			                </ul>
			              </li>
			            </ul>
			          </div>
			        </div>
      	 </div>
					        <div class="c_qunDi">
				            <!--<p v-show="formData.userIds.length!=0">已选择<span>{{formData.userIds.length}}</span>个联系人</p>-->
				            <div class="c_zuB">
				              <ul style="height: 100%;">
				                <li :class="{c_active:groups.groupName==activeTag}" v-for="(groups,index) in groupList.groupHair"  :value="groups.groupId" >
				                	<div class="c_qunname">
				                		<span>{{groups.groupName}}</span>
				                		<!--<input class="vu_m-phone-input vu_m-new-input" :value="groups.groupName" type="text" :data-gid="groupList.groupHair[index].groupId" @keyup.enter="modifyGroupName" @blur="modifyGroupName"/>-->
				                	</div>
				                	<div class="vue_clear" title="清空所选人员" @click="vue_qunclear"></div>
				                	<!--<span class="c_qungaititle" v-show="tan_bianji">(点击修改名称)</span>
				                	<span class="c_qungainame" v-show="tan_bianji" title="点击修改群名称" @click.stop="changeQunName($event,groups.groupId)"></span>-->
				                	<!--<div class="c_newQunBo">
						                <div @click="saveZu" class="c_queren" >保存</div>
						                <div class="c_sanchu" @click.stop="zuDel($event,groups.groupId)">删除组</div>
						              </div>-->
				                </li>
				              </ul>
				            </div>
				            <p class="c_quntitle" v-show="formData.userIds.length==0">请选择群发人员</p>
				            <p class="vue_main_left" v-show="formData.userIds.length!=0">已选择<span>{{formData.userIds.length}}</span>个群成员</p>
				            <ul class="vu_fenzu_right_ul newQunFa_qun">
				              <li v-for="uid in formData.userIds" v-if="userList[uid]!=null" class="vu_submenu-name vu_submenu-newname">
				              	<div class="vu_m-touxiang">
				              		<img :src="userList[uid].img" :class="{ 'vu_gray':userList[uid]!=null && !userList[uid].isOnline}"/>
				              		<span @click="delUser(uid)"></span>
				              	</div>
				              	<a>{{userList[uid].name}}</a>
				              </li>
				              <br clear="all"/>
				            </ul>
				         </div>
        <div class="c_qunBaoJia">
          <div class="c_qunDiv">
            <!--<p v-show="formData.userIds.length!=0">已选择<span>{{formData.userIds.length}}</span>个联系人</p>-->
            <!--<p v-show="formData.userIds.length==0">请从左侧选择人员</p>-->
            <!--<ul class=" newQunFa D_xiugai" v-if="cnewkai==true" >
              <li v-for="uid in formData.userIds" v-if="userList[uid]!=null" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" :class="{ 'vu_gray':!userList[uid].isOnline}"/><span @click="delUser(uid)"></span></div> <a>{{userList[uid].name}}</a> </li>
              <div class="vu_fenzu_right_div" @click="add_temporarily">
              	<span>+</span>
              	<p>临时加人</p>
              </div>
            </ul>-->
          </div>
          <div class="vu_qunnew-que newQunFa">
            <!--<div>*请您核对群发消息内容:</div>-->
            <form id="addQuickForm" class="form-horizontal form form-builder" style="height: 100%">
              <textarea class="row" id="groupHairMsg" name="groupHairMsg" v-model="groupMsg" :placeholder="placeholderMsg" @click="changePh"></textarea>
            </form>
          </div>
          <div class="c_openBox">
            <div v-if="user.plat=='match'" class="c_shiBieButton" data-cnt="0" ref="btn" @click="sendGroupMsg()" id='quick_parse_create'><span class="c_shiBieButton_yi"  v-show="formData.userIds.length!=0">群发</span><span class="c_shiBieButton_er"  v-show="formData.userIds.length==0">报价</span></div>
            <div v-if="user.plat=='trade'" class="c_shiBieButton" data-cnt="0" ref="btn" @click="sendGroupM()" id='quick_parse_creat'><span class="c_shiBieButton_yi">群发</span></div>
            <div class="c_openShibie" v-if="user.plat=='match' && cnewguan!=true"><span :class={gou:chooseG} @click="chooseGou"></span>开启报价识别</div>
          </div>
        </div>
      </div>
      <!--<img src="../images/tips.png" alt="" class="c_qunTips" v-show="formData.userIds.length==0">-->
    </div>

    <!--提示框-->
    <tipDialog v-show="tipsTag" @confirmEvent='tipscancel' @cancleEvent='tipscancel' :tipsMsg='tipsMsg'></tipDialog>
    <!--清空分组操作-->
    <truncateDialog  v-show="kongTag" @confirmEvent='kongOK' @cancleEvent='kongcancel'></truncateDialog>
    <!--删除确认弹窗-->
    <removeDialog v-show="Qunpopup" @confirmEvent='delConfirm' @cancleEvent='popcancel'></removeDialog>


    <!--<div class="vue_qun_line" v-if="user.plat=='trade'"></div>-->
    <!-- 群发报价 -->
    <div class="c_btn_box" v-if="user.plat=='match'">
      <div class="vue_bp_offer" @click="qunFa()"><p></p><span>一键报盘</span></div>
      <div class="vue_cj_offer" @click="cjbj()"><p></p><span>成交报价</span></div>
    </div>
    <!--//修改群分名字-->
      <div class="vu_qunzu_name" v-show="Qunfen">
      	<div class="vu_fen_zu_title">
      		<span>修改群组名称</span>
      		<p class="vu_fen_zu_tier"  @click="quncancel"><span></span></p>
      	</div>
      	<p class="vu_fenzu_name_na">请输入组名称(最多六个字)：</p>
      	<input type="text" name="groupName" :placeholder="groupPlaceHolder" v-model="groupName" maxlength="6">
      	<div class="vu_fenzu_name_footer"><button @click="modifyGroupName">确认</button> <span class="vu_fen_zu_tier" @click="quncancel">取消</span></div>
      </div>
    <!--<div v-if="user.plat=='match'" class="vue_cj_offer" @click="qunFa()"><p></p><span>成交报盘</span></div>-->
    <!--<div v-if="user.plat=='match'" class="vue_qun_offer" @click="qunFa()"><p></p><span>一键报盘</span></div>-->
    <div v-if="user.plat=='trade'"  class="vue_qun_offf" @click="qunFa()">
    	<div class="vue_qun_offer">
    		<p></p><span>一键询价</span>
    	</div>
    </div>
    <echartQun :user='user' :userList='userList' :groupList='groupList' :companyLists='companyLists'  @createGroupEvent='createGroup' @saveGroupEvent="saveGroup"></echartQun>
  </div>
</template>

<script>
import searchDialog from './friend_list/Search'
import chartModule from './echarts/chart'
import echartQun from './echarts/qunfa'
import tipDialog from './echarts/dialog/tip'
import truncateDialog from './echarts/dialog/truncate'
import removeDialog from './echarts/dialog/remove'
  //let echarts = require('echarts/lib/echarts')
  // 引入折线图组件
  //require('echarts/lib/chart/line')
  // 引入提示框和title组件
  //require('echarts/lib/component/tooltip')
  //require('echarts/lib/component/title')
  export default {
    name: 'Echart',
    props: ['user', 'userList', 'bidList', 'groupList', 'companyLists','match_hall_catalogs','my_match_hall_catalogs','match_hall_companies'],
    data() {
      return {
            groupId:0,
            showQunFa:false,//显示群发
            //qunNew部分内容
            formData: {
                  //groupId:0,
                  userIds: [],
                  groupName: ''
            },
            groupName: '',
            newZuTag:false,
            groupMsg:'',//群发内容
            chooseG:true,//默认开启报价识别
            tipsTag:false,//提示框
            tipsMsg:'',//提示信息
            activeTag:'',//组选中标识
            createGroupName:'',//新建群组名称
            Qunpopup: false, // 确认弹窗关闭
            groupId:'',//删除组的
            kongTag:false,//清空好友标识
            groupTag:0,//组标识
            placeholderMsg:'请您粘贴信息',//报价框提示文字

            vue_bianji:false,
            vue_linshi:false,
            //bianji_linshi:false,
            Qunfen:false,
            groupPlaceHolder: '请输入新分组名称',
            tan_bianji:false,
            cnewkai:true,
            cnewguan:false,
            everyone:false, //默认不全选
            linshi_guan:0,
    	    //opensetzhu:true,
            qunfazhu:true, //群发组默认显示
            qunbuzhu:false,  //全部人员组
            qunfa_kuang:1000
      }
    },
    components: {searchDialog,chartModule,echartQun,tipDialog,truncateDialog,removeDialog},
    mounted() {
          if(this.groupList.groupHair.length!=0){
            this.activeTag = this.groupList.groupHair[0].groupName
            this.groupId = this.groupList.groupHair[0].groupId
    //      this.formData.groupName = this.groupList.groupHair[0].groupName
    //      this.formData.userIds = this.groupList.groupHair[0].userIds
    //      this.formData.userIds = []
          }
          localStorage.qunfak=1000
          var oDiv = document.getElementById('vu_div-qun')
          localStorage.qunfak++
          oDiv.style.zIndex=localStorage.qunfak

    },
    methods: {
    	saveGroup:function(groupId,groupType,uids){
    		this.$emit('saveGroupEvent', groupId, 'groupHair',uids)
    	},
    	createGroup:function(formData){
    		 this.$emit('createGroupEvent', formData)
    	},
        //qunNew部分内容
        changePh:function(){
            this.placeholderMsg = '请您粘贴信息'
        },
        changeQunName: function (event,groupId) { // 点击修改群分组名称
            event.stopPropagation()
            this.groupId = groupId
    	    //this.Qunfen = true
            $('.vu_m-new-input').show()
        },
	    quncancel: function () { // 关闭修改弹窗
	        this.Qunfen = false
	    },
	    modifyGroupName: function (event,groupId, groupType, groupName) {
			this.group_Type="groupHair"
			var el = event.currentTarget
			var userName = $(el).val()
			this.groupName=userName
            if (this.groupName === '') {
                this.groupPlaceHolder = '组名不能为空，请重新输入'
            }
            this.$emit('modifyGroupEvent',  this.groupId, this.group_Type, this.groupName)
            this.activeTag = this.groupName
            this.groupName = ''
            this.Qunfen = false
            $('.vu_m-new-input').hide()
	    },
        saveZu: function () {
            this.groupId = $('.c_active').val()
            if(this.formData.groupName==""){
              this.tipsTag = true
              this.tipsMsg = '请先创建组'
            }else{
              if(this.formData.userIds.length==0){
                if(this.groupList.groupHair.length!=0){
                  this.kongTag = true
                }
              }else{
                this.$emit('saveGroupEvent', this.groupId, 'groupHair', this.formData.userIds)
              }
            }
        },
        delConfirm: function () {
            this.$emit('delGroupEvent', this.groupId, 'groupHair')
            this.Qunpopup = false
            this.formData.userIds = []
            this.formData.groupName = ''
            if($('.c_zuBox ul li').length==1){
                $('.vu_fenzu_right_div').hide()
            }else{
                $('.vu_fenzu_right_div').show()
            }
            if(this.groupList.groupHair.length!=0&&this.formData.groupName!=""){
              this.formData.userIds = this.groupList.groupHair[this.groupTag].userIds
            }
            $('.vu_fenzu_right_div').hide()
        },
        zuDel: function (event, groupId) {
            event.stopPropagation()
            this.Qunpopup = true
            this.groupId = groupId
        },
        popcancel: function () { // 关闭删除弹框
            this.Qunpopup = false
        },
        onGroup: function (group,index,event) {
            this.groupId = group.groupId
            this.activeTag = group.groupName
            this.groupTag = index
            $('.vu_fenzu_right_div').show()
            var _this = $(event.currentTarget)
            $('.vu_qunfenzhu_ul>li').removeClass('vu_open')
            $(".vu_qunfenzhu_ul ul").css({height: '0px'});
            var obj = _this.children("ul");
            if (obj.height() == 0) {
                _this.addClass('vu_open')
                var arr = obj.children("li");
                var height = arr.height() * arr.length;
                obj.css({height: height + 'px'});
            }
        },
        openSetZu: function () {
            if(!this.newZuTag){
                if(this.groupList.groupHair.length==4){
                    this.tipsTag = true
                    this.tipsMsg = '最多创建4个组'
                }else{
                    this.newZuTag = true
                }
            }
        },
        closeSetName: function () {
            this.newZuTag = false
        },

      /* qunNew部分开始 */
      cjbj: function () {
         $('#mytrade_form').show();
         var oDiv= document.getElementById('mytrade_main_yi')
        	localStorage.qunfak++
	        oDiv.style.zIndex=localStorage.qunfak
            //this.showQunFa = false
      },
      chooseGou: function () {//是否勾选报价识别
        this.chooseG = !this.chooseG
      },
      sendGroupMsg: function () {
        var userIds = []
      //if(this.cnewkai) {
          if (this.formData.userIds.length < 1 && !this.chooseG) {
                this.tipsTag = true
                this.tipsMsg = '请先选择群发人员'
                return
          }else if (this.groupMsg === '') {
              //this.tipsTag = true
              //this.tipsMsg = '群发消息不能为空.'
                toastr.warning('群发消息不能为空.')
                return
          }
          userIds = this.formData.userIds
          this.$emit('sendGroupMsgEvent', userIds, this.groupMsg, this.chooseG || this.cnewguan)
          this.placeholderMsg = this.groupMsg
          this.groupMsg = ''
      },
      sendGroupM: function () {
            var userIds = []
            if (this.formData.userIds.length < 1 && !this.chooseG) {
                this.tipsTag = true
                this.tipsMsg = '请先选择群发人员'
                return
            }else if (this.groupMsg === '') {
                toastr.warning('群发消息不能为空.')
                return
            }
            userIds = this.formData.userIds
            this.$emit('sendGroupMsgEvent', userIds, this.groupMsg, this.chooseG || this.cnewguan)
            this.groupMsg = ''
            this.placeholderMsg = '请您粘贴信息'
      },
			checkAll: function (event, userIds) {
        var el = event.currentTarget
        var opt = $(el).html()
        if (opt === '+') {
          // 添加formData.userIds
          $(el).html('-')
          for (var i = 0, lg = userIds.length; i < lg; i++) {
            if (!this.in_array(userIds[i], this.formData.userIds)) {
              this.formData.userIds.push(userIds[i])
            }
          }
        } else {
          // 删除formData.userIds
          $(el).html('+')
          this.formData.userIds = this.formData.userIds.filter(t => !this.in_array(t, userIds))
          this.everyone=false
        }
      },
		
      in_array: function (search, array) {
            for (var i in array) {
              if (array[i] === search) {
                return true
              }
            }
            return false
      },
      // 折叠
      accordion: function (event) {
          var _this = $(event.currentTarget)
          _this.next('ul').slideToggle()
          _this.parent('li').toggleClass('vu_open')
      },
      tipscancel: function () {//关闭提示框
          this.tipsTag = false
      },
      kongcancel: function () {//关闭清空提示框
          this.kongTag = false
      },
      kongOK: function(){ //确认清空
          this.kongTag = false
        //this.delConfirm()
      },

      dange_xua:function(event,index){},

      dragqun: function (ev) {
        var oDiv = document.getElementById('vu_div-qun')
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
      dragqun_1:function(){
//    	var oDiv = document.getElementById('vu_div-qun')
//    	localStorage.qunfak++
//      oDiv.style.zIndex=localStorage.qunfak
      },
      jinzhi: function (event) {
            event.stopPropagation()
      },
      /* qunNew.vue部分结束 */


      //群发种类
      qunFa: function () {
            this.showQunFa = true
            var oDiv = document.getElementById('vu_div-qun')
            localStorage.qunfak++
            oDiv.style.zIndex=localStorage.qunfak
      },
      closeQunFa: function () {
            this.showQunFa = false
            this.Qunfen=false
            this.qunbuzhu=false
            this.qunfazhu=true
            $('.c_qunquan_qie span').removeClass('c_qunquan_active')
            $('.c_qunquan_qie span').eq(0).addClass('c_qunquan_active')
      },
      /* qunNew部分结束 */

      c_newkai:function(){ //群发报价开
            this.cnewkai=false
            this.cnewguan=true
            $('.c_qunDiv').css('height','40px')
            $('#groupHairMsg').css('height','394px')
            //this.bianji_linshi=false
        	//this.opensetzhu=true
      },
      c_newguan:function(){ //群发报价关
            this.cnewkai=true
            this.cnewguan=false
            $('.c_qunDiv').css('height','292px')
            $('#groupHairMsg').css('height','142px')
      },
      qun_qunfazhu:function(event){ //点击群发切换
            var el = event.currentTarget
            $('.c_qunquan_qie span').removeClass('c_qunquan_active')
            $(el).addClass('c_qunquan_active')
            this.qunfazhu=true
            this.qunbuzhu=false
    //    	if(this.groupList.groupHair.length!=0&&this.formData.groupName!=""){
    //          this.formData.userIds = this.groupList.groupHair[this.groupTag].userIds
    //      }
      },
      qun_qunbuzhu:function(event){ //点击全部人员切换
            var el = event.currentTarget
            $('.c_qunquan_qie span').removeClass('c_qunquan_active')
            $(el).addClass('c_qunquan_active')
            this.qunfazhu=false
            this.qunbuzhu=true
      },
      vue_qunclear:function(){
      	    this.formData.userIds = []
      },
      qunfakuang:function(){
            var oDiv = document.getElementById('vu_div-qun')
            localStorage.qunfak++
            oDiv.style.zIndex=localStorage.qunfak
      },
      openEchart:function(uid){ //打开对话框
	        this.$emit('openTempTalkEvent', uid)
      }
    },
    //qunNew部分内容
    filters: {
        online (userIds, userList) {
            var onlineCnt = 0
            userIds.forEach(uid => { if (userList[uid].isOnline) onlineCnt++ })
            return onlineCnt
        }
    },

  }
</script>

<style>

</style>
