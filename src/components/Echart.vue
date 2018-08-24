<template>
	<div id="vue_echart">
		<div class="vue_echart">
		<!--切换选项-->
		<div class="vue_chart_yi">
			<div class="vue-chart-head">
				<div class="vue_chat_kind">
					<div class="vue_chat_div" @click="kindclick">
						<span class="vue_chatkind_tubiao"></span>
						<span class="vue_chatkind_name">种类</span>
						<span class="vue_chat_jiantou"></span>
					</div>
					<!--下拉表-->
					<ul class="vue_kind_ul" v-show="kindshow" >
					    <li v-for="(catalogItem,index) in catalogList" v-bind:catalog_id='catalogItem.id' @click="addcatalog(catalogItem,index)">{{catalogItem.name}}</li>
					</ul>
					<!--右边切换选项-->
					<ul class="vue_kind_species">
						<li>
							<span>{{catalog}}</span>
						</li>
					</ul>
				</div>
				<div class="vue_chat_company">
					<div class="vue_chat_div" @click="companyclick">
						<span class="vue_company_tubiao"></span>
						<span class="vue_chatkind_name">公司</span>
						<span class="vue_chat_jiantou"></span>
					</div>
					<!--下拉表-->
					<ul class="vue_company_ul" v-show="companyshow">
						<li v-for="(companyitem,index) in companyList" v-bind:company_id='companyitem.id' @click="addcom(companyitem,index)"><span></span>{{companyitem.name}}</li>
					</ul>
					<!--右边切换选项-->
					<ul class="vue_company_species">
						<li v-for="(comspitem,comindex) in comsplist" :class="{'comactive': comspitem.isActive}" >
							<span>{{comspitem.name}}</span>
							<p @click="delcom(comindex)"><span></span></p>
						</li>
					</ul>
				</div>
				<div class="vue_chat_people">
					<div class="vue_chat_div" @click="peopleclick">
						<span class="vue_people_tubiao"></span>
						<span class="vue_chatkind_name">人员</span>
						<span class="vue_chat_jiantou"></span>
					</div>
					<!--下拉表-->
					<ul class="vue_people_ul" v-show="peopleshow">
						<li v-for="(peopleitem,index) in peopleList" v-bind:user_id='peopleitem.id' @click="addpeo(peopleitem,index)">
						    <span><img src="../images/15.png" alt="" /></span>
						    <p>{{peopleitem.username}}</p>
						</li>
					</ul>
					<!--右边切换选项-->
					<ul class="vue_company_species vue_people_species">
						<li v-for="(peospitem,peoindex) in peosplist" @click="delpeo(peoindex)" :class="{'comactive': peospitem.isActive}">
							<span>{{peospitem.username}}</span>
							<p><span></span></p>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!--图表展示-->
		<!----<div class="vue_chat_main">
			<div id='vue-myChart' ></div>
		</div>---->




    <!----ryt 曲线图 start-->

        <div id="myTabContent" class="tab-content tab_mm">
            <div v-for='(catalog,index) in catalogList' class="tab-pane fade in active" v-bind:id="'pan_'+catalog.id" v-show="catalog.show==1?true:false">
                <div class="col-xs-12 chart-pane"  v-bind:id="'pan_data_'+catalog.id" ></div>
                <div class="clear"></div>

                <div class="ckdp_icon"><a href="javascript:;"></a></div>
            </div>
        </div>

	<!---ryt 曲线图 end--->


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
    data() {
        return {
            kindshow:false,
            companyshow:false,
            peopleshow:false,
            catalogList:match_hall_catalogs,
            companyList:match_hall_companies,
            peopleList:[{username:''}],
            comsplist:[],
            peosplist:[],
            catalog:'乙二醇',
            isActive:false,
        }
    },
    mounted() {
        $(".vue-tealtime-time").niceScroll({
            cursorcolor: "#173360", // 改变滚动条颜色，使用16进制颜色值
            cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
            cursorwidth: "5px", // 滚动条的宽度，单位：便素
            background: "", // 轨道的背景颜色
            cursorborder: "0 solid #fff", // CSS方式定义滚动条边框
            autohidemode: false, // 隐藏滚动条的方式, 可用的值:
        });
    },
  methods: {
  	kindclick: function (){
  		this.kindshow=!this.kindshow,
  		this.companyshow=false,
  		this.peopleshow=false
  	},
  	companyclick: function (){
  		this.companyshow=!this.companyshow,
  		this.kindshow=false,
  		this.peopleshow=false
  	},
  	peopleclick: function (){
  		this.peopleshow=!this.peopleshow,
  		this.companyshow=false,
  		this.kindshow=false
  	},

    addcatalog(catalogItem,index){//种类切换
        this.catalogList.map((v,i)=>{
            if(index!=i){
                v.show=0
            }else{
                v.show=1;
            }
        });
        this.kindshow=false;
        this.catalog=catalogItem.name;
    },

    addcom(companyitem,index){//公司添加到右侧
        this.peopleList=companyitem.members;//联动--人员下拉框
    	this.companyshow=false
		let selectedItem = this.comsplist.filter(v => v.name === companyitem.name)[0];
        if (selectedItem) {
            $('.vue_company_species>li').attr('class','')
        	$('.vue_company_species>li').eq(index).attr('class','comactive')
        } else {
        	$('.vue_company_species>li').attr('class','')
           	this.comsplist.push({
             	...companyitem ,isActive:true//,isActive:true
        	})
        };
    },
    delcom(comindex){//公司删除
    	this.comsplist.splice(comindex,1);
    },
    addpeo(peopleitem,index){//人员追加到右侧
    	this.peopleshow=false
    	let peoedItem = this.peosplist.filter(v => v.name === peopleitem.name)[0];
        if (peoedItem) {
        	$('.vue_people_species>li').attr('class','')
        	$('.vue_people_species>li').eq(index).attr('class','comactive')
        } else {
        	$('.vue_people_species>li').attr('class','')
           	this.peosplist.push({
             	...peopleitem,isActive:true
        	})
        };
    },
    delpeo(peoindex){//人员删除
    	this.peosplist.splice(peoindex,1);
    }
  }
}
</script>

<style>
</style>
