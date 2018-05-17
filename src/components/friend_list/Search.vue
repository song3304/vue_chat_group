<script>
export default {
  props: ['searchList']
}
</script>
<template>
  <div class="input-search">
    <ul v-for="userItem in searchList" class="submenu submenu_ul">
      <li class="submenu-name">
        <div class="m-touxiang{userItem.isCalling?' touxiang':''}">
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
