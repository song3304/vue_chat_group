<template>
  <div id="vue_echart">
    <div class="vue_echart">
      <!--切换选项-->
      <div class="vue_chart_yi">
      	<div class="vue_chart_usgai"></div>
      	<div class="vue_chart_us" v-if="user.plat=='match'">
      		<p v-show="chartusyi" class="chart_usyi" @click="chartus_yi"></p>
      		<p v-show="chartuser" class="chart_user" @click="chartus_er">√</p>
      		<span @click="chartus_yier">我的大盘</span>
      	</div>

        <div class="vue-chart-head">
          <div class="vue_chat_company">
            <div class="vue_chat_div" @mouseenter="companyclick" @mouseleave="companyleav">
              <span :class="{vue_company_tubiao:true,chooseIco:chooseTag==2}"></span>
              <span :class="{vue_chatkind_name:true,choose:chooseTag==2}">公司</span>
              <span class="vue_chat_jiantou"></span>
              <!--下拉表-->
	            <ul class="vue_company_ul" v-show="companyshow">
	            	<li class="vue_company_ul_test">最多显示五个公司</li>
	              <li v-for="(companyitem,index) in match_hall_companies" @click="addcom(companyitem,index)"><span></span>{{companyitem.name}}</li>
	            </ul>
	            <br clear="all"/>
            </div>

            <!--右边切换选项-->
            <ul class="vue_company_species">
              <li v-for="(comspitem,comindex) in comsplist" :class="{'comactive': comspitem.isActive}" v-bind:cid="comspitem.id">
                <span @click="changecom(comspitem,comindex)">{{comspitem.name}}</span>
                <p @click="delcom(comspitem,comindex)"><span></span></p>
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
                <p @click="delpeo(peospitem,peoindex)"><span></span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <!----曲线图表 start-->

      <div class="vue_chat_kind">  <!--品种分类·-->
          <!--下拉表-->
          <ul class="vue_kind_ul">  <!--v-show="kindshow"-->
              <li v-for="(catalogItem,index) in match_hall_catalogs" @click="addcatalog(catalogItem,index)" :class="{'vue_kind-active':index == activeIndex}">{{catalogItem.name}}</li>
              <div class="qujia_state">
                   <p></p>
                   <span>取价说明</span>
                   <div class="qujia_state_main">
                       <span>该数据为您显示：<br>
                                通过撮合报价行为，实时统计当前时刻的买卖平均数<br>
                                价格中线（白线）：上个工作日最后时刻的（买+卖）/ 2<br>
                                百分数：相对于价格中线的涨跌幅<br>
                              	 报价数：当前时刻当前报价的数量
                       </span>
                   </div>
        	  </div>
          </ul>
      </div>

      <!--首页大盘 start-->
      <div id="myTabContent" class="tab-content tab_mm" style="margin-top: 10px;">
          <div v-for='(catalog,index) in match_hall_catalogs'  v-show="catalog.show==1?true:false" v-bind:id="'pan_'+catalog.id" >
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
                          <ul class="bird_sell brid_ul"></ul>
                          <div class="current_price"></div>
                          <ul class="bird_buy brid_ul"></ul>
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
      <!--首页大盘 end-->


      <!--我的大盘 start-->
      <div id="mypancontent">
          <!--下拉表-->
          <div class="my_vue_chat_kind ">
              <ul class="vue_kind_ul">
                  <li v-for="(catalogItem,index) in my_match_hall_catalogs" @click="my_addcatalog(catalogItem,index)" :class="{'vue_kind-active':index == myActiveIndex}">{{catalogItem.name}}</li>
                  <div class="qujia_state">
                      <p></p>
                      <span>取价说明</span>
                      <div class="qujia_state_main">
                          <span>该数据为您显示：<br>
                                通过撮合报价行为，实时统计当前时刻的买卖平均数<br>
                                价格中线（白线）：上个工作日最后时刻的（买+卖）/ 2<br>
                                百分数：相对于价格中线的涨跌幅<br>
                                报价数：当前时刻当前报价的数量<br>
                          </span>
                      </div>
                  </div>
              </ul>
          </div>

          <!--曲线及右侧切换-->
          <div v-for='(catalog,index) in my_match_hall_catalogs'  v-show="catalog.show==1?true:false" v-bind:id="'my_pan_'+catalog.id">
              <div class="col-xs-8 chart-pane"  v-bind:id="'my_pan_data_'+catalog.id" ></div>
              <div class="col-xs-3 col-md-3 col-sm-12 my-price-list">
                  <div class="">
                      <div class="row trend-syn-table-title">
                          <div class="col-md-4 col-xs-4 ">买/卖</div>
                          <div class="col-md-4 col-xs-4 base_font1">价格</div>
                          <div class="col-md-4 col-xs-4 base_font1">报价数</div>
                      </div>
                      <div v-bind:id="'my_bird_price_banner_'+catalog.id" class="vue_bird_price">
                          <div class="vue_chart_hight vue_chart_price">
                              <span>最高</span>
                              <span>7800</span>
                              <span>1</span>
                          </div>
                          <ul class="bird_sell brid_ul"></ul>
                          <div class="current_price"></div>
                          <ul class="bird_buy brid_ul"></ul>
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
	  <!--我的大盘 end-->

      <!----曲线图表 end--->


      <!--实时报价信息 start-->
      <div class="vue-chart-foot">
        <div class="vue-realtime">
          <div class="vue-realtime-time">
            <div class="vue-real-img">
              <!--<p class="vue-real-img-img"></p>-->
              <span @click="vue_real_imgyi" class="vue-real-img_active">实时报价</span>
              <p v-if="user.plat=='match'" style="display: inline-block;"><span @click="vue_real_imger">贸易商询价</span></p>
              <span class="vue_real_zhan" style="display: none;"></span>
             	<span v-if="user.plat=='trade'" @click="vue_real_imgsan">撮合报价</span>
            </div>
            <div class="vue-tealtime-time" v-show="tealtime_time">  <!--实时报价数据-->
            	<div class="vue-tealtime-timetitle">
            		<span class="vue-realtime-auto-timeti">时间</span>
            		<span class="vue-realtime-auto-companyti">撮合人员</span>
            		<span class="vue-realtime-buyti">买/卖</span>
            		<span class="vue-realtime-buy_priceti">价格</span>
            		<span class="vue-realtime-auto-datati">交割期</span>
            		<span class="vue-realtime-auto-numti">吨数</span>
            	</div>
              <ul class="vue-realtime-auto"  v-for='(catalog,index) in match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'realtime_'+catalog.id"></ul>
            </div>

            <div class="vue-tealtime-timecuo" v-show="tealtime_timecuo"> <!--贸易商询价数据-->
            	<div class="vue-tealtime-timecuotitle">
            			<span class="tealtime-timecuotitleyi">时间</span>
            			<span class="tealtime-timecuotitleer">公司</span>
            			<span class="tealtime-timecuotitlesan">贸易人员</span>
            			<span class="tealtime-timecuotitlesi">询价信息</span>
            	</div>
            	<ul>
            		<li v-for='(bitem,bintex) in bidList' v-if="bitem.last_time>getTodayDate()">
            			<span class="tealtime-timecuotitleyi">{{bitem.last_time.substr(11,5)}}</span>
            			<span class="tealtime-timecuotitleer">{{bitem.company}}</span>
            			<span class="tealtime-timecuotitlesan tealtime-timecuotitlename">{{bitem.nickname}}</span>
            			<pre class="tealtime-timecuotitlesi">{{bitem.messages[0].text}}</pre>
            			<span class="chitchat_photo" @click="openEchart(bitem.id)"></span>
            			<br clear="all"/>
            		</li>
            	</ul>
            </div>
            <div class="vue-tealtime-timetrade" v-show="tealtime_timetrade"> <!--撮合报价数据-->
            		<div class="vue-tealtime-timecuotitle">
	            			<span class="tealtime-timecuotitleyi">时间</span>
	            			<span class="tealtime-timecuotitleer">公司</span>
	            			<span class="tealtime-timecuotitlesan">撮合员</span>
	            			<span class="tealtime-timecuotitlesi">报价信息</span>
	            	</div>
	            	<ul>
	            		<li v-for='(bitem,bintex) in bidList' v-if="bitem.last_time>getTodayDate()">
	            			<span class="tealtime-timecuotitleyi">{{bitem.last_time.substr(11,5)}}</span>
	            			<span class="tealtime-timecuotitleer">{{bitem.company}}</span>
	            			<span class="tealtime-timecuotitlesan tealtime-timecuotitlename">{{bitem.nickname}}</span>
	            			<pre class="tealtime-timecuotitlesi">{{bitem.messages[0].text}}</pre>
	            			<span class="chitchat_photo" @click="openEchart(bitem.id)"></span>
	            			<br clear="all"/>
	            		</li>
	            	</ul>
            </div>
            <div class="vue-tealtime-right" v-for='(catalog,index) in match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'static_data_'+catalog.id">
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

      <!--我的大盘实时报价信息 start-->
      <div class="vue-chart-newfoot" style="display:none">
        <div class="vue-realtime">
          <div class="vue-realtime-time">
            <div class="vue-real-img">
              <!--<p class="vue-real-img-img"></p>-->
              <span @click="vue_myreal_imgyi" class="vue-real-img_active">实时报价</span>
              <p style="display: inline-block;"><span @click="vue_myreal_imger">贸易商询价</span></p>
            </div>
            <div class="vue-tealtime-time" v-show="mytealtime_time">  <!--实时报价数据-->
            	<div class="vue-tealtime-timetitle">
            		<span class="vue-realtime-auto-timeti">时间</span>
            		<span class="vue-realtime-auto-companyti">撮合人员</span>
            		<span class="vue-realtime-buyti">买/卖</span>
            		<span class="vue-realtime-buy_priceti">价格</span>
            		<span class="vue-realtime-auto-datati">交割期</span>
            		<span class="vue-realtime-auto-numti">吨数</span>
            	</div>
              <ul class="vue-realtime-auto"  v-for='(catalog,index) in my_match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'my_realtime_'+catalog.id"></ul>
            </div>
            <div class="vue-tealtime-timecuo" v-show="mytealtime_timecuo"> <!--贸易商询价数据-->
            	<div class="vue-tealtime-timecuotitle">
            			<span class="tealtime-timecuotitleyi">时间</span>
            			<span class="tealtime-timecuotitleer">公司</span>
            			<span class="tealtime-timecuotitlesan">贸易人员</span>
            			<span class="tealtime-timecuotitlesi">询价信息</span>
            	</div>
            	<ul>
            		<li v-for='(bitem,bindex) in bidList' v-if="bitem.last_time>getTodayDate()">
            			<span class="tealtime-timecuotitleyi">{{bitem.last_time.substr(11,5)}}</span>
            			<span class="tealtime-timecuotitleer">{{bitem.company}}</span>
            			<span class="tealtime-timecuotitlesan tealtime-timecuotitlename">{{bitem.nickname}}</span>
            			<span class="tealtime-timecuotitlesi">
            				{{bitem.messages[0].text}}
            			</span>
            			<br clear="all"/>
            		</li>
            	</ul>
            </div>


            <div class="vue-tealtime-right" v-for='(catalog,index) in my_match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'my_static_data_'+catalog.id">
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
      <!--我的大盘实时报价信息 end-->
    </div>

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
            <div v-if="user.plat=='trade'" class="c_shiBieButton" data-cnt="0" ref="btn" @click="sendGroupM()" id='quick_parse_creat'><span class="c_shiBieButton_yi"  v-show="formData.userIds.length!=0">群发</span><span class="c_shiBieButton_er"  v-show="formData.userIds.length==0">报价</span></div>
            <div class="c_openShibie" v-if="user.plat=='match' && cnewguan!=true"><span :class={gou:chooseG} @click="chooseGou"></span>开启报价识别</div>
          </div>
        </div>
      </div>
      <!--<img src="../images/tips.png" alt="" class="c_qunTips" v-show="formData.userIds.length==0">-->
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

    <!--设置组名称-->
    <!--<div class="vu_fenzu_name" style="z-index:1009;background: #fff;left: 47%;top:35%;box-shadow: 5px 18px 5px #ccc;" v-show="newZuTag">
      <div class="vu_fen_zu_title">
        <span>设置组名称</span>
        <p class="vu_fen_zu_tier" @click="closeSetName"><span></span></p>
      </div>
      <p class="vu_fenzu_name_na">请输入组名称(最多六个字)：</p>
      <input type="text" class="vu_fenzu_name_input" name="groupName" v-model="createGroupName" :placeholder="placeholder" maxlength="6" />
      <div class="vu_fenzu_name_footer">
        <button @click="submitGroup">确认</button>
        <span class="vu_fen_zu_tier" @click="closeSetName">取消</span>
      </div>
    </div>-->
    <!--删除确认弹窗-->
    <div class="vu_del-popup" v-show="Qunpopup" style="left: 45%;">
      <div class="vu_fen_zu_title">
        <span>删除</span>
        <p class="vu_fen_zu_tier"  @click="popcancel"><span></span></p>
      </div>
      <p>是否确认删除？</p>
      <div class="vu_fenzu_name_footer"><button @click="delConfirm">确认</button> <span class="vu_fen_zu_tier" @click="popcancel">取消</span></div>
    </div>

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
	import echartQun from './echarts/qunfa'
  //let echarts = require('echarts/lib/echarts')
  // 引入折线图组件
  //require('echarts/lib/chart/line')
  // 引入提示框和title组件
  //require('echarts/lib/component/tooltip')
  //require('echarts/lib/component/title')
  export default {
    name: 'hello',
    props: ['user', 'userList', 'bidList', 'groupList', 'companyLists','match_hall_catalogs','my_match_hall_catalogs','match_hall_companies'],
    data() {
      return {
      	groupId:0,
      	activeIndex:0,
      	myActiveIndex:0,
        kindshow:false,
        companyshow:false,
        peopleshow:false,
        peopleList:[{nickname:'请先选择公司'}],
        comsplist:[],
        peosplist:[],
        selectCatalogName:this.match_hall_catalogs[0].name,
        selectPid:this.match_hall_catalogs[0].id,
        selectPidMy:this.my_match_hall_catalogs[0].id,//我的大盘选中pid
        selectUid:0,
        selectCid:'',
        isActive:false,
        chooseTag:1,//选择标识
        chooseCatalog:this.match_hall_catalogs[0].catalog_id,//选中种类
        showQunFa:false,//显示群发
        //qunNew部分内容
        formData: {
//      	groupId:0,
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
        chartusyi:true,
        chartuser:false,
        tealtime_time:true,
        tealtime_timecuo:false,
        tealtime_timetrade:false,
        mytealtime_time:true,
        mytealtime_timecuo:false,
        mytealtime_timetrade:false,
        vue_bianji:false,
        vue_linshi:false,
//      bianji_linshi:false,
        Qunfen:false,
        groupPlaceHolder: '请输入新分组名称',
        tan_bianji:false,
	      cnewkai:true,
	      cnewguan:false,
	      everyone:false, //默认不全选
	      linshi_guan:0,
//	      opensetzhu:true,
				qunfazhu:true, //群发组默认显示
				qunbuzhu:false,  //全部人员组
				qunfa_kuang:1000
      }
    },
    components: {searchDialog,echartQun},
    mounted() {
      if(this.groupList.groupHair.length!=0){
        this.activeTag = this.groupList.groupHair[0].groupName
        this.groupId = this.groupList.groupHair[0].groupId
//      this.formData.groupName = this.groupList.groupHair[0].groupName
//      this.formData.userIds = this.groupList.groupHair[0].userIds
//      this.formData.userIds = []
      }
      	var oDiv = document.getElementById('vu_div-qun')
        localStorage.qunfak++
        oDiv.style.zIndex=localStorage.qunfak
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
      $( "#vu_div-qun" ).resizable({
      		handles:'all',
		      maxHeight: 541,
		      maxWidth: 690,
		      minHeight: 464,
		      minWidth: 562
	    });
//	    $('.vue-chart-foot .vue-real-img span').removeClass('vue-real-img_active')
//	    if(localStorage.realmain==undefined){
//	    	$('.vue-chart-foot .vue-real-img span').eq(0).addClass('vue-real-img_active')
//	    }else{
//	    	$('.vue-chart-foot .vue-real-img span').eq(localStorage.realmain).addClass('vue-real-img_active')
//	    	if(localStorage.realmain==1){
//		    	this.tealtime_time=false
//					this.tealtime_timecuo=true
//					this.tealtime_timetrade=false
//					this.matchtiao();
//		    }else if(localStorage.realmain==2){
//		    	this.tealtime_time=false
//					this.tealtime_timecuo=false
//					this.tealtime_timetrade=true
//					this.tradetiao();
//		    }else{
//		    	this.tealtime_time=true
//					this.tealtime_timecuo=false
//					this.tealtime_timetrade=false
//		    }
//	    }
    },
    methods: {
    	saveGroup:function(groupId,groupType,uids){
    		this.$emit('saveGroupEvent', groupId, 'groupHair',uids)
    	},
    	createGroup:function(formData){
    		 this.$emit('createGroupEvent', formData)
    	},
	    //今天日期，用于询价、报价
	    getTodayDate () {
            var date=new Date();
            var sep='-';
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            if(month>=1 && month<=9){
                month+='0'+month;
            }
            var day=date.getDate();
            return year+sep+month+sep+day+' '+'00:00:00';
       },
       //我的大盘-直播间勾选切换时显示对应dom
       showDom(){
        this.match_hall_catalogs.map((v,i)=>{
                    if(this.activeIndex!=i){
                        v.show=0
                    }else{
                        v.show=1;
                    }
                });
        },
       showDomMy(){
        this.my_match_hall_catalogs.map((v,i)=>{
                        if(this.myActiveIndex!=i){
                            v.show=0
                        }else{
                            v.show=1;
                        }
                    });
        },
      //qunNew部分内容
      changePh:function(){
        this.placeholderMsg = '请您粘贴信息'
      },
      changeQunName: function (event,groupId) { // 点击修改群分组名称
	      event.stopPropagation()
	      this.groupId = groupId
//	      this.Qunfen = true
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
//        this.showQunFa = false
      },
      kongcancel: function () {//关闭清空提示框
        this.kongTag = false
      },
      kongOK: function(){ //确认清空
        this.kongTag = false
//      this.delConfirm()
      },
      tipscancel: function () {//关闭提示框
        this.tipsTag = false
      },
      chooseGou: function () {//是否勾选报价识别
        this.chooseG = !this.chooseG
      },
      sendGroupMsg: function () {
        var userIds = []
//      if(this.cnewkai) {
          if (this.formData.userIds.length < 1 && !this.chooseG) {
            this.tipsTag = true
            this.tipsMsg = '请先选择群发人员'
            return
          }else if (this.groupMsg === '') {
//          this.tipsTag = true
//          this.tipsMsg = '群发消息不能为空.'
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
      dange_xuan:function(event){
//    	var el = event.currentTarget
//    	if($(el).hasClass('vu_checkbox_bg_check')){
//    		this.everyone=false
//    	}
      },
      dange_xua:function(event,index){

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
      delUser: function (uid) {
        this.formData.userIds = this.formData.userIds.filter(t => t !== uid)
        this.everyone=false
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
      // 折叠
      accordion: function (event) {
        var _this = $(event.currentTarget)
        _this.next('ul').slideToggle()
        _this.parent('li').toggleClass('vu_open')
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
        this.match_hall_catalogs.map((v,i)=>{
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
      my_addcatalog(catalogItem,index){
        this.myActiveIndex = index
        this.my_match_hall_catalogs.map((v,i)=>{
            if(index!=i){
                v.show=0
            }else{
                v.show=1;
            }
        });
        this.selectPidMy=catalogItem.id;
        myownpan(this.user.id,this.selectPidMy);
      },
      addcom(companyitem,index){//公司添加到右侧
          if(this.comsplist.length>4){
                return;//最多选择五家公司
          }else{
                this.peopleList=companyitem.members;//联动人员下拉框
                this.selectCid=companyitem.id;
                this.selectUid=0;
                this.peosplist=[];
                this.companyshow=false
                let selectedItem = this.comsplist.filter(v => v.name === companyitem.name)[0];
                if (selectedItem) {
                      $('.vue_company_species>li').attr('class','');
                      $(this.comsplist).each(function(index,item){
                          if(item.id==companyitem.id){
                              $('.vue_company_species>li').eq(index).attr('class','comactive');
                          }
                      });
                } else {
                      $('.vue_company_species>li').attr('class','');
                      this.comsplist.push({
                        ...companyitem ,isActive:true
                      })
                };
          }
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
      delcom(comspitem,comindex){//公司删除
          var select_cid=this.selectCid;
          var select_uid=this.selectUid;
          if(comspitem.id==this.selectCid){
                //删除列表中选中的公司
                this.peopleList=[{nickname:'请先选择公司'}];//清空人员下拉框
                this.peosplist=[];
                this.selectCid='';
                this.selectUid=0;
                this.comsplist.splice(comindex,1);
                $('.vue_company_species>li').attr('class','');
          }else{
                //删除列表中其他的公司
                this.comsplist.splice(comindex,1);
                $('.vue_company_species>li').attr('class','');
                $(this.comsplist).each(function(index,element){
                    if(element.id==select_cid){
                        $('.vue_company_species>li').eq(index).attr('class','comactive');
                    }
                });
                $(this.peosplist).each(function(index,element){
                    if(element.id==select_uid){
                        $('.vue_people_species>li').eq(index).attr('class','peoactive')
                    }
                });
          }
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      addpeo(peopleitem,index){//人员追加到右侧
            if(this.peosplist.length>4){
                 return;//最多选择五个人员
            }else{
                this.peopleshow=false;
                this.selectUid=peopleitem.id;
                let peoedItem = this.peosplist.filter(v => v.nickname === peopleitem.nickname)[0];
                if (peoedItem) {
                      $('.vue_people_species>li').attr('class','');
                      $(this.peosplist).each(function(index,item){
                          if(item.id==peopleitem.id){
                              $('.vue_people_species>li').eq(index).attr('class','peoactive');
                          }
                      });
                }else if(this.selectUid==undefined){
                      return false;
                }else {
                      $('.vue_people_species>li').attr('class','');
                      this.peosplist.push({
                        ...peopleitem,isActive:true
                      })
                };
            }
            refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      changepeo(peospitem,peoindex){//人员切换
          this.selectUid=peospitem.id;
          $('.vue_people_species>li').attr('class','');
          $('.vue_people_species>li').eq(peoindex).attr('class','peoactive');
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      delpeo(peospitem,peoindex){//人员删除
        var select_uid=this.selectUid;
        if(peospitem.id==this.selectUid){
            //删除列表中选中的人员
            this.selectUid=0;
            this.peosplist.splice(peoindex,1);
            $('.vue_people_species>li').attr('class','')
        }else{
            //删除列表中其他的人员
            this.peosplist.splice(peoindex,1);
            $('.vue_people_species>li').attr('class','');
            $(this.peosplist).each(function(index,element){
                if(element.id==select_uid){
                    $('.vue_people_species>li').eq(index).attr('class','peoactive');
                }
            });
        }
        refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      chartus_yi:function(){
      	this.chartusyi=false
      	this.chartuser=true
      	$('.vue_chart_usgai').show()
      	$('#mypancontent,.vue-chart-newfoot').show()
      	$('.vue-chart-foot').hide()
      	this.showDomMy();
      	myownpan(this.user.id,this.selectPidMy);
      },
      chartus_er:function(){
      	this.chartusyi=true
      	this.chartuser=false
      	$('.vue_chart_usgai').hide()
      	$('#mypancontent,.vue-chart-newfoot').hide()
      	$('.vue-chart-foot').show()
      	this.showDom();
      	refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      },
      chartus_yier:function(){
      	this.chartusyi=!this.chartusyi
      	this.chartuser=!this.chartuser
      	if(this.chartusyi==false){
      		$('.vue_chart_usgai').show()
      		$('#mypancontent,.vue-chart-newfoot').show()
      		$('.vue-chart-foot').hide()
      		this.showDomMy();
      		myownpan(this.user.id,this.selectPidMy);
      	}else{
      		$('.vue_chart_usgai').hide()
      		$('#mypancontent,.vue-chart-newfoot').hide()
      		$('.vue-chart-foot').show()
      		this.showDom();
      		refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线图
      	}
//    	this.cfuxiao();
      },
// 正常大盘
      vue_real_imgyi:function(){
      	localStorage.realmain=0
      	$('.vue-chart-foot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-foot .vue-real-img span').eq(0).addClass('vue-real-img_active')
				this.tealtime_time=true
				this.tealtime_timecuo=false
				this.tealtime_timetrade=false
      },
      vue_real_imger:function(){
      	localStorage.realmain=1
      	$('.vue-chart-foot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-foot .vue-real-img span').eq(1).addClass('vue-real-img_active')
				this.tealtime_time=false
				this.tealtime_timecuo=true
				this.tealtime_timetrade=false
				this.matchtiao();
      },
      vue_real_imgsan:function(){
      	localStorage.realmain=2
      	$('.vue-chart-foot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-foot .vue-real-img span').eq(2).addClass('vue-real-img_active')
				this.tealtime_time=false
				this.tealtime_timecuo=false
				this.tealtime_timetrade=true
				this.tradetiao();
      },
//    我的大盘
      vue_myreal_imgyi:function(){
      	$('.vue-chart-newfoot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-newfoot .vue-real-img span').eq(0).addClass('vue-real-img_active')
				this.mytealtime_time=true
				this.mytealtime_timecuo=false
				this.mytealtime_timetrade=false
				$('.vue-chart-newfoot .vue-real-img i').hide();
      },
      vue_myreal_imger:function(){
      	$('.vue-chart-newfoot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-newfoot .vue-real-img span').eq(1).addClass('vue-real-img_active')
				this.mytealtime_time=false
				this.mytealtime_timecuo=true
				this.mytealtime_timetrade=false
				$('.vue-chart-newfoot .vue-real-img i').css('display','inline-block');
				this.matchtiao();
      },
      vue_myreal_imgsan:function(){
      	$('.vue-chart-newfoot .vue-real-img span').removeClass('vue-real-img_active')
				$('.vue-chart-newfoot .vue-real-img span').eq(1).addClass('vue-real-img_active')
				this.mytealtime_time=false
				this.mytealtime_timecuo=false
				this.mytealtime_timetrade=true
				$('.vue-chart-newfoot .vue-real-img i').hide();
				this.tradetiao();
      },
      matchtiao:function(){
      	$(".vue-tealtime-timecuo>ul").niceScroll({
	        cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	        disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
	      });
      },
      tradetiao:function(){
      	$(".vue-tealtime-timetrade>ul").niceScroll({
	        cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
	        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
	        cursorwidth: "5px", // 滚动条的宽度，单位：便素
	        background: "", // 轨道的背景颜色
	        cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
	        autohidemode: false, // 隐藏滚动条的方式, 可用的值:
	        disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
	      });
      },
      guan_bianji:function(){ //关闭编辑/临时加入框
      	$('.vue_baojia1').hide()
      	this.Qunfen=false
      	this.formData.userIds = []
      	this.panelShow.searchShow=false
      	this.kongTag=false
      	this.tipsTag = false
      	this.everyone=false
      },
      c_newkai:function(){ //群发报价开
      	this.cnewkai=false
      	this.cnewguan=true
      	$('.c_qunDiv').css('height','40px')
      	$('#groupHairMsg').css('height','394px')
//    	this.bianji_linshi=false
//    	this.opensetzhu=true
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
//        this.formData.userIds = this.groupList.groupHair[this.groupTag].userIds
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
