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
						<li>乙二醇</li>
						<li>甲醇</li>
					</ul>
					<!--右边切换选项-->
					<ul class="vue_kind_species">
						<li>
							<span>乙二醇</span>
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
						<li v-for="(companyitem,index) in companylist" @click="addcom(companyitem,index)"><span></span>{{companyitem.name}}</li>
					</ul>
					<!--右边切换选项-->
					<ul class="vue_company_species">
						<li v-for="(comspitem,comindex) in comsplist" :class="{'comactive': comspitem.isActive}" @click="delcom(comindex)">
							<span>{{comspitem.name}}</span>
							<p><span></span></p>
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
						<li v-for="(peopleitem,index) in peoplelist" @click="addpeo(peopleitem,index)"><span><img src="../images/15.png" alt="" /></span><p>{{peopleitem.name}}</p></li>						
					</ul>
					<!--右边切换选项-->
					<ul class="vue_company_species">
						<li v-for="(peospitem,peoindex) in peosplist" @click="delpeo(peoindex)">
							<span>{{peospitem.name}}</span>
							<p><span></span></p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		<!--图表展示-->
		<div class="vue_chat_main">
			<div id='vue-myChart' ></div>
		</div>		
		<!--实时报价信息-->
		<div class="vue-chart-foot">
			<div class="vue-realtime">
				<div class="vue-realtime-time">
					<div class="vue-real-img">
						<p class="vue-real-img-img"></p>
						<span>实时报价</span>
					</div>
					<div class="vue-tealtime-time">
						<ul class="vue-realtime-auto" >							
							<li>
								<span>15:23</span>
								<span>华塑汇</span>
								<span class="vue-realtime-buy">买</span>
								<span class="vue-realtime-buy">7100</span>
								<span>2018-08-17至2018-08-17</span>
								<span>500</span>
							</li>
							<li>
								<span>15:23</span>
								<span>华塑汇</span>
								<span class="vue-realtime-sell">卖</span>
								<span class="vue-realtime-sell">7100</span>
								<span>2018-08-17至2018-08-17</span>
								<span>500</span>
							</li>
						</ul>						
					</div>
				</div>
				<br clear="all"/>
			</div>
		</div>
	  </div>
	</div>
		
	
</template>

<script>
	let echarts = require('echarts/lib/echarts')
	// 引入折线图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	
	export default {
  name: 'hello',
  data() {
    return {
		kindshow:false,
		companyshow:false,
		peopleshow:false,
		companylist: [{//公司测试数据
			name:'化塑汇',
			isActive: false
		}, {
			name:'公司名称',
			isActive: false
		}, {
			name:'化商通',
			isActive: false
		}],
		peoplelist:[{
			name:'小王'
		}, {
			name:'小李'
		}, {
			name:'小张'
		}],
		comsplist:[],
		peosplist:[],
		isActive:false,
    }
  },
  mounted() {
    this.drawLine();
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('vue-myChart'))
      // 绘制图表
      myChart.setOption({
//      title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    addcom(companyitem,index){//公司添加到右侧
    	this.companyshow=false
		let selectedItem = this.comsplist.filter(v => v.name === companyitem.name)[0];
        if (selectedItem) {
           
        } else {       	
           	this.comsplist.push({
             	...companyitem //,isActive:true
        	})
        };        
//      console.log(this.comsplist)
    },
    delcom(comindex){//公司删除
    	this.comsplist.splice(comindex,1);
    },
    addpeo(peopleitem,index){//人员追加到右侧
    	this.peopleshow=false
    	let peoedItem = this.peosplist.filter(v => v.name === peopleitem.name)[0];
        if (peoedItem) {
           
        } else {
           	this.peosplist.push({
             	...peopleitem
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