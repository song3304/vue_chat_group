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
				<br clear="all"/>
			</ul>
		</div>
		<!--大厅成员-->
		<div class="vue_leftlist_people">
			<p>大厅成员</p>
			<input class="vue_leftlist_search" type="text" placeholder="搜索大厅成员"/>
			<ul class="leftlist_people_ul">
				<li>
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
	</div>
</template>

<script>
	export default {
  	components:{},
  	props:{},
  	data(){
  		return{ 			
  			leftList: [{
				time: "08-15",
				title:"这是周报标题"
			}, {
				time: "08-16",
				title:"这是测试数据"
			}, {
				time: "08-17",
				title:"广东乙烯制乙二醇送到报7850-7900"
			}],
  		}
  	},

 
}
</script>

<style>
</style>