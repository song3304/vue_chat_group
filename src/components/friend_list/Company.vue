<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList'],
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
    },
  },
  mounted(){
  	//this.userIds=this.userList
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
          <li v-for="userItem in companyItem.userIds" class="submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" >
            <div :class="{'m-touxiang':!userItem.isCalling,'m-touxiang touxiang':userItem.isCalling}"> <!--有消息头像动加类名 touxiang-->
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
