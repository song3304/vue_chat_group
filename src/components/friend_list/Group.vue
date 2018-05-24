<script>
import $ from 'jquery'

export default {
  data () {
    return {
      groupId: 0,
      uid: 0,
      delType: '',
      groupName: '',
      groupPlaceHolder: '请输入新分组名称',
      Qunfen: false, // 修改群分组名称弹窗关闭
      Qunpopup: false, // 确认弹窗关闭
      current_uerId: 0
    }
  },
  props: ['user', 'userList', 'companyList', 'group_type'],
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
    changeQunName: function (ev, groupId) { // 点击修改群分组名称
      event.stopPropagation()
      this.groupId = groupId
      this.Qunfen = true
    },
    modifyGroupName: function () {
      if (this.groupName === '') {
        this.groupPlaceHolder = '组名不能为空，请重新输入'
      }
      this.$emit('modifyGroupEvent', this.groupId, this.group_type, this.groupName)
      this.groupName = ''
      this.Qunfen = false
    },
    quncancel: function () { // 关闭修改弹窗
      this.Qunfen = false
    },
    popcancel: function () { // 关闭删除弹框
      this.Qunpopup = false
    },
    Qundel: function (ev, groupId) { // 点击弹出删除框
      event.stopPropagation()
      this.Qunpopup = true
      this.groupId = groupId
      this.delType = 'group'
    },
    delConfirm: function () {
      if (this.delType === 'group') {
        this.$emit('delGroupEvent', this.groupId, this.group_type)
      } else if (this.delType === 'person') {
        this.$emit('delPersonEvent', this.groupId, this.group_type, this.uid)
      }
      this.Qunpopup = false
    },
    delPen: function (ev, groupId, uid) {
      event.stopPropagation()
      this.Qunpopup = true
      this.groupId = groupId
      this.uid = uid
      this.delType = 'person'
    },
    isCalling (userIds, userList) {
      return userIds.some(uid => userList[uid].isCalling)
    },
    // 折叠
    accordion: function (ev) {
      var _this = $(event.currentTarget)
      _this.next('ul').slideToggle()
      _this.parent('li').toggleClass('vu_open')
    },
    // 切换当前
    changeCurrent: function (uid) {
      this.current_uerId = uid
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
  <ul class="vu_qun_fen">
    <li v-for="companyItem in companyList">
        <div :class="{'vu_link':!isCalling(companyItem.userIds, userList),'vu_link vu_accordion_li': isCalling(companyItem.userIds, userList)}" @click="accordion">
        	<i class="fa fa-caret-right"></i>
        	<span class="vu_first_title ">{{companyItem.groupName}}</span>
        	<span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span>
        	<span title="点击修改群名称" class="vu_qun-name" @click="changeQunName($event,companyItem.groupId)"></span>
        	<p title="点击删除分组" class="vu_check-all" @click="Qundel($event,companyItem.groupId)">-</p>
        </div>
        <ul class="vu_submenu vu_submenu_ul ">
          <li v-for="userItem in companyItem.userIds" :class="{'vu_submenu-name vu_current':userItem==current_uerId,'vu_submenu-name':userItem!=current_uerId}" @click="changeCurrent(userItem)" @mouseover="mouseOver" @mouseout="mouseOut"  @dblclick="openChat(userItem)">
            <div :class="{'vu_m-touxiang':!userList[userItem].isCalling,'vu_m-touxiang vu_touxiang':userList[userItem].isCalling}"> <!--有消息头像动加类名 touxiang-->
              <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--class="gray "-->
              <!--//不在线，添加class=gray-->
            </div>
            <a>{{userList[userItem].name}}</a>
            <span class="vu_m-phone-img " @click="changeName"></span>
            <input class="vu_m-phone-input" type="text" :value="userList[userItem].name" :data-uid="userList[userItem].id" @keyup.enter="modifyUserName" @blur="modifyUserName"/> <!--data-uid="{{userList[userItem].id}} "  placeholder="{{userList[userItem].name}} "-->
            <!--删除人员-->
            <p class="vu_ren-dele" @click="delPen($event,companyItem.groupId,userItem)"></p>
          </li>
       </ul>
      </li>
      <!--//修改群分名字-->
      <div class="vu_qunzu_name" v-show="Qunfen">
      	<div class="vu_fen_zu_title">
      		<span>修改群组名称</span>
      		<p class="vu_fen_zu_tier"  @click="quncancel"><span></span></p>
      	</div>
      	<p class="vu_fenzu_name_na">请输入组名称：</p>
      	<input type="text" name="groupName" :placeholder="groupPlaceHolder" v-model="groupName">
      	<div class="vu_fenzu_name_footer"><button @click="modifyGroupName">确认</button> <span class="vu_fen_zu_tier" @click="quncancel">取消</span></div>
      </div>
      <!--删除确认弹窗-->
      <div class="vu_del-popup" v-show="Qunpopup">
      	<div class="vu_fen_zu_title">
      		<span>删除</span>
      		<p class="vu_fen_zu_tier"  @click="popcancel"><span></span></p>
      	</div>
      	<p>是否确认删除？</p>
      	<div class="vu_fenzu_name_footer"><button @click="delConfirm">确认</button> <span class="vu_fen_zu_tier" @click="popcancel">取消</span></div>
      </div>
    </ul>
</template>

<style>

</style>
