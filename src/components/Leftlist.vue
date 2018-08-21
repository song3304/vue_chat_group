<template>
	<div id="leftlist">
		<!--资讯列表-->
		<div class="vue_leftlist">
			<p>资讯列表</p>
			<ul class="vue_leftlist_ul">
				<li v-for="leftitem in leftList">
					<span>{{leftitem.time}}</span>
					<p>{{leftitem.title}}</p>
				</li>
			</ul>
		</div>
		<!--大厅成员-->
		<div class="vue_leftlist_people">
			<p>大厅成员</p>
			<input class="vue_leftlist_search" type="text" placeholder="搜索大厅成员"/>
			<ul class="leftlist_people_ul">
				<li @click="firendchat">
					<div class="leftlist_people_photo"> <!--头像-->
						<img src="../images/15.png" alt="" />
					</div>
					<span class="leftlist_people_cuo"></span> <!--撮合公司-->
					<div class="leftlist_people_name"> <!--名称-->
						<span>小张</span>
						<p>化塑汇</p>
					</div>
				</li>
				<li>
					<div class="leftlist_people_photo"> <!--头像-->
						<img src="../images/15.png" alt="" />
					</div>
					<span class="leftlist_people_jiao"></span> <!--交易公司-->
					<div class="leftlist_people_name"> <!--名称-->
						<span>小张</span>
						<p>化塑汇</p>
					</div>
				</li>					
			</ul>
		</div>
		<div class="vue_leftlist_tan" v-show="firendtan">   <!--加好友弹窗-->
			<img src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
			<!--<img src="../images/jiao_bg.png" alt="" />-->    <!--交易公司-->
			<div class="vue_leftlist_img"><img src="../images/15.png" alt="" ></img></div>
			<p class="vue_leftlist_line">小张</p>
			<p class="vue_leftlist_companycuo">所属公司类型：<span>撮合公司</span></p>
			<!--<p class="vue_leftlist_companyjiao">所属公司类型：<span>交易公司</span></p>-->
			<p class="vue_leftlist_companyname">所属公司：上海华塑汇</p>
			<p class="vue_leftlist_companyname">手机号：14569872354</p>
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
  	props:{},
  	data(){
  		return{ 
  			firendtan:false,
			leftList:match_hall_cms,
  		}
  	},
	methods:{
		firendchat:function(){
			this.firendtan=!this.firendtan
		},
		leftlistclose:function(){
			this.firendtan=false
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
	},
 
}
</script>

<style>
</style>