<script>
export default {
  props: ['searchList'],
  methods: {
    openChat: function(uid) {
      this.$emit('openChartEvent', uid);
    }
  }
}
</script>
<template>
  <div class="input-search">
    <ul v-for="userItem in searchList" class="submenu submenu_ul" @click="openChat(userItem.id)">
      <li class="submenu-name">
        <div :class="{'m-touxiang':!userItem.isCalling,'m-touxiang touxiang':userItem.isCalling}">
          <!--有消息头像动加类名 touxiang-->
          <img :src="userItem.img" :alt="userItem.name" :class="{'gray':!userItem.isOnline}" />
          <!--class="gray"-->
          <!--//不在线，添加class=gray-->
        </div>
        <a>{{userItem.name}}</a>
      </li>
    </ul>
  </div>
</template>
