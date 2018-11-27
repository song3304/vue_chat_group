<template>
  <div class="vu_del-popup" style="left: 45%;">
    <div class="vu_fen_zu_title">
      <span>删除</span>
      <p class="vu_fen_zu_tier"  @click="cancle"><span></span></p>
    </div>
    <p>是否确认删除？</p>
    <div class="vu_fenzu_name_footer"><button @click="confirm">确认</button> <span class="vu_fen_zu_tier" @click="cancle">取消</span></div>
  </div>
</template>

<script>
export default {
  name: 'remove',
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
