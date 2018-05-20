<script>
import $ from 'jquery'
export default {
  props: ['userList', 'sessionIndex', 'session', 'search', 'sessionList'],
  data: function () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    searchData: function () {
      if (this.search === '') {
        return this.sessionList
      } else {
        return this.sessionList.filter(item => this.userList[item.userId].name.indexOf(this.search) > -1)
      }
    }
  },
  methods: {
    select (value, event) {
      this.currentIndex = this.sessionList.indexOf(value)
      this.$emit('updateIndexEvent', this.currentIndex)
      // 已读处理
      var el = event.currentTarget
      $('.vu_m-list-del .vu_m-list-del-num', el).hide()
      this.$emit('toReadEvent', value)
    },
    deletePerson: function (index) {
      this.$emit('delSessionEvent', index)
      // this.sessionList.splice(index, 1)
    }
  },
  filters: {
    firstMsg: function (item) {
      if (item.messages.length > 0) {
        return item.messages[0].text
      } else {
        return ''
      }
    },
    lastTime: function (item) {
      if (item.messages.length > 0) {
        var date = new Date(item.messages[0].date)
        return date.getHours() + ':' + date.getMinutes() // + ':' + date.getSeconds()
      } else {
        return ''
      }
    },
    noReadCnt: function (item) {
      var i = 0
      for (var j = 0, lg = item.messages.length; j < lg; j++) {
        i += item.messages[j].is_read ? 0 : 1
      }
      return i
    }
  }
}
</script>

<template>
    <div class="vu_m-list">
        <ul v-if="session!=null">
            <li v-for="(item,index) in searchData" :class="{ active: session.userId === item.userId }" @click="select(item,$event)">
                <img class="vu_avatar"  width="30" height="30" :alt="userList[item.userId].name" :src="userList[item.userId].img">
                <div class="vu_m-cs-cs">
                	<p class="vu_name">{{userList[item.userId].name}}</p>
                	<p class="vu_m-xiang">{{item|firstMsg}}</p>
                </div>
                <div class="vu_m-list-del">
                	<p>{{item|lastTime}}</p>
                	<p class="vu_m-list-del-num" v-show="item.messages.some(function(i) { return !i.is_read})">{{item|noReadCnt}}</p>
                	<div class="vu_delet-li"  @click.stop="deletePerson(index)"></div>
                </div>
            </li>
          <li v-if="searchData.length < 1" style="color:#000;">

          </li>
        </ul>
    </div>
</template>

<style>
    .vu_m-list {
        li {
            padding: 12px 15px;
            cursor: pointer;
            transition: background-color .1s;
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .vu_avatar, .vu_name {
            vertical-align: middle;
        }
        .vu_avatar {
            border-radius: 2px;
        }
        .vu_name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
    }
</style>
