import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import friendlist from '@/components/friendlist'
import hb from '@/components/dialog'
import chat from '@/components/chat'
import cap from '@/components/app'

Vue.use(Router)

export default new Router({
  routes: [
    {
	    path: '/',
	    name: 'index',
	    component: index
	  },
	  {
	    path: '/friendlist',
	    name: 'friendlist',
	    component: friendlist
	  },
	  {
	    path: '/hb',
	    name: 'hb',
	    component: hb
	  },
	  {
	    path: '/chat',
	    name: 'chat',
	    component: chat
	  },
	  {
	    path: '/cap',
	    name: 'cap',
	    component: cap
	  }
  ]
})

