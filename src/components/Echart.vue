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
	                <span><img v-bind:src="peopleitem.pic_url" alt="" /></span>
	                <p>{{peopleitem.username}}</p>
	              </li>
	            </ul>
            </div>

            <!--右边切换选项-->
            <ul class="vue_company_species vue_people_species">
              <li v-for="(peospitem,peoindex) in peosplist" :class="{'peoactive': peospitem.isActive}">
                <span @click="changepeo(peospitem,peoindex)">{{peospitem.username}}</span>
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

        <div v-for='(catalog,index) in catalogList' class="" v-bind:id="'pan_'+catalog.id" >
          <div class="col-xs-12 chart-pane"  v-bind:id="'pan_data_'+catalog.id" ></div>
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
              <ul class="vue-realtime-auto"  v-for='(catalog,index) in catalogList' v-show="catalog.show==1?true:false" v-bind:id="'realtime_'+catalog.id">
                <!--<li>
                    <span class="vue-realtime-auto-time">15:23</span>
                    <span class="vue-realtime-auto-company">华塑汇</span>
                    <span class="vue-realtime-buy">买</span>
                    <span class="vue-realtime-buy vue-realtime-buy_price">7100</span>
                    <span class="vue-realtime-auto-data">2018-08-17至2018-08-17</span>
                    <span class="vue-realtime-auto-num">500</span>
                </li>
                <li>
                    <span class="vue-realtime-auto-time">15:23</span>
                    <span class="vue-realtime-auto-company">华塑汇</span>
                    <span class="vue-realtime-sell">卖</span>
                    <span class="vue-realtime-sell vue-realtime-sell_price">7100</span>
                    <span class="vue-realtime-auto-data">2018-08-17至2018-08-17</span>
                    <span class="vue-realtime-auto-num">500</span>
                </li>-->
              </ul>
            </div>
          </div>
          <br clear="all"/>
        </div>
      </div>
      <!--实时报价信息 end-->
    </div>

    <!-- 群发框 -->
    <div class="c_qunBox" v-show="showQunFa">
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='match'">乙二醇-群发报价<span><img src="../images/closeQF.png" alt="" @click="closeQunFa"></span></div>
      <div class="c_qunBaoJiaTitle" v-if="user.plat=='trade'">乙二醇-批量询价<span><img src="../images/closeQF.png" alt="" @click="closeQunFa"></span></div>
      <div class="c_imgntent">
        <div class="c_qunPeo">
          <div class="c_qunPeoTitle">选择群发人员</div>
          <div class="vu_fenzu_left vu_accordion" @mousedown="jinzhi" style="width: 100%!important;height: 100%px!important;">
            <ul class="vu_fenzu_left_ul" style="width: 100%;height: 100%;">
              <li v-for="companyItem in companyLists" :class="{'vu_accordion_li': companyItem.isCalling}">
                <div class="vu_link newQunFa" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span><p class="vu_check-all" title="点击全选" @click="checkAll($event,companyItem.userIds)">+</p></div>
                <ul class="vu_submenu vu_submenu_ul">
                  <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current newQunFa':in_array(userItem,formData.userIds)}" >
                    <div class="vu_m-touxiang newQunFa">
                      <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
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
            <ul class="vu_fenzu_right_ul newQunFa">
              <li v-for="uid in formData.userIds" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" /></div> <a>{{userList[uid].name}}</a> <span @click="delUser(uid)"></span></li>
            </ul>
          </div>
          <div class="vu_qunnew-que newQunFa">
            <!--<div>*请您核对群发消息内容:</div>-->
            <form id="addQuickForm" action="http://www.energy.cn/match/offer/create" method="post"
                  class="form-horizontal form form-builder" style="height: 100%">
              <textarea class="row" id="groupHairMsg" name="groupHairMsg" v-model="groupMsg" placeholder="请您粘贴信息"></textarea>
            </form>
          </div>
          <div class="c_openBox">
            <div class="c_shiBieButton" data-cnt="0" ref="btn" @click="sendGroupMsg()" id='quick_parse_create'style="margin-top: 14px;">
              群发
            </div>
            <div class="c_openShibie"><span :class={gou:chooseG} @click="chooseGou"></span>是否开启报价识别</div>
          </div>
          <!--<div class="vu_fenzu_footer">-->
          <!--<button @click="sendGroupMsg" @mousedown="jinzhi">确认</button>-->
          <!--<span class="vu_fen_zu_tiyi" @click="close" @mousedown="jinzhi">取消</span>-->
          <!--</div>-->
        </div>
      </div>
      <!--<div id="quick_parse_new" style="margin-left: 0">-->
        <!--<div class="cuohe_bao_tan" style="width:80%;min-width: 1200px;">-->
          <!--<div class="roleindex_tittle">-->
            <!--<img src="/static/img/match/tijiaobaojia.png" alt="" style="margin-left: 20px;float:left;margin-top:15px;margin-right:5px;">-->
            <!--<span class="tijia-jiaos">提交报价</span>-->
            <!--<a class="primary" onClick ="$('#quick_parse_new_data_table').tableExport({ type: 'excel', escape: 'false' })" hidden>导出</a>-->
            <!--<div style="display: inline-block;float: right;width:60px;height:60px;cursor: pointer;" class="xiaoshi" id="quick_parse_close">-->
              <!--<img src="/static/img/trade/quxiao_shou.png" alt="">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div style="height: 505px;overflow: auto;border-top:1px solid #dddddd;">-->
            <!--<table id="quick_parse_new_data_table">-->

            <!--</table>-->
          <!--</div>-->
          <!--<div class="cuohe_bao_que">-->
            <!--<div>-->
              <!--<button id="quick_parse_submit_price">提交报价</button>-->
              <!--<p class="cuohe_quxiao">取消</p>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <img src="../images/tips.png" alt="" class="c_qunTips" v-show="formData.userIds.length==0">
    </div>

    <!-- 群发报价 -->
    <div v-if="user.plat=='match'" class="vue_qun_offer" @click="qunFa()"><p></p><span>群发报价</span></div>
    <div v-if="user.plat=='trade'" class="vue_qun_offer" @click="qunFa()"><p></p><span>批量询价</span></div>
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
        peopleList:[{username:'请先选择公司'}],
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
          userIds: []
        },
        placeholder: '请输入群发内容.',
        groupMsg:'',//群发内容
        chooseG:false,
      }
    },
    mounted() {
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

    },
    methods: {
      //qunNew部分内容
      /* qunNew部分开始 */
      chooseGou:function () {
        this.chooseG = !this.chooseG
      },
      sendGroupMsg: function () {
        console.log(this.formData.userIds)
        if (this.formData.userIds.length < 1) {
          alert('请先选择群发人员')
          return
        } else if (this.groupMsg === '') {
          alert('群发消息不能为空.')
          return
        }
        this.$emit('sendGroupMsgEvent', this.formData.userIds, this.groupMsg, this.chooseG)
        this.formData.userIds = []
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
        // alert(this.chooseCatalog)
        if(this.chooseCatalog!=0){
          this.showQunFa = true;
        }else{
          alert('请选择种类');
        }
      },
      closeQunFa: function () {
        this.showQunFa = false;
      },
      showShibie: function (event) {
        // var _parse_txt_result = false;
        // var $_this = $(event.currentTarget);
        // console.log('data.cnt:',$_this.data('cnt'));
        // var opt ={
        //   pagination: false,
        //   clickToSelect: true,
        //   dataType: "json",
        //   method: 'POST',
        //   sidePagination: 'server',
        //   pageSize: 200,  //200条记录应该是足够了
        //   pageNumber: 1,
        //   url: 'http://www.energy.cn/match/offer/create',
        //   contentType: "application/x-www-form-urlencoded",
        //   queryParams: function (param) {
        //     //追加额外的请求参数
        //     param.opt = 'quick_parse';
        //     param.catalog_id = match_hall_catalogs[0].catalog_id;
        //     param.import_txt = $('#quick_parse_txt').val();
        //     return param;
        //   },
        //   responseHandler: function(res) {
        //     if (res.code == 0) {
        //       _parse_txt_result = false;
        //       //解析失败,若已打开群发按钮，仍需群发消息
        //       if(false){//_is_auto_hair
        //         $('#quick_parse_submit_price').trigger('click');
        //       }else{
        //         //不需要群发
        //         $("#quick_parse_new").hide();
        //         // toastr.warning(res.msg);
        //         return false;
        //       }
        //     }else{
        //       _parse_txt_result = true;
        //       alert('show');
        //       $("#quick_parse_new").show();
        //       return res;
        //     }
        //   },
        //   onLoadSuccess:function(res){
        //     if(res.code == 1){
        //       for(var i=0,lgth=res.data.length;i<lgth;i++){
        //         var index = i;
        //         //如果价格为空,重新样式
        //         if(parseInt(res.data[i].trade_price)<1){
        //           $_tr = $('#quick_parse_new_data_table tbody tr').eq(i);
        //           $_tr.css('background-color','#fff8f1');
        //           $_td = $("a[data-name='trade_price']",$_tr).parent();
        //           $_td.css('border','1px solid #ff0000');
        //         }
        //       }
        //     }
        //   },
        //   cache: false,
        //   totalField: 'total',
        //   dataField: 'data',
        //   editable: true,
        //   uniqueId: 'index',
        //   columns: [{
        //     field: "product_id",
        //     title: "品类",
        //     visible: false,
        //     editable: {
        //       type: 'text',
        //       title: '品类',
        //       validate: function (v) {
        //         if (!v) return '品类不能为空';
        //
        //       }
        //     }
        //   }, {
        //     field: "index",
        //     title: "编号",
        //   },{
        //     field: "trade_type",
        //     title: "类型",
        //     editable: {
        //       type: 'select',
        //       source: [{ value: 1, text: "买" }, { value: -1, text: "卖" }, {value:2,text:"成交"}],
        //       title: '类型',
        //       validate: function (v) {
        //         if (!v) return '类型不能为空';
        //
        //       }
        //     }
        //   }, {
        //     field: "trade_price",
        //     title: "价格",
        //     editable: {
        //       type: 'text',
        //       title: '价格',
        //       validate: function (v) {
        //         if (!v) return '价格不能为空';
        //       }
        //     }
        //   }, {
        //     field: "trade_amount",
        //     title: "数量",
        //     editable: {
        //       type: 'text',
        //       title: '数量',
        //       validate: function (v) {
        //         if (!v) return '数量不能为空';
        //       }
        //     }
        //   },{
        //     field: "bond",
        //     title: "保证金",
        //     editable: {
        //       type: 'select',
        //       source:[{ value: "0", text: "0保" },{ value: "1", text: "5%" },{ value: "2", text: "免保" }],
        //       title: '保证金',
        //     }
        //   },{
        //     field: "trader_id",
        //     title: "交易商",
        //     editable: {
        //       type: 'select',
        //       source:[{value:"0",text:"无"},{value:"81",text:"国投"},{value:"83",text:"金诺"},{value:"84",text:"国企"},{value:"85",text:"浙江金龙贸易发展有限公司"},{value:"86",text:"浙江尤夫高新纤维股份有限公司"},{value:"87",text:"中国国投国际贸易南京有限公司"},{value:"88",text:"福建联合石油化工有限公司"},{value:"89",text:"宁波源涌贸易有限公司"},{value:"90",text:"宁波富德能源有限公司"},{value:"91",text:"厦门荣锦贸易有限公司"},{value:"92",text:"中基宁波集团股份有限公司"},{value:"93",text:"恒力石化（大连）有限公司"},{value:"94",text:"中铝国际工程设备有限公司"},{value:"95",text:"华祥（中国）高纤有限公司"},{value:"96",text:"江苏海欣纤维有限公司"},{value:"97",text:"衡都"},{value:"101",text:"摩贝"},{value:"103",text:"世能"},{value:"107",text:"亨承"},{value:"108",text:"博纳"},{value:"109",text:"华润"},{value:"110",text:"前程"},{value:"111",text:"东越"},{value:"112",text:"醒狮"},{value:"113",text:"主流"},{value:"114",text:"港联"},{value:"115",text:"凯文"},{value:"116",text:"昱旸"},{value:"118",text:"安徽祯之信"},{value:"119",text:"海鹏"},{value:"120",text:"恒逸"},{value:"121",text:"隆焻"},{value:"122",text:"良恩"},{value:"123",text:"光华"},{value:"124",text:"盛楼/创元"},{value:"125",text:"畅一骁"},{value:"126",text:"沃娇"},{value:"127",text:"天津港通"},{value:"128",text:"华庆"},{value:"129",text:"东辰"},{value:"130",text:"朋荣"},{value:"131",text:"中南"},{value:"134",text:"金隆"},{value:"135",text:"换手盘"},{value:"136",text:"振辉"},{value:"137",text:"乐丰"},{value:"138",text:"塑盛"},{value:"139",text:"中和"},{value:"140",text:"泰地"},{value:"141",text:"巽融"},{value:"142",text:"龙运"},{value:"143",text:"远大"},{value:"144",text:"正一"},{value:"145",text:"苏克"},{value:"146",text:"上海新天"},{value:"147",text:"精功换手"},{value:"148",text:"中商"},{value:"149",text:"凯富龙"},{value:"150",text:"锦壬"},{value:"151",text:"铭源物产"},{value:"152",text:"静安"},{value:"153",text:"工厂"},{value:"154",text:"中商沪深"},{value:"155",text:"浙江远能"},{value:"156",text:"嘉塑盛"},{value:"157",text:"金桥"},{value:"158",text:"四邦"},{value:"159",text:"华君"},{value:"160",text:"江苏徽熳"},{value:"161",text:"上海韵彬"},{value:"162",text:"青岛步天"},{value:"163",text:"常州博昊"},{value:"164",text:"华茂"},{value:"165",text:"茂煊"},{value:"166",text:"泰地"},{value:"167",text:"辛逸"},{value:"168",text:"前程"},{value:"169",text:"远大能源"},{value:"170",text:"联弘"},{value:"171",text:"香塘"},{value:"172",text:"新凤鸣"},{value:"173",text:"万凯"},{value:"174",text:"三房巷"},{value:"175",text:"金桥"},{value:"176",text:"群星"},{value:"177",text:"延长"},{value:"178",text:"方正"},{value:"179",text:"汇鸿"},{value:"180",text:"春风"},{value:"181",text:"南通化轻"},{value:"182",text:"长城"},{value:"183",text:"象屿"},{value:"184",text:"国贸启润"},{value:"185",text:"中化塑"},{value:"186",text:"浙江物产"},{value:"187",text:"中铝"},{value:"188",text:"国投"},{value:"189",text:"国投张家港"},{value:"190",text:"中船重工"},{value:"191",text:"灏润"},{value:"192",text:"醒狮"},{value:"193",text:"五洋"},{value:"194",text:"百地年"},{value:"195",text:"苏南"},{value:"196",text:"精功"},{value:"197",text:"银亿"},{value:"198",text:"巨雄"},{value:"199",text:"远大石化"},{value:"200",text:"华升"},{value:"201",text:"正凯"},{value:"202",text:"世能"},{value:"203",text:"恒杰"},{value:"204",text:"正杰"},{value:"205",text:"嘉塑盛贸"},{value:"206",text:"仕进"},{value:"207",text:"孚豪"},{value:"208",text:"卓泰"},{value:"209",text:"平衡"},{value:"210",text:"鼎衡"},{value:"211",text:"凯越"},{value:"212",text:"祯之信"},{value:"213",text:"杭实善成"},{value:"218",text:"前程"},{value:"234",text:"国贸启润"},{value:"332",text:"test陈以权"},{value:"333",text:"日出"},{value:"334",text:"康暄"},{value:"335",text:"奥文"},{value:"336",text:"皮塑"},{value:"337",text:"精业新材料"},{value:"338",text:"上海柄辰"},{value:"339",text:"东裕"},{value:"340",text:"浙江经世"},{value:"341",text:"勤元运生"},{value:"342",text:"赞成"},{value:"343",text:"创赢"},{value:"344",text:"江苏科恩"},{value:"345",text:"智传"},{value:"346",text:"宁波东菱"},{value:"347",text:"塑来"},{value:"348",text:"恒祺"},{value:"349",text:"中同"},{value:"350",text:"中瑞"},{value:"351",text:"商州"},],
        //       title: '交易商',
        //     }
        //   }, {
        //     field: "stock",
        //     title: "仓库",
        //     editable: {
        //       type: 'select',
        //       source:[{value: "2", text: "国际" },{value: "9", text: "太仓" },{value: "13", text: "宁波" },{value: "14", text: "常熟" },{value: "15", text: "华西" },{value: "16", text: "乍浦" }],
        //       title: '仓库',
        //       validate: function (v) {
        //         if (!v) return '仓库不能为空';
        //
        //       }
        //     }
        //   },{
        //     field: "delivery_start",
        //     title: "交割起",
        //     class:'jiaoge_start',
        //     formatter: function (value, row, index) {
        //       return value;
        //     },
        //     editable: {
        //       type: 'date',
        //       format: "yyyy-mm-dd",
        //       title: '开始时间',
        //       pickerPosition:"top-left",
        //       validate: function (v) {
        //         if (!v) return '交割起时间不能为空';
        //       }
        //     }
        //   },{
        //     field: "delivery_end",
        //     title: "交割止",
        //     class:'jiaoge_end',
        //     formatter: function (value, row, index) {
        //       return value;
        //     },
        //     editable: {
        //       type: 'date',
        //       format: "yyyy-mm-dd",
        //       title: '截止时间',
        //       validate: function (v) {
        //         if (!v) return '截止时间不能为空';
        //       }
        //     }
        //   },{
        //     field: "raw_data",
        //     title: "原始信息",
        //     editable: {
        //       type: 'text',
        //       title: '原始信息',
        //       validate: function (v) {
        //         if (!v) return '原始信息不能为空';
        //
        //       }
        //     }
        //   },{
        //     title: "　　操作　　",
        //     formatter: function (value, row, index) {
        //       var f='<a class="btn btn-danger remove remove_parse" data-id="'+row.index+'" style="color:#fff;">删除</a>&nbsp;';
        //       f+= '<a class="btn btn-info remove error_parse" style="color:#fff;" data-note="'+row.raw_data+'" title="交割期解析出错，请上报">报错</a>';
        //       return f;
        //     },
        //   },
        //   ],
        // };
        // if(parseInt($_this.data('cnt'))<1){
        //   $_this.data('cnt',1);
        //   $("#quick_parse_new_data_table").bootstrapTable(opt);
        //   console.log(opt)
        //   // $("#quick_parse_new").show();
        // }else{
        //   console.log($_this.data('cnt'));
        //   $("#quick_parse_new_data_table").bootstrapTable('refresh',opt);
        // }
        // this.sendGroupMsg();
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
        this.peopleList=[{username:'请先选择公司'}];//清空人员下拉框
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
