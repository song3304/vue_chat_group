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
      img: '/static/img/chat/1.jpg',
      plat: 'match',
      org_id: 32,
      company_name: 'Acompany',
      company_short_name: 'sp'
    },
    // 当前在线大厅用户列表
    onlineUserList: {
      2: {
        id: 2,
        name: '小张',
        img: require('../images/2.jpg'),
        plat: 'match',
        orgName: '撮合公司1' // 是否来消息
      },
      3: {
        id: 3,
        name: '小王',
        img: require('../images/default.png'),
        plat: 'trade',
        orgName: '撮合公司2' // 是否来消息
      }
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
    // 分组列表
    groupList: {
      // 普通分组
      'common': [
        {
          groupId: 1,
          groupName: '我的好友',
          userIds: [2, 3]
        },
        {
          groupId: 2,
          groupName: '客户',
          userIds: [3]
        }
      ],
      // 群发分组
      'groupHair': [{
        groupId: 3,
        groupName: '乙二醇群发',
        userIds: [2, 3]
      }]
    },
    // 群列表
    qunList: [
      {
        qunId: 1,
        qunName: '我的公司群',
        groupOwner: 1, // 群主id
        userIds: [2, 3]
      }
    ],
    // 会话列表
    sessionList: [
      {
        userId: 2,
        type: 'user',
        has_send_today: false,
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
        type: 'user',
        has_send_today: false,
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
      },
      {
        qunId: 3,
        type: 'qun',
        has_send_today: false,
        messages: [
          {
            userId: 3,
            messageId: 5,
            text: 'the world!',
            date: now,
            is_read: false
          },
          {
            userId: 3,
            messageId: 6,
            text: '我是小王',
            date: now,
            is_read: true
          }]
      }
    ],
    // 删除会话
    delSessionList: [
      {
        userId: 2,
        type: 'user',
        has_send_today: false,
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
      }
    ],
    // 历史记录
    historyList: {
      user: {
        2: { // 只取一周数据
          is_all: false, // 一周数据是否取完
          page: 1,
          contents: [
            {
              date: '2018-05-14',
              items: [
                {
                  messageId: 3,
                  self: false,
                  createTime: '2018-05-14 11:08:00',
                  content: '我是小五',
                  is_read: true
                },
                {
                  messageId: 4,
                  self: false,
                  createTime: '2018-05-14 11:01:20',
                  content: '这是自己说的话',
                  is_read: true
                }
              ]
            },
            {
              date: '2018-05-13',
              items: [{
                messageId: 3,
                userId: 1,
                createTime: '2018-05-13 11:08:00',
                content: '我是小五',
                is_read: true
              }]
            }
          ]
        }
      },
      qun: {
        1: { // 只取一周数据
          is_all: false, // 一周数据是否取完
          page: 1,
          contents: [
            {
              date: '2018-05-14',
              items: [
                {
                  messageId: 3,
                  self: false,
                  createTime: '2018-05-14 11:08:00',
                  content: '我是小五',
                  is_read: true
                },
                {
                  messageId: 4,
                  self: false,
                  createTime: '2018-05-14 11:01:20',
                  content: '这是自己说的话',
                  is_read: true
                }
              ]
            },
            {
              date: '2018-05-13',
              items: [{
                messageId: 3,
                userId: 1,
                createTime: '2018-05-13 11:08:00',
                content: '我是小五',
                is_read: true
              }]
            }
          ]
        }
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
    if (store.hasOwnProperty('onlineUserList')) {
      oldData.onlineUserList = store.onlineUserList
    }
    if (store.hasOwnProperty('groupList')) {
      oldData.groupList = store.groupList
    }
    if (store.hasOwnProperty('qunList')) {
      oldData.qunList = store.qunList
    }
    if (store.hasOwnProperty('sessionList')) {
      oldData.sessionList = store.sessionList
    }
    if (store.hasOwnProperty('delSessionList')) {
      oldData.delSessionList = store.delSessionList
    }
    if (store.hasOwnProperty('historyList')) {
      oldData.historyList = store.historyList
    }
    localStorage.setItem(key, JSON.stringify(oldData))
  }
}
