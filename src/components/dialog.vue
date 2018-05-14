<template>
	<div class="cs">
		<!--//创建分组-->
		<div class="fen_zu" v-show="qunfen">
			<div class="fen_zu_title">
				<span>创建分组</span>
				<p class="fen_zu_tiyi" @click="qunhide"><span></span></p>
			</div>
			<div class="fenzu_left accordion">
				<input type="text" class="fenzu_left_input" placeholder="搜索"/>
				<ul class="fenzu_left_ul">
					<li v-for="first in menu">
						<div class="link"><i class="fa fa-caret-right"></i><span class="first_title">{{first.group}}</span><span class="first-num">5/6</span></div>				
						<ul class="submenu">
							<li v-for="second in first.name" class="submenu-name" >
								<div class="submenu-name-div">
									<div class="m-touxiang">
										<img src="../../static/img/default.png" alt="" /><!--class="gray"-->
										<!--//不在线，添加class=gray-->
									</div>
									<a>{{second}}</a>
								</div>						
								<i class='input_style checkbox_bg'><input type="checkbox" name="" id=""   ></i>						
							</li>
						</ul>
						<p class="check-all">+</p>
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
				<button @click="queshow">确认</button>
				<span class="fen_zu_tiyi" @click="qunhide">取消</span>
			</div>
			<!--//设置组名称-->
			<div class="fenzu_name" v-show="quedialog">
				<div class="fen_zu_title">
					<span>设置组名称</span>
					<p class="fen_zu_tier" @click="dialogshow"><span></span></p>
				</div>
				<p class="fenzu_name_na">请输入组名称：</p>
				<input type="text"/>
				<div class="fenzu_name_footer">
					<button @click="dialogshow">确认</button>
					<span class="fen_zu_tier" @click="dialogshow">取消</span>
				</div>
			</div>
		</div>
	</div>
    
</template>

<script>
	export default {
//	  name: 'HelloWorld',
		data() {              
	    return {
	      qunfen:false, 
	      quedialog:false,//设置群名称先隐藏
	      menu: [{
		      'group': '化塑汇',
		      'name': ['小张', '小刘', '小王', '小李']
		    },{
		      'group': '化商通',
		      'name': ['小号', '小赵']
		    },{
		      'group': '中化金服',
		      'name': ['管理员', '小李']
		    },{
		      'group': '测试',
		      'name': ['测试']
		    }]
	    };
	  },
	  methods: {
	    dialogshow() {
	      this.quedialog = false;         //分组列表显示方法
	    },
	    queshow() {
	      this.quedialog = true;         
	    },
	    qunhide(){
	    	this.qunfen = false; //分组列表隐藏方法
	    },
	    qunhideshow(){
	    	this.qunfen = false; //分组列表隐藏方法
	    }
	  }
	}
</script>

<style>
    
</style>