<template>
  <div class="vu_xuan-fen" >
    <div class="vu_fen_zu" @mousedown="drag" id="vu_div">
      <div class="vu_fen_zu_title">
        <span>{{groupType == "common"?'创建分组':'创建群发组'}}</span>
        <p class="vu_fen_zu_tiyi"  @click="close" @mousedown="jinzhi"><span></span></p>
      </div>
      <div class="vu_fenzu_left vu_accordion" @mousedown="jinzhi">
        <!--input type="text" class="vu_fenzu_left_input" placeholder="搜索" @keyup.enter="search" @click="search" vu_model="seachKey"/-->
        <ul class="vu_fenzu_left_ul">
          <li v-for="companyItem in companyList" :class="{'vu_accordion_li': companyItem.isCalling}">
            <div class="vu_link" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.orgName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span></div>
            <ul class="vu_submenu vu_submenu_ul ">
              <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current':in_array(userItem,formData.userIds)}">
                <div class="vu_m-touxiang"> <!--有消息头像动加类名 touxiang-->
                  <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--class="gray "-->
                  <!--//不在线，添加class=gray-->
                </div>
                <a>{{userList[userItem].name}}</a>
                <!--<span class="m-phone-img" @click="changeName "></span>
                <input class="m-phone-input" type="text" vu_model="userList[userItem].name" :data-uid="userList[userItem].id"  :placeholder="userList[userItem].name" @blur="modifyUserName "/>-->
                <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" ><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
              </li>
            </ul>
            <p class="vu_check-all" title="点击全选" @click="checkAll($event,companyItem.userIds)">+</p>
          </li>
        </ul>
      </div>
      <div class="vu_fenzu_right" @mousedown="jinzhi">
        <p>已选择<span>{{formData.userIds.length}}</span>个联系人</p>
        <ul class="vu_fenzu_right_ul">
          <li v-for="uid in formData.userIds" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" /></div> <a>{{userList[uid].name}}</a> <span @click="delUser(uid)"></span></li>
        </ul>
      </div>
      <br clear="all"/>
      <div class="vu_fenzu_footer">
        <button @click="submitUser" @mousedown="jinzhi">确认</button>
        <span class="vu_fen_zu_tiyi" @click="close" @mousedown="jinzhi">取消</span>
      </div>
      <!--//设置组名称-->
      <div class="vu_fenzu_name" v-show="panelShow.setGroupShow" @mousedown="jinzhi">
        <div class="vu_fen_zu_title">
          <span>设置组名称</span>
          <p class="vu_fen_zu_tier" @click="closeGroup"><span></span></p>
        </div>
        <p class="vu_fenzu_name_na">请输入组名称：</p>
        <input type="text" name="groupName" v-model="formData.groupName" :placeholder="placeholder" />
        <div class="vu_fenzu_name_footer">
          <button @click="submitGroup">确认</button>
          <span class="vu_fen_zu_tier" @click="closeGroup">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'GroupDialog',
  props: ['user', 'userList', 'companyList', 'groupType'],
  data: function () {
    return {
      panelShow: {
        // searchShow: false,
        setGroupShow: false
      },
      formData: {
        userIds: [],
        groupName: ''
      },
      placeholder: '请输入分组名称'
    }
  },
  methods: {
    // 关闭事件
    close: function () {
      this.$emit('closeEvent', {
        is_group_show: false
      })
    },
    closeGroup: function () {
      this.panelShow.setGroupShow = false
    },
    checkAll: function (event, userIds) {
      var el = event.currentTarget
      var opt = $(el).html()
      if (opt === '+') {
        // 添加formData.userIds
        $(el).html('-')
        for (var i = 0, lg = userIds.length; i < lg; i++) {
          if (!this.in_array(userIds[i], this.formData.userIds)) {
            this.formData.userIds.push(userIds[i])
          }
        }
      } else {
        // 删除formData.userIds
        $(el).html('+')
        this.formData.userIds = this.formData.userIds.filter(t => !this.in_array(t, userIds))
      }
    },
    submitUser: function () {
      if (this.formData.userIds.length < 1) {
        alert('请先选择人员，再创建组')
      } else {
        this.panelShow.setGroupShow = true
      }
    },
    submitGroup: function () {
      if (this.formData.userIds.length < 1) {
        alert('请先选择人员，再创建组')
        return false
      } else if (this.formData.groupName === '') {
        this.placeholder = '请输入分组名称，再提交'
        return false
      }
      this.formData.groupType = this.groupType
      this.$emit('createGroupEvent', this.formData)
    },
    in_array: function (search, array) {
      for (var i in array) {
        if (array[i] === search) {
          return true
        }
      }
      return false
    },
    delUser: function (uid) {
      this.formData.userIds = this.formData.userIds.filter(t => t !== uid)
    },
    drag: function (ev) {
      var oDiv = document.getElementById('vu_div')
      var oEvt = ev || event
      var disX = oEvt.clientX - oDiv.offsetLeft
      var disY = oEvt.clientY - oDiv.offsetTop
      document.onmousemove = function (ev) {
        var oEvt = ev || event
        var l = oEvt.clientX - disX // 计算
        var t = oEvt.clientY - disY
        // 限定
        if (l < 5) l = 0
        if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
          l = document.documentElement.clientWidth - oDiv.offsetWidth
        }
        if (t < 5) t = 0
        if (t > document.documentElement.clientHeight - oDiv.offsetHeight - 50) {
          t = document.documentElement.clientHeight - oDiv.offsetHeight
        }
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function () {
        document.onmouseup = document.onmousemove = null
        oDiv.releaseCapture && oDiv.releaseCapture()
      }
      oDiv.setCapture && oDiv.setCapture()
      return false
    },
    jinzhi: function (ev) {
      ev.stopPropagation()
    },
    // 折叠
    accordion: function (ev) {
      var _this = $(event.currentTarget)
      _this.next('ul').slideToggle()
      _this.parent('li').toggleClass('vu_open')
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
