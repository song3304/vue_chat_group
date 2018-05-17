import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import friendList from '@/components/FriendList'
import chatdialog from '@/components/ChatDialog'
import historylist from '@/components/HistoryList'
import groupdialog from '@/components/GroupDialog'

Vue.use(Router)

export default new Router({
  routes: [
  {
	    path: '/',
	    name: 'index',
	    component: index
	  },
    {
      path: '/friendList',
      name: 'friendList',
      component: friendList
    },
    {
      path: '/chatdialog',
      name: 'chatdialog',
      component: chatdialog
    },
    {
      path: '/historylist',
      name: 'historylist',
      component: historylist
    },
    {
      path: '/groupdialog',
      name: 'groupdialog',
      component: groupdialog
    }
  ]
})