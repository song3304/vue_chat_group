<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList', 'group_type'],
  computed: {
    companyAllList : function() {
     return [];
    }
  },
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
    <li v-for="companyItem in companyList" :class="{'accordion_li': companyItem.isCalling}">
        <div class="link"><i class="fa fa-caret-right"></i><span class="first_title ">{{companyItem.groupName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
        <ul class="submenu submenu_ul ">
          <li v-for="userItem in companyItem.userList " class="submenu-name " @mouseover="mouseOver " @mouseout="mouseOut ">
            <div class="m-touxiang {userItem.isCalling? ' touxiang': ''} "> <!--有消息头像动加类名 touxiang-->
              <img :src="userItem.img" alt=" " ：class="{ 'gray':!userItem.isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userItem.name}}</a>
            <span class="m-phone-img" @click="changeName "></span>
            <input class="m-phone-input" type="text" v-model="userItem.name" data-uid="userItem.id"  placeholder="userItem.name" @blur="modifyUserName "/>
          </li>
        </ul>
      </li>
    </ul>
</template>

<style>

</style>
