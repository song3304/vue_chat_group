<template>
	<div id="leftlist">
		<!--资讯列表-->
		<div class="vue_leftlist">
			<p>资讯列表</p>
			<ul class="vue_leftlist_ul">
				<li v-for="leftitem in leftList" v-bind:cms_id="leftitem.id">
					<a :href="'https://www.xiwanghulian.com/index/cms/info/id/'+leftitem.id" target="_blank" >
						<span>{{leftitem.time}}</span>
						<p>{{leftitem.title}}</p>
					</a>
				</li>
			</ul>
		</div>
		<!--大厅成员-->
		<div class="vue_leftlist_people" v-if="searchData">
      <p>大厅成员</p>
      <input class="vue_leftlist_search" v-model="searchKey" type="text" placeholder="搜索大厅成员"/>
      <ul class="leftlist_people_ul">
        <li v-for="item in searchData" @click="firendchat(item.id)" v-if="item.plat!='user'">
          <div class="leftlist_people_photo"> <!--头像-->
            <img :src="item.img" alt="" />
          </div>
          <span v-if="item.plat=='match'" class="leftlist_people_cuo"></span> <!--撮合公司-->
          <span v-if="item.plat=='trade'" class="leftlist_people_jiao"></span> <!--交易公司-->
          <div class="leftlist_people_name ellipsis"> <!--名称-->
            <span>{{item.name}}</span>
            <p>{{item.company_name}}</p>
          </div>
        </li>
				<!--<li>-->
					<!--<div class="leftlist_people_photo"> &lt;!&ndash;头像&ndash;&gt;-->
						<!--<img src="../images/15.png" alt="" />-->
					<!--</div>-->
					<!--<span class="leftlist_people_jiao"></span> &lt;!&ndash;交易公司&ndash;&gt;-->
					<!--<div class="leftlist_people_name"> &lt;!&ndash;名称&ndash;&gt;-->
						<!--<span>小张</span>-->
						<!--<p>化塑汇</p>-->
					<!--</div>-->
				<!--</li>					-->
			</ul>
		</div>
		<div class="vue_leftlist_tan" v-if="tingList" v-show="firendtan">   <!--加好友弹窗-->
      <img v-if="tingList.plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
      <img v-if="tingList.plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 交易公司 -->
      <div class="vue_leftlist_img"><img :src="tingList.img" alt="" /></div>
      <p class="vue_leftlist_line">{{tingList.name}}</p>
      <p v-if="tingList.plat=='match'" class="vue_leftlist_companycuo">所属公司类型：<span>撮合公司</span></p>
      <p v-if="tingList.plat=='trade'" class="vue_leftlist_companyjiao">所属公司类型：<span>交易公司</span></p>
      <p class="vue_leftlist_companyname">所属公司：{{tingList.company_name}}</p>
      <p class="vue_leftlist_companyname">手机号：{{tingList.phone||'无'}}</p>
      <div class="vue_leftlist_companysz" v-if="tingList.id!=user.id" v-show="isNull||isFriNull||isFriType">
        <span class="vue_leftlist_companysz_yi" @click="openTempTalk(tingList.id)">临时会话</span>
        <span class="vue_leftlist_companysz_er" @click="openVerify">添加好友</span>
        <!--<p>聊天</p>-->
      </div>
			<div class="vue_leftlist_close" @click="leftlistclose"><span></span></div>
		</div>
    <div class="vue_leftlist_tan" v-if="tingList" v-show="sendfirendtan">   <!--加好友弹窗-->
      <img v-if="tingList.plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
      <img v-if="tingList.plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 交易公司 -->
      <div class="vue_leftlist_img"><img :src="tingList.img" alt="" /></div>
      <p class="vue_leftlist_line verify">{{tingList.name}}</p>
      <p v-if="tingList.plat=='match'" class="vue_leftlist_companycuo verify">所属公司类型：<span>撮合公司</span></p>
      <p v-if="tingList.plat=='trade'" class="vue_leftlist_companyjiao verify">所属公司类型：<span>交易公司</span></p>
      <p class="vue_leftlist_companyname">所属公司：{{tingList.company_name}}</p>
      <p class="vue_leftlist_companyname">手机号：{{tingList.phone||'无'}}</p>
      <textarea v-model="verifymsg" placeholder="验证信息："></textarea>
      <div class="vue_leftlist_companysz">
        <span class="vue_leftlist_companysz_yi" @click="openTempTalk(infoId)">临时会话</span>
        <span class="vue_leftlist_companysz_er" @click="addFriend(infoId,verifymsg)" style="color: #4385F5;">发送</span>
        <!--<p>聊天</p>-->
      </div>
      <div class="vue_leftlist_close" @click="openVerify"><span></span></div>
    </div>
	</div>
</template>

<script>
	export default {
  	components:{},
  	// props:{},
    props: ['onlineUserList','user', 'userList'],
    data(){
  		return{
  			firendtan:false,
        searchKey:'',
        infoId:2,
			  leftList:match_hall_cms,
        chat_hall_members: _chat_hall_members,
        sendfirendtan:false,
        tingList:null,
        verifymsg:'',//验证信息
  		}
  	},
    computed: {
      searchData: function () {

        var search_data;
        if (this.searchKey === '') {
          search_data = this.chat_hall_members
        } else {
          search_data = this.chat_hall_members.filter(item=>item.name.indexOf(this.searchKey)>=0)
        }
        for(var i=0,lg=search_data.length;i<lg;i++){
          search_data[i].isOnline = this.onlineUserList.hasOwnProperty(search_data[i].id)
        }
        search_data.sort(function(a,b){return a.isOnline?false:(b.isOnline?true:false)})
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
      }
    },
  methods: {
    openVerify: function () {
      this.firendtan = false
      this.sendfirendtan = !this.sendfirendtan
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
      // console.log(this.tingList)
      // console.log(this.chat_hall_members)
    },
    leftlistclose: function () {
      this.firendtan = false
    },
    openTempTalk: function (otherUid) {
      this.$emit('openTempTalkEvent', otherUid)
      this.firendtan = false;
      this.sendfirendtan = false;
    },
    addFriend: function (otherUid, msg) {
      // if(msg==''){
      //   alert('验证信息未填写')
      // }
      this.$emit('addFriendEvent', otherUid, msg)
      this.verifymsg = ''
      this.sendfirendtan = false
    }
  },
	mounted() {
    // console.log('大厅',typeof (this.onlineUserList))
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
	},

}
</script>

<style>
</style>
