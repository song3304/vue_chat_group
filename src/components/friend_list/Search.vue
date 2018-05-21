<script>
export default {
  props: ['searchList'],
  methods: {
    openChat: function (uid) {
      this.$emit('openChartEvent', uid)
    }
  }
}
</script>
<template>
  <div class="vu_input-search">
    <ul v-for="userItem in searchList" class="vu_submenu vu_submenu_ul" @dblclick="openChat(userItem.id)">
      <li class="vu_submenu-name">
        <div :class="{'vu_m-touxiang':!userItem.isCalling,'vu_m-touxiang vu_touxiang':userItem.isCalling}">
          <!--有消息头像动加类名 touxiang-->
          <img :src="userItem.img" :alt="userItem.name" :class="{'vu_gray':!userItem.isOnline}" />
          <!--class="gray"-->
          <!--//不在线，添加class=gray-->
        </div>
        <a>{{userItem.name}}</a>
      </li>
    </ul>
    <ul v-if="searchList.length < 1">
      <li class="vu_submenu-name vu_submenu-none">没有搜索到任何人,请重新搜索!</li>
    </ul>
  </div>
</template>
<style>

</style>
