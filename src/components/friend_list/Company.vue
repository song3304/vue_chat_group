<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList'],
  computed: {
    companyAllList: function() {
      var companyUserList = []
      for (var i = 0, lg = this.companyList.length; i < lg; i++) {
        var item = this.companyList[i]
        item.userList = []
        for (var j = 0, item_lg = item.userIds.length; j < item_lg; j++) {
          item.userList.push(this.userList[item.userIds[j]])
        }
      }
      return companyUserList
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
      // 回传提交保存

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
  <ul id="accordion" class="accordion qie_div">
    <li v-for="companyItem in companyList" :class="{'accordion_li': companyItem.isCalling}">
        <div class=" link "><i class="fa fa-caret-right "></i><span class="first_title ">{{companyItem.orgName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
        <ul class="submenu submenu_ul ">
          <li v-for="userItem in companyItem.userList" class="submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" >
            <div class="m-touxiang {userItem.isCalling? ' touxiang': ''} "> <!--有消息头像动加类名 touxiang-->
              <img :src="userItem.img" alt=" " class="{ 'gray':!userItem.isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userItem.name}}</a>
            <span class="m-phone-img " @click="changeName"></span>
            <input class="m-phone-input" type="text" v-model="userItem.name"  @blur="modifyUserName"/> <!--data-uid="{{userItem.id}} "  placeholder="{{userItem.name}} "-->
          </li>
        </ul>
      </li>
    </ul> 
</template>

<style>
</style>
