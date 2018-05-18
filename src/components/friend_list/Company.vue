<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList'],
  methods: {
    mouseOver: function(event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).show()
    },
    mouseOut: function(event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).hide()
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
    openChat: function(uid) {
      this.$emit('openChartEvent', uid);
    }
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
  <ul id="vu_accordion" class="vu_accordion vu_qie_div">
    <li v-for="companyItem in companyList" :class="{'accordion_li': companyItem.isCalling}">

        <div class=" vu_link "><i class="fa fa-caret-right "></i><span class="first_title ">{{companyItem.orgName}}</span><span>{{companyItem.onlineCnt}}/{{companyItem.userIds.length}}</span></div>
        <ul class="vu_submenu vu_submenu_ul ">
          <li v-for="userItem in companyItem.userIds" class="submenu-name" @mouseover="mouseOver" @mouseout="mouseOut" @dblclick="openChat(userItem)">
            <div :class="{'vu_m-touxiang':!userItem.isCalling,'vu_m-touxiang vu_touxiang':userItem.isCalling}"> <!--有消息头像动加类名 touxiang-->
              <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userList[userItem].name}}</a>
            <span class="vu_m-phone-img " @click="changeName"></span>
            <input class="vu_m-phone-input" type="text" vu_model="userList[userItem].name"  @blur="modifyUserName"/> <!--data-uid="{{userList[userItem].id}} "  placeholder="{{userList[userItem].name}} "-->
          </li>
        </ul>
      </li>
    </ul> 
</template>

<style>
</style>
