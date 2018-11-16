<template>
	<div id="leftlist">
		<div id="leftlist_nowdate">
	      <a v-if="user.plat=='match'" target="_blank" href='/match/profile/index'><img :src="user.img" alt="" /></a>
	      <a v-if="user.plat=='trade'" target="_blank" href='/trade/profile/index'><img :src="user.img" alt="" /></a>
				<span>{{user.name}}</span>
				<a v-if="user.plat=='match'" href='/match/auth/logout.html'>[退出]</a>
	      <a v-if="user.plat=='trade'" href='/trade/auth/logout.html'>[退出]</a>
	    </div>
		<!--资讯列表-->
		<div class="vue_leftlist">
			<p class="c_newTitle"><span class="c_newIco"></span>资讯列表</p>
			<ul class="vue_leftlist_ul">
				<li v-for="(leftitem,$index) in match_hall_cms" v-bind:cms_id="leftitem.id" @click="wenxiang($index,leftitem.id)">
					<!--<a :href="'https://www.xiwanghulian.com/index/cms/info/id/'+leftitem.id" target="_blank" @click="wenxiang">-->
						<!--<span>{{leftitem.time}}</span>
						<p>{{leftitem.title}}</p>-->
						<p v-if="$index>0" class="redian_news">
							<span class="redian_news_span" v-if="match_hall_cms[$index].time!==match_hall_cms[$index-1].time">{{leftitem|lastDate}}</span>
						</p>
						<p v-if="$index==0" class="redian_news">
							<span class="redian_news_span">{{leftitem|lastDate}}</span>
						</p>
						<div class="vue_leftlist_left">
							<!--<p>{{leftitem|lastDate}}</p>-->
							<span>{{leftitem|lastTime}}</span>
						</div>
						<div class="vue_leftlist_center">
							<span></span>
							<p></p>
						</div>
						<p class="vue_leftlist_main">{{leftitem.title}}</p>
						<!--热点资讯弹框-->
					    <div class="vueleft_left_main" v-show="$index === lefttan" v-if="currentCms!=null">
					     	<div class="vue_left_main">
					     		<img src="../images/shanchu.png" alt="" @click.stop="leftshan()"/>
					     		<div class="vue_left_main_yi">
						     		<h2>{{leftitem.title}}</h2>
						     		<div class="vueleft-center-title">
										<span>作者：{{currentCms.author}}</span>
										<span>来源：{{currentCms.origin}}</span>
										<span>发布时间：{{leftitem.create_time}}</span>
									</div>
									<div class="vueleft-center-main" v-html="currentCms.contents"></div>
								</div>
					     	</div>
					    </div>
				</li>
			</ul>
			<div class="vue_left_message" id="vue-message" @click="vuenew(popCms.id)" v-if="popCms!=null"> <!--新消息-->
				<div class="vue_left_message_time">
					<p>
						<img src="../images/xiaoxi.png" alt="" />
						<span>新消息提醒</span>
					</p>
					<span>{{popCms|shifen}}</span>
				</div>
				<p class="vue_left_message_title">{{popCms.title}}</p>
				<p class="vue_left_message_main">{{popCms.contents}}</p>
			</div>
			<div class="vueleft_left_main" v-show="vuenewxiang" v-if="currentCms!=null"> <!--新消息详情-->
		     	<div class="vue_left_main">
		     		<img src="../images/shanchu.png" alt="" @click="newxiangshan()"/>
		     		<div class="vue_left_main_yi">
			     		<h2>{{currentCms.title}}</h2>
			     		<div class="vueleft-center-title">
							<span>作者：{{currentCms.author}}</span>
							<span>来源：{{currentCms.origin}}</span>
							<span>发布时间：{{currentCms.create_time}}</span>
						</div>
						<div class="vueleft-center-main" v-html="currentCms.contents"></div>
					</div>
		     	</div>
		    </div>
		</div>
		<!--大厅成员-->
		<div class="vue_leftlist_people" v-if="searchData">
	      <p class="c_newTitle"><span class="c_newIco"></span>全部成员 </p>
	      <div style="height: 50px;border-bottom: 1px solid #d8d6e8;">
	      	<span :class="{peopleChooseCuo:true,'chooseCuo': chooseCuo}" @click="choosePeople('cuo')">撮合</span>
	      	<span :class="{peopleChooseMao:true,'chooseMao': chooseMao}" @click="choosePeople('mao')">贸易商</span>
          <input class="vue_leftlist_search" v-model="searchKey" type="text" placeholder="搜索大厅成员"/>
	      </div>
	      <ul class="leftlist_people_ul">
	        <li v-for="item in searchData" @click="firendchat(item.id)" v-if="item.plat!='user'">
	          <div class="leftlist_people_photo"> <!--头像-->
	            <img :src="item.img" alt="" :class="{ 'vu_gray':item.isOnline==false} "/>
	          </div>
	          <span v-if="item.plat=='match'" class="leftlist_people_cuo"></span> <!--撮合公司-->
	          <span v-if="item.plat=='trade' && item.trade_type=='trade'" class="leftlist_people_jiao"></span> <!--贸易公司-->
	          <span v-if="item.plat=='trade' && item.trade_type=='factory'" class="leftlist_people_factory"></span> <!--工厂-->
	          <div class="leftlist_people_name ellipsis"> <!--名称-->
	            <span>{{item.name}}</span>
	            <p>{{item.company_name}}</p>
	          </div>
	        </li>
				<!--<li>-->
					<!--<div class="leftlist_people_photo"> &lt;!&ndash;头像&ndash;&gt;-->
						<!--<img src="../images/15.png" alt="" />-->
					<!--</div>-->
					<!--<span class="leftlist_people_jiao"></span> &lt;!&ndash;贸易公司&ndash;&gt;-->
					<!--<div class="leftlist_people_name"> &lt;!&ndash;名称&ndash;&gt;-->
						<!--<span>小张</span>-->
						<!--<p>化塑汇</p>-->
					<!--</div>-->
				<!--</li>					-->
			</ul>
		</div>
		<div class="vue_leftlist_tan" v-if="tingList" v-show="firendtan">   <!--加好友弹窗-->
	      <img v-if="tingList.plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
	      <img v-if="tingList.plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 贸易公司 -->
	      <div class="vue_leftlist_img"><img :src="tingList.img" alt="" /></div>
	      <p class="vue_leftlist_line">{{tingList.name}}</p>
	      <p v-if="tingList.plat=='match'" class="vue_leftlist_companycuo">所属公司类型：<span>撮合公司</span></p>
	      <p v-if="tingList.plat=='trade'" class="vue_leftlist_companyjiao">所属公司类型：<span>贸易公司</span></p>
	      <p class="vue_leftlist_companyname">所属公司：{{tingList.company_name}}</p>
	      <p class="vue_leftlist_companyname">手机号：{{tingList.phone||'无'}}</p>
	      <div class="vue_leftlist_companysz" v-if="tingList.id!=user.id" v-show="isNull||isFriNull||isFriType">
	        <span class="vue_leftlist_companysz_yi" @click="openTempTalk(tingList.id)">临时会话</span>
	        <span class="vue_leftlist_companysz_er" @click="openVerify()">{{relation()}}</span>
	        <!--<p>聊天</p>-->
	      </div>
        <div v-show="!isNull&&!isFriNull&&!isFriType" style="width: 100%;height:50px;line-height:50px;text-align: center;color: #999;">
            已添加好友
        </div>
			<div class="vue_leftlist_close" @click="leftlistclose"><span></span></div>
		</div>
	    <div class="vue_leftlist_tan" v-if="tingList" v-show="sendfirendtan">   <!--加好友弹窗-->
	      <img v-if="tingList.plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
	      <img v-if="tingList.plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 贸易公司 -->
	      <div class="vue_leftlist_img"><img :src="tingList.img" alt="" /></div>
	      <p class="vue_leftlist_line verify">{{tingList.name}}</p>
	      <p v-if="tingList.plat=='match'" class="vue_leftlist_companycuo verify">所属公司类型：<span>撮合公司</span></p>
	      <p v-if="tingList.plat=='trade'" class="vue_leftlist_companyjiao verify">所属公司类型：<span>贸易公司</span></p>
	      <p class="vue_leftlist_companyname">所属公司：{{tingList.company_name}}</p>
	      <p class="vue_leftlist_companyname">手机号：{{tingList.phone||'无'}}</p>
	      <textarea v-model="verifymsg" placeholder="验证信息："></textarea>
	      <div class="vue_leftlist_companysz">
	        <span class="vue_leftlist_companysz_yi" @click="openTempTalk(infoId)">临时会话</span>
	        <span class="vue_leftlist_companysz_er" @click="addFriend(infoId,verifymsg)" style="color: #4385F5;">发送</span>
	        <!--<p>聊天</p>-->
	      </div>
	      <div class="vue_leftlist_close" @click="openVerify()"><span></span></div>
	    </div>
		<div class="vue_leftlist_tubiao vue_leftlist_xiao" @click="leftlist_tubiao" v-show="leftlisttu"></div>
		<div class="vue_leftlist_tubiaoxiao vue_leftlist_xiao" @click="leftlist_tubiaoxiao" v-show="leftlisttuxiao"></div>
	</div>
</template>

<script>
	export default {
  	components:{},
  	// props:{},
    props: ['onlineUserList','user', 'userList', 'verifyList', 'currentCms', 'popCms', 'match_hall_cms','chat_hall_members'],
    data(){
  		return{
  			firendtan:false,
	        searchKey:'',
	        infoId:0,
	        sendfirendtan:false,
	        tingList:null,
	        verifymsg:'',//验证信息
	        lefttan:-1,
	        vuenewxiang:false,
          chooseCuo:false,//撮合选中标志
          chooseMao:false,//贸易院中标志
          allData:'',
          dataTag:1,
          leftlisttu:true,
          leftlisttuxiao:false,
  		}
  	},
    computed: {
      searchData: function () {
        if(this.dataTag == 1){
          if(this.user.plat=='match'){
            this.chooseMao = true
            this.allData = this.chat_hall_members.filter(item=>item.plat.indexOf('trade')>=0)
            this.chooseCuo = false
          }
          if(this.user.plat=='trade'){
            this.chooseCuo = true
            this.chooseMao = false
            this.allData = this.chat_hall_members.filter(item=>item.plat.indexOf('match')>=0)
          }
        }
        var search_data;
        if (this.searchKey === '') {
          search_data = this.allData
        } else {
          search_data = this.allData.filter(item=>item.name.indexOf(this.searchKey)>=0||item.company_name.indexOf(this.searchKey)>=0)
        }
        for(var i=0,lg=search_data.length;i<lg;i++){
          search_data[i].isOnline = this.onlineUserList.hasOwnProperty(search_data[i].id)
        }
        // search_data.sort(function(a,b){return a.isOnline?-1:(b.isOnline?1:-1)})
        return search_data;
      },
    isNull: function() {
      for(var key in this.userList) {
        return false;
      }
        return true;
      },
      isFriNull:function () {
        if(this.userList[this.infoId]==undefined){
          return true
        }else {
          false
        }
      },
      isFriType:function () {
        if(this.userList[this.infoId].friend_type!='friend'){
          return true
        }else{
          return false
        }
      },

    },
  methods: {
    choosePeople: function(choosePeo){
      this.dataTag = 2
      if(choosePeo=='mao'){
        this.chooseMao = true
        this.chooseCuo = false
        this.allData = this.chat_hall_members.filter(item=>item.plat.indexOf('trade')>=0)
      }
      if(choosePeo=='cuo'){
        this.chooseCuo = true
        this.chooseMao = false
        this.allData = this.chat_hall_members.filter(item=>item.plat.indexOf('match')>=0)
      }
    },
    openVerify: function () {
      if(this.isCanSendVerify()){
        this.firendtan = false
        this.sendfirendtan = !this.sendfirendtan
      }
    },
    firendchat: function (key) {
      this.firendtan = !this.firendtan
      this.infoId = key
      for(var index in this.chat_hall_members){
        if(this.chat_hall_members[index].id==this.infoId){
          this.tingList = this.chat_hall_members[index]
          break;
        }
      }
    },
    leftlistclose: function () {
      this.firendtan = false
    },
    openTempTalk: function (otherUid) {
      this.$emit('openTempTalkEvent', otherUid)
      this.firendtan = false;
      this.sendfirendtan = false;
      $(".vu_m-list ul").niceScroll({
    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        background: "", // 轨道的背景颜色
        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
    });
    },
    addFriend: function (otherUid, msg) {
      this.$emit('addFriendEvent', otherUid, msg)
      this.verifymsg = ''
      this.sendfirendtan = false
      this.userList[otherUid].friend_type = 'verify'
    },
    relation: function () { // 关系
      if(this.userList.hasOwnProperty(this.infoId)){
        if(this.userList[this.infoId].friend_type=='friend'){
          return '已是好友'
        }else if(this.userList[this.infoId].friend_type=='verify'){
          return '已发验证'
        }else {
          return '添加好友'
        }
      }else{
        return '添加好友'
      }
    },
    isCanSendVerify: function () {
      if(this.userList.hasOwnProperty(this.infoId)){
        if(this.userList[this.infoId].friend_type=='friend'){
          return false
        }else if(this.userList[this.infoId].friend_type=='verify'){
          return false
        }else {
          return true
        }
      }else{
        return true
      }
    },
    wenxiang:function($index,cmsId){ //点击详情
    	$(".vueleft-center-main").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    this.$emit('getCmsDetailEvent', cmsId)
	    this.lefttan=$index
    },
    leftshan:function(){//点击关闭删除详情弹窗
    	$('.vueleft_left_main').hide()
    	this.lefttan=-1
    	return false;
    },
    vuenew:function(cmsId){
    	$(".vueleft-center-main").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    this.$emit('getCmsDetailEvent', cmsId)
    	$('.vue_left_message').css('display','block')
    	this.vuenewxiang=true
    },
    newxiangshan:function(){
    	this.vuenewxiang=false
    },
    leftlist_tubiao:function(){
    	this.leftlisttu = false
    	this.leftlisttuxiao = true
    	$('#leftlist').css('width','0')
    	$('.room_homepage').css('width','100%')
    	$('#ascrail2004').hide()
//  	var widthn=$('#vu_friend').width()
//  	if(widthn>200){
//  		$('.vu_m-chatmain').css('width','76.5%')
//  	}else{
//  		$('.vu_m-chatmain').css('width','94.2%')
//  	}
        var realWidth=$("#myTabContent").width();
    	$('.chart-pane,.chart-pane>div').width(realWidth*0.7-30);
    	$('.price-list').width(realWidth*0.3-30);
    	$('.leftlist_people_ul,.vue_leftlist_ul').css('height','0')
    	$(".leftlist_people_ul,.vue_leftlist_ul").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
//    	resizeChart();
		if($('#vu_friend').width()<100){
	   }else{
	    	$('#vu_friend').css('width','18.5%')
			$('#vue_main_main').css('width','80.5%')
	    }
		
    },
    leftlist_tubiaoxiao:function(){
    	this.leftlisttu = true
    	this.leftlisttuxiao = false
    	$('#leftlist').css('width','17.8%')
    	$('.room_homepage').css('width','82%')
    	$('#ascrail2004').show()
//  	var widthn=$('#vu_friend').width()
//  	if(widthn>200){
//  		$('.vu_m-chatmain').css({'width':'63%','min-width':'755px'})
//  	}else{
//  		$('.vu_m-chatmain').css('width','77.2%')
//  	}
    	var realWidth=$("#myTabContent").width();
    	$('.chart-pane,.chart-pane>div').width(realWidth*0.7-30);
    	$('.price-list').width(realWidth*0.3-30);
    	$('.leftlist_people_ul').css('height','80%')
    	$('.vue_leftlist_ul').css('height','75%')
    	$(".leftlist_people_ul,.vue_leftlist_ul").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    if($('#vu_friend').width()<100){	    	
	    }else{
	    	$('#vu_friend').css('width','22.5%')
			$('#vue_main_main').css('width','77%')
	    }
	    
    }
  },
	mounted() {
	    $(".vue_leftlist_ul").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    $(".leftlist_people_ul").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    $(".vueleft-center-main").niceScroll({
	    	cursorcolor: "#cccccc", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	    });
	    $('.redian_news_span').parent().parent().css('margin-top','35px')
	},
	filters: {
		lastTime: function (leftitem) {
		    return leftitem.create_time.substring(11, 16)
	    },
	    lastDate: function(leftitem){
	    	var yue=leftitem.create_time.substring(5, 7)
	    	var tian=leftitem.create_time.substring(8, 10)
	    	return yue+'月'+tian+'日'
	    },
	    shifen: function(popCms){
	    	var yue=popCms.create_time.substring(11,16)
	    	return yue
	    }
	},

}
</script>

<style>
</style>

