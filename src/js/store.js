const key = 'VUE-CHAT-ENEGY-V1'

// 虚拟数据
if (!localStorage.getItem(key)) {
  let now = new Date()

  let data = {
    // 登录用户
    user: {
      id: 1,
      name: 'Coffce',
      img: '/src/images/1.jpg'
    },
    // 用户列表
    userList: {
      2: {
        id: 2,
        name: '小张',
        img: '/src/images/2.jpg',
        isOnline: false, // 是否在线
        isCalling: false // 是否来消息
      },
      3: {
        id: 3,
        name: '小王',
        img: '/src/images/1.jpg',
        isOnline: true, // 是否在线
        isCalling: false // 是否来消息
      }
    },
    // 公司列表
    companyList: [
      {
        orgId: 1,
        orgName: '华塑汇',
        userIds: [2, 3],
        isCalling: false,
        onlineCnt: 1
      },
      {
        orgId: 2,
        orgName: '汇商通',
        userIds: [3],
        isCalling: false,
        onlineCnt: 0
      }
    ],
    // 分组列表
    groupList: {
      // 普通分组
      'common': [
        {
          groupId: 1,
          groupName: '普通好友',
          userIds: [2, 3],
          isCalling: false,
          onlineCnt: 0
        },
        {
          groupId: 2,
          groupName: 'VIP客户',
          userIds: [3],
          isCalling: false,
          onlineCnt: 0
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
                userName: '小王',
                createTime: '2018-05-14 11:08:00',
                content: '我是小五'
              },
              {
                messageId: 4,
                self: true,
                userName: '小明',
                createTime: '2018-05-14 11:01:20',
                content: '这是自己说的话'
              }
            ]
          },
          {
            date: '2018-05-13',
            items: [{
              messageId: 3,
              self: false,
              userName: '小王',
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
  }
}
