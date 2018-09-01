<template>
  <div class="vu_xuan-fen" >
    <div class="vu_fen_zu vu_qun-fenzu" @mousedown="dragqun" id="vu_div-qun">
      <div class="vu_fen_zu_title">
        <span>选择群发人员</span>
        <p class="vu_fen_zu_tiyi"  @click="close" @mousedown="jinzhi"><span></span></p>
      </div>
      <div class="vu_fenzu_left vu_accordion" @mousedown="jinzhi">
        <ul class="vu_fenzu_left_ul">
          <li v-for="companyItem in companyList" :class="{'vu_accordion_li': companyItem.isCalling}">
            <div class="vu_link" @click="accordion"><i class="fa fa-caret-right"></i><span class="vu_first_title ">{{companyItem.groupName}}</span><span>{{companyItem.userIds|online(userList)}}/{{companyItem.userIds.length}}</span><p class="vu_check-all" title="点击全选" @click="checkAll($event,companyItem.userIds)">+</p></div>
            <ul class="vu_submenu vu_submenu_ul ">
              <li v-for="userItem in companyItem.userIds " :class="{'vu_submenu-name vu_submenu-newname':!in_array(userItem,formData.userIds),'vu_submenu-name vu_submenu-newname vu_current':in_array(userItem,formData.userIds)}" >
                <div class="vu_m-touxiang">
                  <img :src="userList[userItem].img" alt=" " class="{ 'vu_gray':!userList[userItem].isOnline} "/><!--//不在线，添加class=vu_gray-->
                </div>
                <a>{{userList[userItem].name}}</a>
                <i :class="{'vu_input_style vu_checkbox_bg vu_checkbox_bg_check':in_array(userItem,formData.userIds),'vu_input_style vu_checkbox_bg':!in_array(userItem,formData.userIds)}" ><input type="checkbox" name="groupUserIds" v-model="formData.userIds" :value="userList[userItem].id" ></i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="vu_fenzu_right" @mousedown="jinzhi">
        <p>已选择<span>{{formData.userIds.length}}</span>个联系人</p>
        <ul class="vu_fenzu_right_ul">
          <li v-for="uid in formData.userIds" class="vu_submenu-name vu_submenu-newname"><div class="vu_m-touxiang"><img :src="userList[uid].img" /></div> <a>{{userList[uid].name}}</a> <span @click="delUser(uid)"></span></li>
        </ul>
        <div class="vu_qunnew-que">
          <div>*请您核对群发消息内容:</div>
          <textarea class="row" id="groupHairMsg" name="groupHairMsg" v-model="groupMsg"></textarea>
        </div>
      </div>
      <br clear="all"/>
      <div class="vu_fenzu_footer">
        <button @click="sendGroupMsg" @mousedown="jinzhi">确认</button>
        <span class="vu_fen_zu_tiyi" @click="close" @mousedown="jinzhi">取消</span>
      </div>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'GroupHairMsg',
  props: ['user', 'userList', 'groupList', 'groupMsg','companyList'],
  data: function () {
    return {
      formData: {
        userIds: []
      },
      placeholder: '请输入群发内容.'
    }
  },
  methods: {
    // 关闭事件
    close: function () {
      this.$emit('closeEvent', {
        is_qun_show: false
      })
      this.formData.userIds = []
    },
    sendGroupMsg: function () {
      if (this.formData.userIds.length < 1) {
        alert('请先选择群发人员')
        return
      } else if (this.groupMsg === '') {
        alert('群发消息不能为空.')
        return
      }
      this.$emit('sendGroupMsgEvent', this.formData.userIds, this.groupMsg)
      this.formData.userIds = []
      this.close() // 关闭窗口
      this.this.groupMsg = ''
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
    dragqun: function (ev) {
      var oDiv = document.getElementById('vu_div-qun')
      var oEvt = ev || event
      var disX = oEvt.clientX - oDiv.offsetLeft
      var disY = oEvt.clientY - oDiv.offsetTop
      document.onmousemove = function (ev) {
        var oEvt = ev || event
        var l = oEvt.clientX - disX
        var t = oEvt.clientY - disY
        // 限定
        if (l < 5) l = 0
        if (l > document.documentElement.clientWidth - oDiv.offsetWidth - 50) {
          l = document.documentElement.clientWidth - oDiv.offsetWidth
        }
        if (t < 5) { t = 0 }
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
    jinzhi: function (event) {
      event.stopPropagation()
    },
    // 折叠
    accordion: function (event) {
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
  },
  mounted(){
    console.log('111',this.companyList)
  }
}
</script>
