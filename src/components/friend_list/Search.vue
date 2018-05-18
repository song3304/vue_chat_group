<script>
export default {
  props: ['searchList']
}
</script>
<template>
  <div class="v-input-search">
    <ul v-for="userItem in searchList" class="v-submenu v-submenu_ul">
      <li class="v-submenu-name">
        <div :class="{'m-touxiang':!userItem.isCalling,'m-touxiang touxiang':userItem.isCalling}">
          <!--有消息头像动加类名 touxiang-->
          <img :src="userItem.img" :alt="userItem.name" :class="{'v-gray':!userItem.isOnline}" />
          <!--class="gray"-->
          <!--//不在线，添加class=gray-->
        </div>
        <a>{{userItem.name}}</a>
      </li>
    </ul>
  </div>
</template>
<style>
.v-input-search .v-submenu{
	display: block;
}
</style>