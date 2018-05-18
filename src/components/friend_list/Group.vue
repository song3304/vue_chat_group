<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList', 'group_type'],
  methods: {
    mouseOver: function(event) {
      var el = event.currentTarget
      $('.m-phone-img', $(el)).show()
    },
    mouseOut: function(event) {
      var el = event.currentTarget
      $('.m-phone-img', $(el)).hide()
    },
    changeName: function(event) {
      var el = event.currentTarget
      $(e1).hide().next().show()
    },
    modifyUserName: function(event) {
      var el = event.currentTarget
      var userId = $(el).data('uid')
      var userName = $(el).val()
      //回传提交保存

      $(el).hide()
    },
    openChat: function(uid) {
      this.$emit('openChartEvent', uid);
    }
  }
  // filters: {
  //     search (list) {
  //         return list.filter(item => item.name.indexOf(this.search) > -1);
  //     }
  // }
};

</script>
<template>
  <ul>
    <li v-for="companyItem in companyList" :class="{'accordion_li': companyItem.isCalling}">
        <div class="link"><i class="fa fa-caret-right"></i><span class="first_title ">{{companyItem.groupName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
        <ul class="submenu submenu_ul ">
          <li v-for="userItem in companyItem.userIds" class="submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" @dblclick="openChat(userItem)">
            <div :class="{'m-touxiang':!userList[userItem].isCalling,'m-touxiang touxiang':userList[userItem].isCalling}"> <!--有消息头像动加类名 touxiang-->
              <img :src="userList[userItem].img" alt=" " class="{ 'gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userList[userItem].name}}</a>
            <span class="m-phone-img " @click="changeName"></span>
            <input class="m-phone-input" type="text" v-model="userList[userItem].name"  @blur="modifyUserName"/> <!--data-uid="{{userList[userItem].id}} "  placeholder="{{userList[userItem].name}} "-->
          </li>
        </ul>
      </li>
    </ul>
</template>

<style>

</style>
