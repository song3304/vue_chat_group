<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList'],
  methods: {
    mouseOver: function (event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).show()
    },
    mouseOut: function (event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).hide()
    },
    changeName: function (event) {
      var el = event.currentTarget
      $(el).hide().next().show()
    },
    modifyUserName: function (event) {
      var el = event.currentTarget
      var userId = $(el).data('uid')
      var userName = $(el).val()
      if (userName !== '') {
        this.userList[userId].name = userName
        this.$emit('changeUserNameEvent', {userId: userId, userName: userName})
      }
      // 回传提交保存

      $(el).hide()
    },
    openChat: function (uid) {
      this.$emit('openChartEvent', uid)
    },
    isCalling (userIds, userList) {
      return userIds.some(uid => userList[uid].isCalling)
    }
  },
  filters: {
    online (userIds, userList) {
      var onlineCnt = 0
      userIds.forEach(uid => { if (userList[uid].isOnline) onlineCnt++ })
      return onlineCnt
    }
  }
}

</script>
<template>
  <ul id="vu_accordion" class="vu_accordion vu_qie_div">
    <li v-for="companyItem in companyList">
        <div class="vu_link" :class="{'vu_accordion_li': isCalling(companyItem.userIds, userList)}"><i class="fa fa-caret-right "></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span></div>
        <ul class="vu_submenu vu_submenu_ul ">
          <li v-for="userItem in companyItem.userIds" class="vu_submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" @dblclick="openChat(userItem)">
            <div :class="{'vu_m-touxiang':!userList[userItem].isCalling,'vu_m-touxiang vu_touxiang':userList[userItem].isCalling}"> <!--有消息头像动加类名 vu_touxiang-->
              <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userList[userItem].name}}</a>
            <span class="vu_m-phone-img " @click="changeName"></span>
            <input class="vu_m-phone-input" type="text" :value="userList[userItem].name" :data-uid="userList[userItem].id" @keyup.enter="modifyUserName" @blur="modifyUserName"/> <!-- "  placeholder="{{userList[userItem].name}} "-->
          </li>
        </ul>
      </li>
    </ul>
</template>

<style>
</style>
