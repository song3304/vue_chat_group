<template>
  <div id="vu_history">
    <div class="vu_his-guan">
      <span>{{userList[historyUid].name}}</span>
      <p class="vu_his-hide" @click="close"><img src="../images/baise-x.png" alt="" /></p>
    </div>
    <ul class="vu_his-main">
      <div class="vu_baoliu">为您保留一周的聊天记录</div>
      <!--//时间-->
      <div class="vu_title">
        <p class="vu_title-text"><span>2018-05-07</span></p>
      </div>
      <!--对方信息-->
      <li class="vu_opposite">
        <p class="vu_oppo-title">小王 14:20:20</p>
        <p class="vu_oppo-xiang">我是小王</p>
      </li>
      <!--自己信息-->
      <li class="vu_oneself">
        <p class="vu_one-title">自己 14:33:20</p>
        <p class="vu_one-xiang">这是我自己说的话</p>
      </li>
      <div class="vu_baoliu">已经到底了</div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryList',
  props: ['user', 'userList', 'historyList', 'historyUid'],
  data () {
    return {
      // 最早一次时间
      lastTime: ''
    }
  },
  methods: {
    close: function () {
      this.$emit('closeEvent', {is_history_show: false})
    }
  }
}
</script>
