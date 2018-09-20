<template>
  <div id="vue_echart">
    <div class="vue_echart" v-show="!showQunFa">
      <!--切换选项-->
      <div class="vue_chart_yi">
        <div class="vue-chart-head">

          <div class="vue_chat_company">
            <div class="vue_chat_div" @mouseenter="companyclick" @mouseleave="companyleav">
              <span :class="{vue_company_tubiao:true,chooseIco:chooseTag==2}"></span>
              <span :class="{vue_chatkind_name:true,choose:chooseTag==2}">公司</span>
              <span class="vue_chat_jiantou"></span>
              <!--下拉表-->
	            <ul class="vue_company_ul" v-show="companyshow">
	              <li v-for="(companyitem,index) in companyList" @click="addcom(companyitem,index)"><span></span>{{companyitem.name}}</li>
	            </ul>
            </div>

            <!--右边切换选项-->
            <ul class="vue_company_species">
              <li v-for="(comspitem,comindex) in comsplist" :class="{'comactive': comspitem.isActive}" >
                <span @click="changecom(comspitem,comindex)">{{comspitem.name}}</span>
                <p @click="delcom(comindex)"><span></span></p>
              </li>
            </ul>
          </div>
          <div class="vue_chat_people">
            <div class="vue_chat_div"  @mouseenter="peopleclick" @mouseleave="peopleleave">
              <span :class="{vue_people_tubiao:true,chooseIco:chooseTag==3}"></span>
              <span :class="{vue_chatkind_name:true,choose:chooseTag==3}">人员</span>
              <span class="vue_chat_jiantou"></span>
              <!--下拉表-->
	            <ul class="vue_people_ul" v-show="peopleshow">
	              <li v-for="(peopleitem,index) in peopleList" @click="addpeo(peopleitem,index)">
	                <span><img v-bind:src="peopleitem.pic_url" alt="" v-if="peopleitem.hasOwnProperty('pic_url')"/></span>
	                <p>{{peopleitem.nickname}}</p>
	              </li>
	            </ul>
            </div>

            <!--右边切换选项-->
            <ul class="vue_company_species vue_people_species">
              <li v-for="(peospitem,peoindex) in peosplist" :class="{'peoactive': peospitem.isActive}">
                <span @click="changepeo(peospitem,peoindex)">{{peospitem.nickname}}</span>
                <p @click="delpeo(peoindex)"><span></span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <!----曲线图表 start-->
			<div class="vue_chat_kind">  <!--//品种分类·-->
        <!--<div class="vue_chat_div" @click="kindclick">
          <span :class="{vue_chatkind_tubiao:true,chooseIco:chooseTag==1}"></span>
          <span :class="{vue_chatkind_name:true,choose:chooseTag==1}">种类</span>
          <span class="vue_chat_jiantou"></span>
        </div>-->
        <!--下拉表-->
        <ul class="vue_kind_ul">  <!--v-show="kindshow"-->
          <li v-for="(catalogItem,index) in catalogList" @click="addcatalog(catalogItem,index)" :class="{'vue_kind-active':index == activeIndex}">{{catalogItem.name}}</li>
        </ul>
        <!--右边切换选项-->
        <!--<ul class="vue_kind_species">
          <li>
            <span>{{selectCatalogName}}</span>
          </li>
        </ul>-->
      </div>
      <div id="myTabContent" class="tab-content tab_mm" style="margin-top: 10px;">

        <div v-for='(catalog,index) in catalogList'  v-show="catalog.show==1?true:false" v-bind:id="'pan_'+catalog.id" >
          <div class="col-xs-8 chart-pane"  v-bind:id="'pan_data_'+catalog.id" ></div>
          <div class="col-xs-3 col-md-3 col-sm-12 price-list">
                <div class="">
                   <div class="row trend-syn-table-title">
                        <div class="col-md-4 col-xs-4 ">买/卖</div>
                        <div class="col-md-4 col-xs-4 base_font1">价格</div>
                        <div class="col-md-4 col-xs-4 base_font1">报价数</div>
                    </div>
                    <div v-bind:id="'bird_price_banner_'+catalog.id" class="vue_bird_price">
                    		<div class="vue_chart_hight vue_chart_price">
	                    			<span>最高</span>
	                    			<span>7800</span>
	                    			<span>1</span>
                    		</div>
                        <ul class="bird_sell brid_ul">

                        </ul>
                        <div class="current_price"></div>
                        <ul class="bird_buy brid_ul">

                        </ul>
                        <div class="vue_chart_low vue_chart_price">
	                    			<span>最低</span>
	                    			<span>7800</span>
	                    			<span>1</span>
                    		</div>
                    </div>
                </div>
            </div>
          <div class="clear"></div>
          <div class="ckdp_icon"><a href="javascript:;"></a></div>
        </div>
      </div>

      <!----曲线图表 end--->


      <!--实时报价信息 start-->
      <div class="vue-chart-foot">
        <div class="vue-realtime">
          <div class="vue-realtime-time">
            <div class="vue-real-img">
              <p class="vue-real-img-img"></p>
              <span>实时报价</span>
            </div>
            <div class="vue-tealtime-time">
              <ul class="vue-realtime-auto"  v-for='(catalog,index) in catalogList' v-show="catalog.show==1?true:false" v-bind:id="'realtime_'+catalog.id"></ul>
            </div>
            <div class="vue-tealtime-right" v-for='(catalog,index) in catalogList' v-show="catalog.show==1?true:false" v-bind:id="'static_data_'+catalog.id">
	            	<div class="vue_right_yi">
		            		<img src="../images/bj.png" alt="" />
		            		<span>当前最多报价</span>
	            	</div>
	            	<div class="vue_right_er">
		            		<span>卖：</span>
		            		<ul class="bird_sell">
		            		</ul>
	            	</div>
	            	<div class="vue_right_san">
		            		<span>买：</span>
		            		<ul class="bird_buy">
		            		</ul>
	            	</div>
            </div>
          </div>
          <br clear="all"/>
        </div>
      </div>
      <!--实时报价信息 end-->
    </div>

    <!-- 群发框 -->
    <div class="c_qunBox" v-show="showQunFa">
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='match'">乙二醇-一键报盘<span><img src="../images/closeQF.png" alt="" @click="closeQunFa"></span></div>
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='trade'">乙二醇-一键询价<span><img src="../images/closeQF.png" alt="" @click="closeQunFa"></span></div>
      <div class="c_imgntent">
        <div class="c_qunPeo">
          <div class="c_qunPeoTitle">选择群发人员</div>
          <div class="vu_fenzu_left vu_accordion" @mousedown="jinzhi" style="width: 100%!important;height: 100%px!important;position: relative;
    z-index: 3;">
            <div v-if="user.plat=='match'&&this.companyLists.length==0" class="c_dingTips">暂无盯盘</div>
            <div v-if="user.plat=='trade'&&this.companyLists.length==0" class="c_dingTips">您还没有对任何人进行盯盘<br/>请<a href="/trade/collect/create">[添加盯盘]</a>
            </div>
            <ul class="vu_fenzu_left_ul" style="width: 100%;height: 100%;">
              <li v-for="companyItem in companyLists" :class="{'vu_accordion_li': companyItem.isCalling}">
                <div class="vu_link newQunFa" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span><p class="vu_check-all" title="点击全选" @click="checkAll($event,companyItem.userIds)">+</p></div>
                <ul class="vu_submenu vu_submenu_ul">
                  <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem,formData.userIds)}" >
                    <div class="vu_m-touxiang newQunFa">
                      <img :src="userList[userItem].img" alt=" " :class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
                    </div>
                    <a class="newQunFa">{{userList[userItem].name}}</a>
                    <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" ><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="c_qunBaoJia">
          <div class="c_qunDiv">
            <p v-show="formData.userIds.length!=0">已选择<span>{{formData.userIds.length}}</span>个联系人</p>
            <p v-show="formData.userIds.length==0">请从左侧选择人员</p>
            <div v-show="formData.userIds.length!=0||groupList.groupHair.length!=0" class="c_zuBox">
              <ul>
                <li :class="{c_active:groups.groupName==activeTag}" v-for="(groups,index) in groupList.groupHair" @click="onGroup(groups)" :value="groups.groupId"><div>{{groups.groupName}}</div><span @click="zuDel($event,groups.groupId)"></span></li>
              </ul>
              <div class="c_newQunBox">
                <div @click="saveZu">保存群组</div>
                <div @click="openSetZu">+创建群组</div>
              </div>
            </div>
            <ul class="vu_fenzu_right_ul newQunFa">
              <li v-for="uid in formData.userIds" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" :class="{ 'vu_gray':!userList[uid].isOnline}"/></div> <a>{{userList[uid].name}}</a> <span @click="delUser(uid)"></span></li>
            </ul>
          </div>
          <div class="vu_qunnew-que newQunFa">
            <!--<div>*请您核对群发消息内容:</div>-->
            <form id="addQuickForm" class="form-horizontal form form-builder" style="height: 100%">
              <textarea class="row" id="groupHairMsg" name="groupHairMsg" v-model="groupMsg" placeholder="请您粘贴信息"></textarea>
            </form>
          </div>
          <div class="c_openBox">
            <div class="c_shiBieButton" data-cnt="0" ref="btn" @click="sendGroupMsg()" id='quick_parse_create'style="margin-top: 14px;">
              发送
            </div>
            <div class="c_openShibie" v-if="user.plat=='match'"><span :class={gou:chooseG} @click="chooseGou"></span>开启报价识别</div>
          </div>
        </div>
      </div>
      <!--<img src="../images/tips.png" alt="" class="c_qunTips" v-show="formData.userIds.length==0">-->
    </div>

    <!--提示框-->
    <div class="vu_del-popup" v-show="tipsTag" style="left:25%;">
      <div class="vu_fen_zu_title">
        <span>提示</span>
        <p class="vu_fen_zu_tier"  @click="tipscancel"><span></span></p>
      </div>
      <p>{{tipsMsg}}</p>
      <div class="vu_fenzu_name_footer"><button @click="tipscancel">确认</button> <span class="vu_fen_zu_tier" @click="tipscancel">取消</span></div>
    </div>

    <!--设置组名称-->
    <div class="vu_fenzu_name" style="z-index: 98;background: #fff;left: 45%;top:36%;box-shadow: 5px 18px 5px #ccc;" v-show="newZuTag">
      <div class="vu_fen_zu_title">
        <span>设置组名称</span>
        <p class="vu_fen_zu_tier" @click="closeSetName"><span></span></p>
      </div>
      <p class="vu_fenzu_name_na">请输入组名称(最多六个字)：</p>
      <input type="text" class="vu_fenzu_name_input" name="groupName" v-model="createGroupName" :placeholder="placeholder" maxlength="6" />
      <div class="vu_fenzu_name_footer" style="background: #f6f6f6;">
        <button @click="submitGroup">确认</button>
        <span class="vu_fen_zu_tier" @click="closeSetName">取消</span>
      </div>
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

		<div class="vue_qun_line" v-if="user.plat=='trade'"></div>
    <!-- 群发报价 -->
    <div class="c_btn_box" v-if="user.plat=='match'">
      <div class="vue_bp_offer" @click="qunFa()"><p></p><span>一键报盘</span></div>
      <div class="vue_cj_offer" @click="cjbj()"><p></p><span>成交报价</span></div>
    </div>
    <!--<div v-if="user.plat=='match'" class="vue_cj_offer" @click="qunFa()"><p></p><span>成交报盘</span></div>-->
    <!--<div v-if="user.plat=='match'" class="vue_qun_offer" @click="qunFa()"><p></p><span>一键报盘</span></div>-->
    <div v-if="user.plat=='trade'" class="vue_qun_offer" @click="qunFa()"><p></p><span>一键询价</span></div>
  </div>


</template>

<script>
  //let echarts = require('echarts/lib/echarts')
  // 引入折线图组件
  //require('echarts/lib/chart/line')
  // 引入提示框和title组件
  //require('echarts/lib/component/tooltip')
  //require('echarts/lib/component/title')
  export default {
    name: 'hello',
    props: ['user', 'userList', 'groupList', 'companyLists'],
    data() {
      return {
      	activeIndex:0,
        kindshow:false,
        companyshow:false,
        peopleshow:false,
        catalogList:match_hall_catalogs,
        companyList:match_hall_companies,
        peopleList:[{nickname:'请先选择公司'}],
        comsplist:[],
        peosplist:[],
        selectCatalogName:match_hall_catalogs[0].name,
        selectPid:match_hall_catalogs[0].id,
        selectUid:0,
        selectCid:'',
        isActive:false,
        chooseTag:1,//选择标识
        chooseCatalog:match_hall_catalogs[0].catalog_id,//选中种类
        showQunFa:false,//显示群发
        //qunNew部分内容
        formData: {
          userIds: [],
          groupName: ''
        },
        placeholder: '请输入分组名称.',
        newZuTag:false,
        groupMsg:'',//群发内容
        chooseG:false,
        tipsTag:false,//提示框
        tipsMsg:'',//提示信息
        showCjbj:false,//成交报价
        activeTag:'',//组选中标识
        createGroupName:'',//新建群组名称
        Qunpopup: false, // 确认弹窗关闭
        groupId:'',//删除组的
      }
    },
    mounted() {
      if(this.groupList.groupHair.length!=0){
        this.activeTag = this.groupList.groupHair[0].groupName
        this.groupId = this.groupList.groupHair[0].groupId
        this.formData.groupName = this.groupList.groupHair[0].groupName
        this.formData.userIds = this.groupList.groupHair[0].userIds
      }
      $(".vue-tealtime-time>ul").niceScroll({
        cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        background: "", // 轨道的背景颜色
        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
        disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
      });
      $('#myTabContent>div').eq(0).css('height','auto')
      $('.vue_kind_ul li').on('click',function(){
        var index=$('.vue_kind_ul li').index(this)
        $('#myTabContent>div').css('height','0')
        $('#myTabContent>div').eq(index).css('height','auto')
      })
      $(".vu_fenzu_left_ul").niceScroll({
        cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        background: "", // 轨道的背景颜色
        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
      });
    },
    methods: {
      //qunNew部分内容
      saveZu: function () {
        this.groupId = $('.c_active').val()
        if(this.formData.groupName==""){
          this.tipsTag = true
          this.tipsMsg = '请先创建组'
        }else{
          if(this.formData.userIds.length==0){
            this.delConfirm()
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
      },
      zuDel: function (event, groupId) {
        event.stopPropagation()
        this.Qunpopup = true
        this.groupId = groupId
      },
      popcancel: function () { // 关闭删除弹框
        this.Qunpopup = false
      },
      onGroup: function (group) {
        this.groupId = group.groupId
        this.activeTag = group.groupName
        this.formData.groupName = group.groupName
        this.formData.userIds = group.userIds
      },
      openSetZu: function () {
        if(!this.newZuTag){
          this.newZuTag = true
        }
      },
      closeSetName: function () {
        this.newZuTag = false
      },
      submitGroup: function () {
       if (this.formData.userIds.length < 1) {
         // alert('请先选择人员，再创建组')
         // this.tipsTag = true
         // this.tipsMsg = '请先选择人员，再创建组'
         this.placeholder = '请先选择人员，再创建组'
         return false
       } else{
          if (this.createGroupName === '') {
            this.placeholder = '请输入分组名称，再提交'
            return false
          }
          this.formData.groupName = this.createGroupName
          this.newZuTag = false
          this.formData.groupType = 'group'
          this.$emit('createGroupEvent', this.formData)
          this.activeTag = this.formData.groupName
          // this.formData.userIds = []
          // this.formData.groupName = ''
          this.createGroupName = ''
        }
      },
      /* qunNew部分开始 */
      cjbj: function () {
          this.showCjbj = true
          $('#mytrade_form').show();
          this.showCjbj = false
      },
      tipscancel: function () {//关闭提示框
        this.tipsTag = false
      },
      chooseGou: function () {//是否勾选报价识别
        this.chooseG = !this.chooseG
      },
      sendGroupMsg: function () {
        if (this.formData.userIds.length < 1 && !this.chooseG) {
          this.tipsTag = true
          this.tipsMsg = '请先选择群发人员'
          return
        } else if (this.groupMsg === '') {
          this.tipsTag = true
          this.tipsMsg = '群发消息不能为空.'
          return
        }
        this.$emit('sendGroupMsgEvent', this.formData.userIds, this.groupMsg, this.chooseG)
        // this.formData.userIds = []
        // this.close() // 关闭窗口
        this.groupMsg = ''
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
      delUser: function (uid) {
        if(this.groupList.groupHair.length!=0&&this.formData.userIds.length==1){
          this.tipsTag = true
          this.tipsMsg = '若清空好友，分组将被删除'
        }
        this.formData.userIds = this.formData.userIds.filter(t => t !== uid)
      },
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
          if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
            l = document.documentElement.clientWidth - oDiv.offsetWidth
          }
          if (t < 5) { t = 0 }
          if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50) {
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
      jinzhi: function (event) {
        event.stopPropagation()
      },
      // 折叠
      accordion: function (event) {
        var _this = $(event.currentTarget)
        _this.next('ul').slideToggle()
        _this.parent('li').toggleClass('vu_open')
      },
      /* qunNew.vue部分结束 */
      //群发种类
      qunFa: function () {
        if(this.chooseCatalog!=0){
          if(!this.showQunFa){
            $('.vue_qun_offer').addClass('animated bounce' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $('.vue_qun_offer').removeClass('animated bounce' )})
            $('.vue_bp_offer').addClass('animated bounce' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
              $('.vue_bp_offer').removeClass('animated bounce' )})
          }
            var _this = this;
            setTimeout(function () {
              _this.showQunFa = true
            },700)
        }else{
          // alert('请选择种类');
        }
      },
      closeQunFa: function () {
        this.showQunFa = false;
        if(!this.showQunFa){
          $('.vue_qun_offer').addClass('animated bounce' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.vue_qun_offer').removeClass('animated bounce' )})
          $('.vue_bp_offer').addClass('animated bounce' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.vue_bp_offer').removeClass('animated bounce' )})
        }
      },
      showShibie: function (event) {
      },
      /* qunNew部分结束 */
      kindclick: function (){
        this.kindshow=!this.kindshow,
          this.companyshow=false,
          this.peopleshow=false
        this.chooseTag=1
      },
      companyclick: function (){
  		this.companyshow=true,
  		this.kindshow=false,
  		this.peopleshow=false
     this.chooseTag=2
  	},
  	companyleav: function(){
  		this.companyshow=false,
  		this.kindshow=false,
  		this.peopleshow=false
  	},
  	peopleclick: function (){
  		this.peopleshow=true,
  		this.companyshow=false,
  		this.kindshow=false
      this.chooseTag=3
  	},
    peopleleave:function(){
    	this.peopleshow=false,
  		this.companyshow=false,
  		this.kindshow=false
    },

      addcatalog(catalogItem,index){//种类切换
      	this.activeIndex = index
        this.catalogList.map((v,i)=>{
          if(index!=i){
            v.show=0
          }else{
            v.show=1;
          }
        });
        this.kindshow=false;
        this.selectCatalogName=catalogItem.name;
        this.selectPid=catalogItem.id;
        this.chooseCatalog = catalogItem.catalog_id;
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },

      addcom(companyitem,index){//公司添加到右侧
        this.peopleList=companyitem.members;//联动人员下拉框
        this.selectCid=companyitem.id;
        this.selectUid=0;
        this.peosplist=[];
        this.companyshow=false
        let selectedItem = this.comsplist.filter(v => v.name === companyitem.name)[0];
        if (selectedItem) {
          $('.vue_company_species>li').attr('class','')
          $('.vue_company_species>li').eq(index).attr('class','comactive')
        } else {
          $('.vue_company_species>li').attr('class','')
          this.comsplist.push({
            ...companyitem ,isActive:true
          })
        };
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      changecom(comspitem,comindex){//公司切换
        this.selectCid=comspitem.id;
        this.selectUid=0;
        this.peopleList=comspitem.members;//联动人员下拉框
        this.peosplist=[];
        $('.vue_company_species>li').attr('class','');
        $('.vue_company_species>li').eq(comindex).attr('class','comactive');
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      delcom(comindex){//公司删除
        this.comsplist.splice(comindex,1);
        this.peopleList=[{nickname:'请先选择公司'}];//清空人员下拉框
        this.peosplist=[];
        this.selectCid='';
        this.selectUid=0;
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图

      },
      addpeo(peopleitem,index){//人员追加到右侧
        this.peopleshow=false;
        this.selectUid=peopleitem.id;
        let peoedItem = this.peosplist.filter(v => v.nickname === peopleitem.nickname)[0];
        if (peoedItem) {
          $('.vue_people_species>li').attr('class','')
          $('.vue_people_species>li').eq(index).attr('class','peoactive')
        }else if(this.selectUid==undefined){
          	return false;
        }else {
          $('.vue_people_species>li').attr('class','')
          this.peosplist.push({
            ...peopleitem,isActive:true
          })
        };
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      changepeo(peospitem,peoindex){//人员切换
        this.selectUid=peospitem.id;
        $('.vue_people_species>li').attr('class','');
        $('.vue_people_species>li').eq(peoindex).attr('class','peoactive');
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      delpeo(peoindex){//人员删除
        this.peosplist.splice(peoindex,1);
        this.selectUid=0;
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
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
  /*报价识别弹框样式*/
  .roleindex_tittle {
    height: 60px;
  }
  .tijia-jiaos {
    display: inline-block;
    margin: 14px 0 0 10px;
    font-size: 18px;
  }
  .roleindex_tittle>div {
    text-align: center;
    line-height: 40px;
  }
  .cuohe_bao_que {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    width: 100%;
    height: 72px;
    background-color: #f6f6f6;
  }
  .cuohe_bao_que div {
    width: 370px;
    margin: 15px auto;
  }
  .cuohe_bao_que button {
    width: 148px;
    height: 40px;
    background-color: #77a7fb;
    border-radius: 5px;
    border: 0;
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #ffffff;
    float: left;
    cursor: pointer;
  }
  .cuohe_bao_que p {
    width: 148px;
    height: 40px;
    background-color: #cccccc;
    border-radius: 5px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #666666;
    float: left;
    text-align: center;
    line-height: 40px;
    margin-left: 70px;
    display: inline-block;
    cursor: pointer;
  }
  .btn-danger {
    right: 20%;
  }
  .cuohe_bao_tan {
    width: 1100px;
    height: 620px;
    background-color: #ffffff;
    box-shadow: 4px 2px 5px 0px rgba(51, 51, 51, 0.13);
    border: solid 1px #cccccc;
    /* margin: 10% auto; */
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
  }
</style>
