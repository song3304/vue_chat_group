<template>
  <div class="index-content">
    	<div id="chitchat" @click="show">
					<p class="chitchat-p"></p> <!--有新消息添加类名   chitchat-p  -->
					<span>私信<br>聊天</span>
			</div>
			<!--//好友列表-->
			<div id="friend" v-show="detailShow">	
				<div class="m-search">
					<input type="text" id="search"  placeholder="查找联系人" />
					<div></div>
					<p @click="hide"><span></span></p>
				</div>	
				<div class="account-l fl">
						<!--切换-->
						<ul class="m_lei">
							<li class="m_lei_yi" @click="qieshow =true"><img src="../../static/img/m-chat.png"/></li>
							<li class="m_lei_er" @click="qieshow =false"><img src="../../static/img/group.png"/></li>
							<div class="m-add">
								<p @click="add">+</p>
								<ul v-show="addxuan">
									<li class="fen-active" @click="addxu">创建新组</li>
									<li @click="addxu">创建群发组</li>
								</ul>
							</div>							
						</ul>
						<!--个人组-->
						<ul id="accordion" class="accordion qie_div" v-show="qieshow">
							<li v-for="first in menu">						     
						      <div class="link"><i class="fa fa-caret-right"></i><span class="first_title"> {{first.group}}</span><span class="first-num">5/6</span></div>
						      <ul class="submenu submenu_ul">
						        <li v-for="second in first.name" class="submenu-name">						        	
						        	<div class="m-touxiang touxiang">
													<img src='../../static/img/default.png' alt="" /><!--不在线，添加class=gray-->
											</div>
											<a>{{second}}</a>
											<span class="m-phone-img"></span>
											<input class="m-phone-input" type="text"  placeholder=""/>
						        </li>
						     </ul>
						 </li>						
						</ul>	
						<!--//群组-->
						<div id="qun-fen" class="accordion qie_div" v-show="!qieshow">
							<div class="qunfen_yi">
								<p>创建新组</p>
								<ul>
									<li v-for="first in qunmenu">
										<div class="link"><i class="fa fa-caret-right"></i><span class="first_title">{{first.title}}</span><span class="first-num">5/6</span></div>
										<ul class="submenu submenu_ul">
											<li v-for="second in first.name" class="submenu-name" >
												<div class="m-touxiang touxiang">
													<img src="../../static/img/default.png" alt="" /><!--class="gray"-->
													<!--//不在线，添加class=gray-->
												</div>
												<a>{{second}}</a>
												<span class="m-phone-img"></span>
												<input class="m-phone-input" type="text"  />
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<div class="qunfen_er">
								<p>创建群发组</p>
								<ul>
									<li v-for="first in qunmenu">
										<div class="link"><i class="fa fa-caret-right"></i><span class="first_title">{{first.title}}</span><span class="first-num">5/6</span></div>
										<ul class="submenu submenu_ul">
											<li v-for="second in first.name" class="submenu-name" >
												<div class="m-touxiang touxiang">
													<img src="dist/images/default.png" alt="" /><!--class="gray"-->
													<!--//不在线，添加class=gray-->
												</div>
												<a>{{second}}</a>
												<span class="m-phone-img"></span>
												<input class="m-phone-input" type="text" />
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
			</div>
			<!--//创建分组-->
			<div class="fen_zu" v-show="">
				<div class="fen_zu_title">
					<span>创建分组</span>
					<p class="fen_zu_tiyi"><span></span></p>
				</div>
				<div class="fenzu_left accordion">
					<input type="text" class="fenzu_left_input" placeholder="搜索"/>
					<ul class="fenzu_left_ul">
						<li v-for="first in qunmenu">
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
									<i class='input_style checkbox_bg'><input type="checkbox" ></i>						
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
					<button>确认</button>
					<span class="fen_zu_tiyi">取消</span>
				</div>
				<!--//设置组名称-->
				<div class="fenzu_name">
					<div class="fen_zu_title">
						<span>设置组名称</span>
						<p class="fen_zu_tier"><span></span></p>
					</div>
					<p class="fenzu_name_na">请输入组名称：</p>
					<input type="text"/>
					<div class="fenzu_name_footer">
						<button>确认</button>
						<span class="fen_zu_tier">取消</span>
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
	      detailShow: false, //分组列表先隐藏  
	      qieshow: true, //分组列表先显示
	      addxuan: false,//添加按钮
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
		    }],
		    qunmenu: [{
		      'title': '化塑汇',
		      'name': ['小张', '小刘', '小王', '小李']
		    },{
		      'title': '化商通',
		      'name': ['小号', '小赵']
		    },{
		      'title': '中化金服',
		      'name': ['管理员', '小李']
		    },{
		      'title': '测试',
		      'name': ['测试']
		    }],
	    };
	  },
	  methods: {
	    show() {
	      this.detailShow = true;         //分组列表显示方法
	    },
	    hide() {
	      this.detailShow = false;         //分组列表消失方法
	    },
	    add(){
	    	this.addxuan = !this.addxuan; //添加分组消失或隐藏          
	    },
	    addxu(){
	    	this.addxuan=false;
	    },
	    
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
		#chitchat{
				position: fixed;
				bottom:80px;
				right: 0;
				width: 40px;
				height: 78px;
				background-image: linear-gradient(0deg, 
					#279cff 0%, 
					#66d9ff 100%);
				box-shadow: 0px 0px 5px 0px 
					rgba(42, 42, 42, 0.11);
				text-align: center;
				cursor: pointer;
		}
		#chitchat p{
				width: 22px;
				height: 17px;
				background: url(../../static/img/qie_tu.png) 0 -158px;
				margin:15px 0 5px 9px;
		}
		#chitchat span{
				font-size: 12px;
				color: #ffffff;
		}
</style>
