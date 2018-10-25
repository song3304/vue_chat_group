<script>
  import card from './chat_dialog/card'
  import list from './chat_dialog/list'
  import send from './chat_dialog/send'
  import message from './chat_dialog/message'
  import $ from 'jquery'

  export default {
    name: 'ChatDialog',
    props: ['user', 'userList', 'sessionList', 'sessionIndex','groupList'],
    data: function () {
      return {
        search: '',
        addFriTag:false,//添加好友标识
        verifymsg:'',//验证信息
        addTipsTag:false,//提示信息
        duihuaXiao:true,//对话框缩小按钮
        duihuaDa:false,//对话框扩大按钮
        gerenDa:false,
        gerenXiao:true,
      }
    },
    computed: {
      session: function () {
        return this.sessionList.hasOwnProperty(this.sessionIndex) ? this.sessionList[this.sessionIndex] : null
      }
    },
    components: {
      card, list, send, message
    },
    watch: {
      sessionList: {
        deep: true,
        handler () {
          // this.sessionList.length < 1 && this.close()
        }
      }
    },
    methods: {
      openVerify: function () {
        if(this.relationNew()=='加为好友'){
          this.addFriTag = !this.addFriTag
        }else{
         this.addTipsTag = true
        }
      },
      toRead: function (value) {
        var msgIds = []
        value.messages.forEach(function (item) {
          if (!item.is_read) {
            msgIds.push(item.messageId)
          }
        })
        this.$emit('toReadEvent', msgIds, value.id, value.type)
      },
      openHistory: function (uid, type) {
        this.$emit('openHistoryEvent', uid, type)
      },
      updateIndex: function (index) {
        this.$emit('updateIndexEvent', index)
      },
      delSession: function (index) {
        this.$emit('delSessionEvent', index)
      },
      todayMsg: function (session) {
        this.$emit('todayMsgEvent', session)
      },
      toChat: function (toUid, msg) {
        this.$emit('chatEvent', toUid, msg)
      },
      //添加好友
      addFriend: function (otherUid, msg) {
        this.$emit('addFriendEvent', otherUid, msg)
        this.verifymsg = ''
        this.addFriTag = false
        this.userList[otherUid].friend_type = 'verify'
      },
      //是否已发送好友
      relationNew: function () { // 关系
        if(this.userList.hasOwnProperty(this.session.id)){
          if(this.userList[this.session.id].friend_type=='friend'){
            return '已是好友'
          }else if(this.userList[this.session.id].friend_type=='verify'){
            return '已发验证'
          }else {
            return '加为好友'
          }
        }else{
          return '加为好友'
        }
      },
      tipscancel: function () {//关闭提示框
        this.addTipsTag = false
      },
      duihuada:function(){
      	this.duihuaXiao=true
      	this.duihuaDa=false
      	$('.vu_m-chatmain').css('height','25%')
      	$('.vu_xiao_main').hide()
      	this.gerenXiao=false
      	this.gerenDa=true
      	$('.vu_m-text').css('height','20%')
      	$('#vue_echart').css('height','78%')
      	var echaheight=$('#myTabContent').height()
      	if(echaheight>0){
      		$('.vue-chart-foot').css('height','29.4%')
      	}
      	
      	$('.vu_resizable').attr('id','resizable')
      	var height=$("#resizable").height()
	      $("#resizable").resizable({
	        handles: "n",
	        minHeight:height,
	        maxHeight:770
	      });
	      $('.ui-resizable-handle').show()
        $('#mytrade_form').css('height','66.8%')
        var arr=[]
        $("#resizable").resize(function(){
        	var height=$("#resizable").height()
        	arr.push(height)
        	if(arr[0]<height){
        		$('.vu_m_tubiaoxia').hide()
        	}else if(arr[0]=height){
        		$('.vu_m_tubiaoxia').show()
        	}
        })

      },
      duihuaxiao:function(){
      	this.duihuaXiao=false
      	this.duihuaDa=true
      	$('.vu_m-chatmain').css('height','5.5%')
      	$('.vu_xiao_main').show()
      	this.gerenXiao=true
      	this.gerenDa=false
      	$('.vu_m-text').css('height','100%')
      	$('#vue_echart').css('height','100%')
      	var echaheight=$('#myTabContent').height()
      	if(echaheight>0){
      		$('.vue-chart-foot').css('height','45.7%')
      	}
      	
      	$('.vu_resizable').removeAttr('id','resizable')
      	$('.ui-resizable-handle').hide()
        $('#mytrade_form').css('height','86.6%')
      }
    },
    mounted(){
      this.gerenXiao=false
      this.gerenDa=true
      $('.vu_resizable').attr('id','resizable')
      $('.ui-resizable-handle').show()
      $('#mytrade_form').css('height','66.8%')
      var arr=[]
      $("#resizable").resize(function(){
        var height=$("#resizable").height()
        arr.push(height)
        if(arr[0]<height){
          $('.vu_m_tubiaoxia').hide()
        }else if(arr[0]=height){
          $('.vu_m_tubiaoxia').show()
        }
      })

    	var height=$("#resizable").height()
      $("#resizable").resizable({
        handles: "n",
        minHeight:height,
        maxHeight:770,
      });
    }
  }
</script>

<template>
  <div class="vu_m-chatmain">
    <div class="vu_m-chat">
      <list :user-list="userList" :session="session" :sessionList="sessionList"  @updateIndexEvent="updateIndex" :search="search" @toReadEvent="toRead" @delSessionEvent="delSession" ></list>
      <div id="vu_chat" >
        <div class="vu_resizable">  <!--id="resizable"-->
        	<div class="vu_m_tubiao" @click="duihuada" v-show="duihuaDa"></div>
        	<div class="vu_m_tubiaoxia" @click="duihuaxiao" v-show="duihuaXiao"></div>
        	<div class="vu_m-na tuo_tuo" v-if="session!=null && session.type=='user'" v-show="gerenXiao">
        		<p class="vu_m-na-p">个人信息：{{session!=null ? userList[session.id].name : ''}}</p>
        	</div>
          <div class="vu_m-na tuo_tuo" v-if="session!=null && session.type=='user'" v-show="gerenDa">
            <p class="vu_m-new">个人信息</p>
            <div class="vu_m-newqun"><img :src="userList[session.id].img" alt="" /><span v-if="userList[session.id].friend_type!=='friend'"></span></div>
            <span class="vu_m-na-name">{{session!=null ? userList[session.id].name : ''}}</span>
            <p class="vu_m-new_com">公司：{{userList[session.id].company_name}}</p>
            <p class="vu_m-new_phone">电话：<span>{{userList[session.id].phone}}</span></p>
            <div class="vu_m-new_friend" v-if="userList[session.id].friend_type!=='friend'" v-show="relationNew()!='已是好友'" @click="openVerify">{{relationNew()}}</div>
          </div>
          <div class="vu_m-na tuo_tuo" v-if="session==null">
            <p class="vu_m-new">暂无消息</p>
          </div>
          <div id="No_chat"  v-if="session==null"><img src="../images/wuxinxi.png" alt="" /><p>空空如也，赶紧去找小伙伴聊天吧！</p></div>
          <div class="vu_m-main">
          	<div class="vu_xiao_main" v-if="session==null">空空如也，赶紧去找小伙伴聊天吧</div>
            <message :session="session" :user="user" :user-list="userList" @toReadEvent="toRead" @todayMsgEvent="todayMsg"></message>
            <send v-show="session!=null && session.type=='user'" :session="session" @openHistoryEvent="openHistory" @toReadEvent="toRead" @chatEvent="toChat" ></send>
          </div>

        </div>
        <div class="vue_leftlist_tan addFriLeft" v-if="session!=null && session.type=='user'" v-show="addFriTag">   <!--加好友弹窗-->
          <img v-if="userList[session.id].plat=='match'" src="../images/cuo_bg.png" alt="" /> <!--撮合公司-->
          <img v-if="userList[session.id].plat=='trade'" src="../images/jiao_bg.png" alt="" />   <!-- 贸易公司 -->
          <div class="vue_leftlist_img"><img :src="userList[session.id].img" alt="" /></div>
          <p class="vue_leftlist_line verify">{{userList[session.id].name}}</p>
          <p v-if="userList[session.id].plat=='match'" class="vue_leftlist_companycuo verify">所属公司类型：<span>撮合公司</span></p>
          <p v-if="userList[session.id].plat=='trade'" class="vue_leftlist_companyjiao verify">所属公司类型：<span>贸易公司</span></p>
          <p class="vue_leftlist_companyname">所属公司：{{userList[session.id].company_name}}</p>
          <p class="vue_leftlist_companyname">手机号：{{userList[session.id].phone||'无'}}</p>
          <textarea v-model="verifymsg" placeholder="验证信息："></textarea>
          <div class="vue_leftlist_companysz">
            <span class="vue_leftlist_companysz_yi" @click="openVerify">取消</span>
            <span class="vue_leftlist_companysz_er" @click="addFriend(session.id,verifymsg)" style="color: #4385F5;">发送</span>
            <!--<p>聊天</p>-->
          </div>
          <div class="vue_leftlist_close" @click="openVerify"><span></span></div>
        </div>
      </div>
    </div>
    <!--提示框-->
    <div class="vu_del-popup" v-show="addTipsTag" style="left:25%;top: -100%;">
      <div class="vu_fen_zu_title">
        <span>提示</span>
        <p class="vu_fen_zu_tier"  @click="tipscancel"><span></span></p>
      </div>
      <p>已发送好友验证</p>
      <div class="vu_fenzu_name_footer"><button @click="tipscancel">确认</button> <span class="vu_fen_zu_tier" @click="tipscancel">取消</span></div>
    </div>
  </div>
</template>

<style >

</style>
