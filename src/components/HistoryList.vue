<template>
	<div id="history" >
		<div class=his-guan>
			<span>小王</span>
			<p class="his-hide" ><img src="../images/baise-x.png" alt="" /></p>
		</div>
		<ul class="his-main">
			<div class="baoliu">为您保留一周的聊天记录</div>
			<!--//时间-->
			<div class="title">
	            <p class="title-text"><span>2018-05-07</span></p>
	            </div>
			<!--对方信息-->
			<li class="opposite">
				<p class="oppo-title">小王 14:20:20</p>
				<p class="oppo-xiang">我是小王</p>
			</li>
			<!--自己信息-->
			<li class="oneself">
				<p class="one-title">自己 14:33:20</p>
				<p class="one-xiang">这是我自己说的话</p>
			</li>
			<div class="baoliu">已经到底了</div>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'HistoryList',
  data () {
    return {
    	
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
	    
	}
}
</script>