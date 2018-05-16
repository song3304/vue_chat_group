const key = 'VUE-CHAT-ENEGY-V1'

// 虚拟数据
if (!localStorage.getItem(key)) {
  let now = new Date()

  let data = {
    // 登录用户
    user: {
      id: 1,
      name: 'Coffce',
      img: 'dist/images/1.jpg'
    },
    // 用户列表
    userList: {
      2: {
        id: 2,
        name: '站长素材',
        img: 'dist/images/2.png',
        isOnline: false, // 是否在线
        isCalling: false // 是否来消息
      },
      3: {
        id: 3,
        name: 'webpack',
        img: 'dist/images/3.jpg',
        isOnline: false, // 是否在线
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
        onlineCnt: 0
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
            text: 'Hello，这是一个基于Vue+Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的基础特性和webpack配置。',
            date: now,
            is_read: false
          },
          {
            text: '项目地址:https://sc.chinaz.com/jiaoben/',
            date: now,
            is_read: false
          }
        ]
      },
      {
        userId: 3,
        messages: []
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
                userId: 2,
                userName: '小王',
                createTime: '2018-05-14 11:08:00',
                content: '我是小五'
              },
              {
                messageId: 4,
                userId: 1,
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
              userId: 1,
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
