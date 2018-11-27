<template>
  <div class="vu_del-popup" style="left:45%;">
    <div class="vu_fen_zu_title">
      <span>提示</span>
      <p class="vu_fen_zu_tier"  @click="confirm"><span></span></p>
    </div>
    <p>{{tipsMsg}}</p>
    <div class="vu_fenzu_name_footer"><button @click="confirm">确认</button> <span class="vu_fen_zu_tier" @click="cancle">取消</span></div>
  </div>
</template>

<script>
export default {
  name: 'tip',
  props: ['tipsMsg'],
  methods: {
    confirm: function () {
      this.$emit('confirmEvent')
    },
    cancle: function () {
      this.$emit('cancleEvent')
    }
  }
}
</script>

<style scoped>

</style>
