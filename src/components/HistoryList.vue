<template>
	<div id="v-history" v-show="hisopen">
		<div class="v-his-guan">
			<span>小王</span>
			<p class="v-his-hide" @click="close"><img src="../images/baise-x.png" alt="" /></p>
		</div>
		<ul class="v-his-main">
			<div class="v-baoliu">为您保留一周的聊天记录</div>
			<!--//时间-->
			<div class="v-title">
	            <p class="v-title-text"><span>2018-05-07</span></p>
	            </div>
			<!--对方信息-->
			<li class="v-opposite">
				<p class="v-oppo-title">小王 14:20:20</p>
				<p class="v-oppo-xiang">我是小王</p>
			</li>
			<!--自己信息-->
			<li class="v-oneself">
				<p class="v-one-title">自己 14:33:20</p>
				<p class="v-one-xiang">这是我自己说的话</p>
			</li>
			<div class="v-baoliu">已经到底了</div>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'HistoryList',
  data () {
    return {
    	hisopen:true,
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
	   close:function(){
	   	 this.hisopen = false;
	   }
	}
}
</script>