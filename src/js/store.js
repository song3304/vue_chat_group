const key = 'VUE-CHAT-ENEGY-V2'

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
    // 盯盘人员
    followList: [2, 3, 4],
    // 默认群发人员
    groupHairUsers: [2, 3],
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

    ],
    // verify消息
    verifyMsg: [
      // {// 发送验证给别人
      //   id: 1, // 验证消息id
      //   uid: 53,
      //   to_uid: 72,
      //   user_info: {
      //     id: 53,
      //     company_name: '化塑汇',
      //     company_short_name: '化塑汇',
      //     img: '2018/05/30/714937762a921426422efb4382e4bce3.png',
      //     nickname: '化塑汇',
      //     org_id: 32,
      //     phone: '15234060911',
      //     realname: 'huasuhui',
      //     system_type: 2
      //   },
      //   to_user_info: {
      //     id: 72, // 用户id
      //     company_name: '化商通',
      //     company_short_name: '化商通',
      //     img: '2018/05/25/c1a33aa432740914d197709a397a1cdb.png',
      //     nickname: '共赢',
      //     org_id: 42, // 公司id
      //     phone: '17521091706',
      //     realname: '李广怀',
      //     system_type: 2
      //   }
      // },
      // {// 别人发送验证给自己
      //   id: 2,
      //   uid: 80,
      //   to_uid: 50,
      //   user_info: {
      //     id: 80,
      //     company_name: '上海哲话投资管理有限公司',
      //     company_short_name: '哲话',
      //     img: null,
      //     nickname: '哲话',
      //     org_id: 44,
      //     phone: '13916597115',
      //     realname: '哲话色放',
      //     system_type: 2
      //   },
      //   to_user_info: {
      //     company_name: '化塑汇',
      //     company_short_name: '化塑汇',
      //     id: 53,
      //     img: '2018/05/30/714937762a921426422efb4382e4bce3.png',
      //     nickname: '化塑汇',
      //     org_id: 32,
      //     phone: '15234060911',
      //     realname: 'huasuhui',
      //     system_type: 2
      //   }
      // }
    ],
    // 会话列表
    sessionList: [
      {
        id: 2,
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
        id: 3,
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
        id: 3,
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
        id: 2,
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
    if (store.hasOwnProperty('verifyMsg')) {
      oldData.verifyMsg = store.verifyMsg
    }
    if (store.hasOwnProperty('followList')) {
      oldData.followList = store.followList
    }
    if (store.hasOwnProperty('groupHairUsers')) {
      oldData.groupHairUsers = store.groupHairUsers
    }
    if (store.hasOwnProperty('companyList')) {
      oldData.companyList = store.companyList
    }
    localStorage.setItem(key, JSON.stringify(oldData))
  }
}
