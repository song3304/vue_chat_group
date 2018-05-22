const key = 'VUE-CHAT-ENEGY-V1'

// 虚拟数据
if (!localStorage.getItem(key)) {
// if (true) {
  let now = new Date()

  let data = {
    // 登录用户
    user: {
      id: 1,
      name: 'Coffce',
      img: '/static/img/chat/1.jpg'
    },
    // 用户列表
    userList: {
      2: {
        id: 2,
        name: '小张',
        img: require('../images/2.jpg'),
        isOnline: false, // 是否在线
        isCalling: false // 是否来消息
      },
      3: {
        id: 3,
        name: '小王',
        img: require('../images/default.png'),
        isOnline: true, // 是否在线
        isCalling: false // 是否来消息
      }
    },
    // 公司列表
    companyList: [
      {
        orgId: 1,
        orgName: '华塑汇',
        userIds: [2, 3]
      },
      {
        orgId: 2,
        orgName: '汇商通',
        userIds: [3]
      }
    ],
    // 分组列表
    groupList: {
      // 普通分组
      'common': [
        {
          groupId: 1,
          groupName: '普通好友',
          userIds: [2, 3]
        },
        {
          groupId: 2,
          groupName: 'VIP客户',
          userIds: [3]
        }
      ],
      // 群发分组
      'groupHair': [{
        groupId: 3,
        groupName: '乙二醇群发',
        userIds: [2, 3],
        isCalling: false,
        onlineCnt: 0
      }]
    },
    // 会话列表
    sessionList: [
      {
        userId: 2,
        messages: [
          {
            messageId: 3,
            text: 'Hello',
            date: now,
            self: false,
            is_read: false
          },
          {
            messageId: 4,
            text: '测试',
            date: now,
            self: true,
            is_read: false
          }
        ]
      },
      {
        userId: 3,
        messages: [
          {
            messageId: 5,
            text: 'the world!',
            date: now,
            self: true,
            is_read: false
          },
          {
            messageId: 6,
            text: '我是小王',
            date: now,
            self: false,
            is_read: true
          }]
      }
    ],
    // 历史记录
    historyList: {
      2: { // 只取一周数据
        is_all: false, // 一周数据是否取完
        contents: [
          {
            date: '2018-05-14',
            items: [
              {
                messageId: 3,
                self: false,
                createTime: '2018-05-14 11:08:00',
                content: '我是小五'
              },
              {
                messageId: 4,
                self: false,
                createTime: '2018-05-14 11:01:20',
                content: '这是自己说的话'
              }
            ]
          },
          {
            date: '2018-05-13',
            items: [{
              messageId: 3,
              userId: 1,
              createTime: '2018-05-13 11:08:00',
              content: '我是小五'
            }]
          }
        ]
      }
    }
  }
  localStorage.setItem(key, JSON.stringify(data))
}
export default {
  fetch () {
    return JSON.parse(localStorage.getItem(key))
  },
  save (store) {
    localStorage.setItem(key, JSON.stringify(store))
  },
  update (store) {
    var oldData = JSON.parse(localStorage.getItem(key))
    if (store.hasOwnProperty('user')) {
      oldData.user = store.user
    }
    if (store.hasOwnProperty('userList')) {
      oldData.userList = store.userList
    }
    if (store.hasOwnProperty('companyList')) {
      oldData.companyList = store.companyList
    }
    if (store.hasOwnProperty('groupList')) {
      oldData.groupList = store.groupList
    }
    if (store.hasOwnProperty('sessionList')) {
      oldData.sessionList = store.sessionList
    }
    if (store.hasOwnProperty('historyList')) {
      oldData.historyList = store.historyList
    }
    localStorage.setItem(key, JSON.stringify(oldData))
  }
}
