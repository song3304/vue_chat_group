<template>
	<div id="leftlist">
		<!--资讯列表-->
		<div class="vue_leftlist">
			<p>资讯列表</p>
			<ul class="vue_leftlist_ul">
				<li v-for="leftitem in leftList" v-bind:cms_id="leftitem.id">
					<span>{{leftitem.time}}</span>
					<p>{{leftitem.title}}</p>
				</li>
			</ul>
		</div>
		<!--大厅成员-->
		<div class="vue_leftlist_people" v-if="onlineUserList">
      <p>大厅成员</p>
      <input class="vue_leftlist_search" v-model="searchKey" type="text" placeholder="搜索大厅成员"/>
      <ul class="leftlist_people_ul">
        <li v-for="(item,key,index) in searchData" @click="firendchat(key)" >
          <div class="leftlist_people_photo"> <!--头像-->
            <img :src="item.img" alt="" />
          </div>
          <span v-if="item.plat=='match'" class="leftlist_people_cuo"></span> <!--撮合公司-->
          <span v-if="item.plat=='trade'" class="leftlist_people_jiao"></span> <!--交易公司-->
          <div class="leftlist_people_name"> <!--名称-->
            <span>{{item.name}}</span>
            <p>{{item.orgName}}</p>
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
		<div class="vue_leftlist_tan" v-if="onlineUserList[infoId]" v-show="firendtan">   <!--加好友弹窗-->
      <img v-if="onlineUserList[infoId].plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
      <img v-if="onlineUserList[infoId].plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 交易公司 -->
      <div class="vue_leftlist_img"><img :src="onlineUserList[infoId].img" alt="" /></div>
      <p class="vue_leftlist_line">{{onlineUserList[infoId].name}}</p>
      <p v-if="onlineUserList[infoId].plat=='match'" class="vue_leftlist_companycuo">所属公司类型：<span>撮合公司</span></p>
      <p v-if="onlineUserList[infoId].plat=='trade'" class="vue_leftlist_companyjiao">所属公司类型：<span>交易公司</span></p>
      <p class="vue_leftlist_companyname">所属公司：{{onlineUserList[infoId].orgName}}</p>
      <p class="vue_leftlist_companyname">手机号：{{onlineUserList[infoId].phone||'无'}}</p>
      <div class="vue_leftlist_companysz">
        <span class="vue_leftlist_companysz_yi">临时会话</span>
        <span class="vue_leftlist_companysz_er">添加好友</span>
        <!--<p>聊天</p>-->
      </div>
			<div class="vue_leftlist_close" @click="leftlistclose"><span></span></div>
		</div>
	</div>
</template>

<script>
	export default {
  	components:{},
  	// props:{},
    props: ['onlineUserList'],
    data(){
  		return{
  			firendtan:false,
        searchKey:'',
        infoId:2,
			  leftList:match_hall_cms,
  		}
  	},
    computed: {
      searchData: function () {
        if (this.searchKey === '') {
          return this.onlineUserList
        } else {
          this.searchList ={};
          for (var index in this.onlineUserList){
            if(this.onlineUserList[index].name.indexOf(this.searchKey)>=0){
              this.searchList[index] = this.onlineUserList[index];
            }
          }
          return this.searchList;
        }
      }
    },
	methods:{
		firendchat:function(key){
			this.firendtan=!this.firendtan;
      this.infoId = key;
      console.log(this.onlineUserList[key]);
		},
		leftlistclose:function(){
			this.firendtan=false
		}

	},
	mounted() {
    console.log('大厅',typeof (this.onlineUserList))
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
