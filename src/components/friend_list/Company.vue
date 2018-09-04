<script>
import $ from 'jquery'

export default {
  props: ['user', 'userList', 'companyList'],
  data: function () {
    return {
      current_uerId: 0
    }
  },
  methods: {
    mouseOver: function (event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).show()
    },
    mouseOut: function (event) {
      var el = event.currentTarget
      $('.vu_m-phone-img', $(el)).hide()
    },
    mouseLeave:function(event){
    	var el = event.currentTarget
    	$('.vu_m-phone-input', $(el)).hide()
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
    },
    // 折叠
    accordion: function (event) {
      var _this = $(event.currentTarget)
      _this.next('ul').slideToggle()
      _this.parent('li').toggleClass('vu_open')
    },
    // 切换当前
    changeCurrent: function (uid) {
      this.current_uerId = uid
    },
    sortOnline: function (userIds) {
      var tempIds = []
      userIds.forEach(item => { tempIds.push(item) })
      tempIds.sort((first, second) => {
        if (this.userList[first].isOnline) {
          return -1
        } else if (this.userList[second].isOnline) {
          return 1
        } else {
          return 0
        }
      })
      return tempIds
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
  <!--<ul id="vu_accordion" class="vu_accordion vu_qie_div">-->
    <!--<li v-for="companyItem in companyList">-->
        <!--<div :class="{'vu_link':!isCalling(companyItem.userIds, userList),'vu_link vu_accordion_li': isCalling(companyItem.userIds, userList)}" @click="accordion"><i class="fa fa-caret-right "></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span></div>-->
        <!--<ul class="vu_submenu vu_submenu_ul ">-->
          <!--<li v-for="userItem in sortOnline(companyItem.userIds)" :class="{'vu_submenu-name vu_current':userItem==current_uerId,'vu_submenu-name':userItem!=current_uerId}" @click="changeCurrent(userItem)" @mouseover="mouseOver" @mouseout="mouseOut" @dblclick="openChat(userItem)" @mouseleave="mouseLeave">-->
            <!--<div :class="{'vu_m-touxiang':!userList[userItem].isCalling,'vu_m-touxiang vu_touxiang':userList[userItem].isCalling}"> &lt;!&ndash;有消息头像动加类名 vu_touxiang&ndash;&gt;-->
              <!--<img :src="userList[userItem].img" alt=" " :class="{ 'vu_gray':!userList[userItem].isOnline} "/>&lt;!&ndash;class="gray "&ndash;&gt;-->
              <!--&lt;!&ndash;//不在线，添加class=gray&ndash;&gt;-->
            <!--</div>-->
            <!--<a>{{userList[userItem].name}}</a>-->
            <!--&lt;!&ndash;<span class="vu_m-phone-img " @click="changeName"></span>&ndash;&gt;-->
            <!--&lt;!&ndash;<input class="vu_m-phone-input" type="text" :value="userList[userItem].name" :data-uid="userList[userItem].id" @keyup.enter="modifyUserName" @blur="modifyUserName"/> &lt;!&ndash; "  placeholder="{{userList[userItem].name}} "&ndash;&gt;-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
    <!--</ul>-->
  <div id="vu_accordion" class="vu_accordion vu_qie_div" style="color: #ccc;height: 50px;line-height: 50px;text-align: center;">
    功能正在开发中...
  </div>
</template>

<style>
</style>
