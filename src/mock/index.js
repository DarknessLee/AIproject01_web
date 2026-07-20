import { mockUsers, mockRoles, mockDashboardData } from './data'

let userIdCounter = 6
let roleIdCounter = 4

const mockApi = {
  login: (username, password) => {
    if ((username === 'admin' && password === '123456') || (username === 'user' && password === '123456')) {
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-' + Date.now()
        }
      }
    }
    return {
      code: 401,
      message: '用户名或密码错误'
    }
  },

  getUserInfo: () => {
    return {
      code: 200,
      message: '获取成功',
      data: {
        id: 1,
        username: 'admin',
        realName: '管理员',
        role: 'admin',
        avatar: ''
      }
    }
  },

  getUsers: (params) => {
    let data = [...mockUsers]
    const { page, size, keyword } = params

    if (keyword) {
      data = data.filter(item => 
        item.username.includes(keyword) || 
        item.realName.includes(keyword) ||
        item.email.includes(keyword)
      )
    }

    const start = (page - 1) * size
    const end = start + size
    const paginatedData = data.slice(start, end)

    return {
      code: 200,
      message: '获取成功',
      data: {
        list: paginatedData,
        total: data.length,
        page,
        size
      }
    }
  },

  getUser: (id) => {
    const user = mockUsers.find(item => item.id === parseInt(id))
    if (user) {
      return {
        code: 200,
        message: '获取成功',
        data: user
      }
    }
    return {
      code: 404,
      message: '用户不存在'
    }
  },

  createUser: (data) => {
    const newUser = {
      id: userIdCounter++,
      ...data,
      status: data.status || 1,
      createTime: new Date().toLocaleString('zh-CN')
    }
    mockUsers.push(newUser)
    return {
      code: 200,
      message: '创建成功',
      data: newUser
    }
  },

  updateUser: (id, data) => {
    const index = mockUsers.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...data }
      return {
        code: 200,
        message: '更新成功',
        data: mockUsers[index]
      }
    }
    return {
      code: 404,
      message: '用户不存在'
    }
  },

  deleteUser: (id) => {
    const index = mockUsers.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      mockUsers.splice(index, 1)
      return {
        code: 200,
        message: '删除成功'
      }
    }
    return {
      code: 404,
      message: '用户不存在'
    }
  },

  getRoles: () => {
    return {
      code: 200,
      message: '获取成功',
      data: {
        list: mockRoles,
        total: mockRoles.length
      }
    }
  },

  getRole: (id) => {
    const role = mockRoles.find(item => item.id === parseInt(id))
    if (role) {
      return {
        code: 200,
        message: '获取成功',
        data: role
      }
    }
    return {
      code: 404,
      message: '角色不存在'
    }
  },

  createRole: (data) => {
    const newRole = {
      id: roleIdCounter++,
      ...data,
      createTime: new Date().toLocaleString('zh-CN')
    }
    mockRoles.push(newRole)
    return {
      code: 200,
      message: '创建成功',
      data: newRole
    }
  },

  updateRole: (id, data) => {
    const index = mockRoles.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      mockRoles[index] = { ...mockRoles[index], ...data }
      return {
        code: 200,
        message: '更新成功',
        data: mockRoles[index]
      }
    }
    return {
      code: 404,
      message: '角色不存在'
    }
  },

  deleteRole: (id) => {
    const index = mockRoles.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
      mockRoles.splice(index, 1)
      return {
        code: 200,
        message: '删除成功'
      }
    }
    return {
      code: 404,
      message: '角色不存在'
    }
  },

  getDashboard: () => {
    return {
      code: 200,
      message: '获取成功',
      data: mockDashboardData
    }
  }
}

export default mockApi