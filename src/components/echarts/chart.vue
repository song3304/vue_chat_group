<template>
<!--echart模块--start-->
    <div class="vue_echart">
      <!--头部--公司-人员-我的大盘--start-->
      <div class="vue_chart_yi">
      	<div class="vue_chart_usgai"></div>
      	<div class="vue_chart_us" v-if="user.plat=='match'">
      		<p v-show="chartusyi" class="chart_usyi" @click="chartus_yi"></p>
      		<p v-show="chartuser" class="chart_user" @click="chartus_er">√</p>
      		<span @click="chartus_yier" data-click-log="600010">我的大盘</span>
      	</div>

        <div class="vue-chart-head">
          <!--公司选择s-->
          <div class="vue_chat_company">
            <div class="vue_chat_div" @mouseenter="companyclick" @mouseleave="companyleav">
              <span :class="{vue_company_tubiao:true,chooseIco:chooseTag==2}"></span>
              <span :class="{vue_chatkind_name:true,choose:chooseTag==2}">公司</span>
              <span class="vue_chat_jiantou"></span>
              <!--下拉表-->
	          <ul class="vue_company_ul" v-show="companyshow">
	              <li class="vue_company_ul_test">最多显示五个公司</li>
	              <li v-if="user.plat=='trade'" v-for="(companyitem,index) in match_hall_companies" @click="addcom(companyitem,index)" data-click-log="700008"><span></span>{{companyitem.name}}</li>
                <li v-if="user.plat=='match'" v-for="(companyitem,index) in match_hall_companies" @click="addcom(companyitem,index)" data-click-log="600009"><span></span>{{companyitem.name}}</li>
	          </ul>
	          <br clear="all"/>
            </div>
            <!--右边切换选项-->
            <ul class="vue_company_species">
                <li v-for="(comspitem,comindex) in comsplist" :class="{'comactive': comspitem.isActive}" v-bind:cid="comspitem.id">
                    <span v-if="user.plat=='trade'" @click="changecom(comspitem,comindex)" data-click-log="700008">{{comspitem.name}}</span>
                    <span v-if="user.plat=='match'" @click="changecom(comspitem,comindex)" data-click-log="600009">{{comspitem.name}}</span>
                    <p @click="delcom(comspitem,comindex)"><span></span></p>
                </li>
            </ul>
          </div>
          <!--公司选择e-->

          <!--人员选择s-->
          <div class="vue_chat_people">
            <div class="vue_chat_div"  @mouseenter="peopleclick" @mouseleave="peopleleave">
              <span :class="{vue_people_tubiao:true,chooseIco:chooseTag==3}"></span>
              <span :class="{vue_chatkind_name:true,choose:chooseTag==3}">人员</span>
              <span class="vue_chat_jiantou"></span>
              <!--下拉表-->
	          <ul class="vue_people_ul" v-show="peopleshow">
	              <li v-if="user.plat=='trade'" v-for="(peopleitem,index) in peopleList" @click="addpeo(peopleitem,index)" data-click-log="700008">
	                <span><img v-bind:src="peopleitem.pic_url" alt="" v-if="peopleitem.hasOwnProperty('pic_url')"/></span>
	                <p>{{peopleitem.nickname}}</p>
	              </li>
                <li v-if="user.plat=='match'" v-for="(peopleitem,index) in peopleList" @click="addpeo(peopleitem,index)" data-click-log="600009">
                  <span><img v-bind:src="peopleitem.pic_url" alt="" v-if="peopleitem.hasOwnProperty('pic_url')"/></span>
                  <p>{{peopleitem.nickname}}</p>
                </li>
	          </ul>
            </div>
            <!--右边切换选项-->
            <ul class="vue_company_species vue_people_species">
              <li v-for="(peospitem,peoindex) in peosplist" :class="{'peoactive': peospitem.isActive}">
                  <span v-if="user.plat=='trade'" @click="changepeo(peospitem,peoindex)" data-click-log="700008">{{peospitem.nickname}}</span>
                  <span v-if="user.plat=='match'" @click="changepeo(peospitem,peoindex)" data-click-log="600009">{{peospitem.nickname}}</span>
                  <p @click="delpeo(peospitem,peoindex)"><span></span></p>
              </li>
            </ul>
          </div>
          <!--人员选择e-->
        </div>
      </div>
      <!--头部--公司-人员-我的大盘--end-->

      <!--乙二醇选择--取价说明--start-->
      <div class="vue_chat_kind">
          <!--下拉表-->
          <ul class="vue_kind_ul">
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
      <!--乙二醇选择--取价说明--end-->


      <!--曲线图--报价数--start-->
      <!--普通大盘s-->
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
                              <span>--</span>
                              <span>--</span>
                          </div>
                          <ul class="bird_sell brid_ul"></ul>
                          <div class="current_price"></div>
                          <ul class="bird_buy brid_ul"></ul>
                          <div class="vue_chart_low vue_chart_price">
                              <span>最低</span>
                              <span>--</span>
                              <span>--</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="clear"></div>
              <div class="ckdp_icon"><a href="javascript:;"></a></div>
          </div>
      </div>
      <!--普通大盘e-->

      <!--我的大盘s-->
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
                              <span>--</span>
                              <span>--</span>
                          </div>
                          <ul class="bird_sell brid_ul"></ul>
                          <div class="current_price"></div>
                          <ul class="bird_buy brid_ul"></ul>
                          <div class="vue_chart_low vue_chart_price">
                              <span>最低</span>
                              <span>--</span>
                              <span>--</span>
                          </div>
                      </div>
                  </div>
              </div>
	          <div class="clear"></div>
	          <div class="ckdp_icon"><a href="javascript:;"></a></div>
	      </div>
	  </div>
	  <!--我的大盘e-->
      <!--曲线图--报价数--end-->


      <!--普通大盘--实时报价-询价报价-最多报价--start-->
      <div class="vue-chart-foot">
        <div class="vue-realtime">
          <div class="vue-realtime-time">
            <div class="vue-real-img">
              <span v-if="user.plat=='trade'" @click="vue_real_imgyi" class="vue-real-img_active" data-click-log="700002">实时报价</span>
              <span v-if="user.plat=='match'" @click="vue_real_imgyi" class="vue-real-img_active" data-click-log="600002">实时报价</span>
              <p v-if="user.plat=='match'" style="display: inline-block;"><span @click="vue_real_imger" data-click-log="600003">贸易商询价</span></p>
              <span class="vue_real_zhan" style="display: none;"></span>
              <span v-if="user.plat=='trade'" @click="vue_real_imgsan" data-click-log="700003">撮合报价</span>
            </div>
            <!--实时报价s-->
            <div class="vue-tealtime-time" v-show="tealtime_time">
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
            <!--实时报价e-->

            <!--询价报价s-->
            <div class="vue-tealtime-timecuo" v-show="tealtime_timecuo">
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
            <div class="vue-tealtime-timetrade" v-show="tealtime_timetrade">
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
            <!--询价报价e-->

            <!--最多报价s-->
            <div class="vue-tealtime-right" v-for='(catalog,index) in match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'static_data_'+catalog.id">
	            	<div class="vue_right_yi">
		            		<img src="../../images/bj.png" alt="" /><span>当前最多报价</span>
	            	</div>
	            	<div class="vue_right_er">
		            		<span>卖：</span><ul class="bird_sell"></ul>
	            	</div>
	            	<div class="vue_right_san">
		            		<span>买：</span><ul class="bird_buy"></ul>
	            	</div>
            </div>
            <!--最多报价e-->

          </div>
          <br clear="all"/>
        </div>
      </div>
      <!--普通大盘--实时报价-询价报价-最多报价--end-->

      <!--我的大盘--实时报价-询价报价-最多报价--start-->
      <div class="vue-chart-newfoot" style="display:none">
        <div class="vue-realtime">
          <div class="vue-realtime-time">
            <div class="vue-real-img">
              <!--<p class="vue-real-img-img"></p>-->
              <span @click="vue_myreal_imgyi" class="vue-real-img_active">实时报价</span>
              <p style="display: inline-block;"><span @click="vue_myreal_imger">贸易商询价</span></p>
            </div>
            <!--实时报价s-->
            <div class="vue-tealtime-time" v-show="mytealtime_time">
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
            <!--实时报价e-->

            <!--询价报价s-->
            <div class="vue-tealtime-timecuo" v-show="mytealtime_timecuo">
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
            			<pre class="tealtime-timecuotitlesi">{{bitem.messages[0].text}}</pre>
            			<span class="chitchat_photo" @click="openEchart(bitem.id)"></span>
            			<br clear="all"/>
            		</li>
            	</ul>
            </div>
            <!--询价报价e-->

            <!--最多报价s-->
            <div class="vue-tealtime-right" v-for='(catalog,index) in my_match_hall_catalogs' v-show="catalog.show==1?true:false" v-bind:id="'my_static_data_'+catalog.id">
	            	<div class="vue_right_yi">
		            		<img src="../../images/bj.png" alt="" /><span>当前最多报价</span>
	            	</div>
	            	<div class="vue_right_er">
		            		<span>卖：</span><ul class="bird_sell"></ul>
	            	</div>
	            	<div class="vue_right_san">
		            		<span>买：</span><ul class="bird_buy"></ul>
	            	</div>
            </div>
            <!--最多报价e-->
          </div>
          <br clear="all"/>
        </div>
      </div>
      <!--我的大盘--实时报价-询价报价-最多报价--end-->
    </div>
    <!--echart模块--end-->
</template>




<script>

export default {
  props: ['user', 'match_hall_companies', 'bidList','match_hall_catalogs','my_match_hall_catalogs'],
  data: function () {
      return {
          chooseTag:1,//选择标识
          companyshow:false,
          peopleshow:false,
          activeIndex:0,
          myActiveIndex:0,
          peopleList:[{nickname:'请先选择公司'}],
          comsplist:[],
          peosplist:[],
          selectPid:this.match_hall_catalogs[0].id,      //普通大盘选中的pid
          selectPidMy:this.my_match_hall_catalogs[0].id, //我的大盘选中的pid
          selectUid:0,
          selectCid:'',
          isActive:false,
          chartusyi:true,
          chartuser:false,
          tealtime_time:true,
          tealtime_timecuo:false,
          tealtime_timetrade:false,
          mytealtime_time:true,
          mytealtime_timecuo:false,
          mytealtime_timetrade:false,
      }
  },

  mounted() {
      $(".vue-tealtime-time>ul").niceScroll({
          cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
          cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
          cursorwidth: "5px", // 滚动条的宽度，单位：便素
          background: "", // 轨道的背景颜色
          cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
          autohidemode: "leave", // 仅在指针离开内容时隐藏
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
      $('.vue-chart-foot .vue-real-img span').removeClass('vue-real-img_active')
      if(localStorage.realmain==undefined){
          $('.vue-chart-foot .vue-real-img span').eq(0).addClass('vue-real-img_active')
          this.tealtime_time=true
          this.tealtime_timecuo=false
          this.tealtime_timetrade=false
      }else{
          $('.vue-chart-foot .vue-real-img span').eq(localStorage.realmain).addClass('vue-real-img_active')
          if(localStorage.realmain==1){
              this.tealtime_time=false
              this.tealtime_timecuo=true
              this.tealtime_timetrade=false
              this.matchtiao();
          }else if(localStorage.realmain==2){
              this.tealtime_time=false
              this.tealtime_timecuo=false
              this.tealtime_timetrade=true
              this.tradetiao();
          }else{
              this.tealtime_time=true
              this.tealtime_timecuo=false
              this.tealtime_timetrade=false
          }
      }
  },

  methods: {
  	  //今天日期,用于询价、报价
      getTodayDate () {
          var date=new Date();
          var sep='-';
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          if(month>=1 && month<=9){
              month='0'+month;
          }
          var day=date.getDate();
          return year+sep+month+sep+day+' '+'00:00:00';
      },
      //我的大盘-普通大盘,勾选切换时显示对应dom
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
      //公司点击事件
      companyclick: function (){
      	  this.companyshow=true,
          this.peopleshow=false,
          this.chooseTag=2
      },
      companyleav: function(){
          this.companyshow=false,
          this.peopleshow=false
      },
      //人员点击事件
      peopleclick: function (){
          this.peopleshow=true,
          this.companyshow=false,
          this.chooseTag=3
      },
      peopleleave:function(){
          this.peopleshow=false,
          this.companyshow=false
      },
      //普通大盘-切换种类
      addcatalog(catalogItem,index){
          this.activeIndex = index
          this.match_hall_catalogs.map((v,i)=>{
              if(index!=i){
                  v.show=0
              }else{
                  v.show=1;
              }
          });
          this.selectPid=catalogItem.id;
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //我的大盘-切换种类
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
      //右侧公司添加
      addcom(companyitem,index){
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
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //右侧公司切换
      changecom(comspitem,comindex){
          this.selectCid=comspitem.id;
          this.selectUid=0;
          this.peopleList=comspitem.members;//联动人员下拉框
          this.peosplist=[];
          $('.vue_company_species>li').attr('class','');
          $('.vue_company_species>li').eq(comindex).attr('class','comactive');
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //右侧公司删除
      delcom(comspitem,comindex){
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
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //右侧人员添加
      addpeo(peopleitem,index){
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
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //右侧人员切换
      changepeo(peospitem,peoindex){//人员切换
          this.selectUid=peospitem.id;
          $('.vue_people_species>li').attr('class','');
          $('.vue_people_species>li').eq(peoindex).attr('class','peoactive');
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //右侧人员删除
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
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
      },
      //勾选：我的大盘-普通大盘
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
          refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
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
              refresh(this.selectPid,this.selectUid,this.selectCid);//刷新曲线
          }
      },
      //普通大盘:实时报价-询价报价切换
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

      //我的大盘:实时报价-询价报价切换
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
      //询价报价滚动条
      matchtiao:function(){
          $(".vue-tealtime-timecuo>ul").niceScroll({
                cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
                cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
                cursorwidth: "5px", // 滚动条的宽度，单位：便素
                background: "", // 轨道的背景颜色
                cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
                autohidemode: "leave", // 仅在指针离开内容时隐藏
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
                autohidemode: "leave", // 仅在指针离开内容时隐藏
                disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
          });
      },
      //打开对话框
      openEchart:function(uid){
          this.$emit('openTempTalkEvent', uid)
      },
  },
}
</script>
