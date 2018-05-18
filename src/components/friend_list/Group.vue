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
    <li v-for="companyItem in companyList" :class="{'v-accordion_li': companyItem.isCalling}">
        <div class="v-link"><i class="fa fa-caret-right"></i><span class="v-first_title ">{{companyItem.groupName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
        <ul class="v-submenu v-submenu_ul ">
          <li v-for="userItem in companyItem.userIds" class="v-submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" >
            <div :class="{'v-m-touxiang':!userItem.isCalling,'v-m-touxiang v-touxiang':userItem.isCalling}"> <!--有消息头像动加类名 touxiang-->
              <img :src="userList[userItem].img" alt=" " class="{ 'v-gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userList[userItem].name}}</a>
            <span class="v-m-phone-img " @click="changeName"></span>
            <input class="v-m-phone-input" type="text" v-model="userList[userItem].name"  @blur="modifyUserName"/> <!--data-uid="{{userList[userItem].id}} "  placeholder="{{userList[userItem].name}} "-->
          </li>
        </ul>
      </li>
    </ul>
</template>

<style>

</style>
