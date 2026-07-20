export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    realName: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    role: 'admin',
    status: 1,
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    username: 'user1',
    realName: '张三',
    email: 'user1@example.com',
    phone: '13800138001',
    role: 'editor',
    status: 1,
    createTime: '2024-01-02 10:00:00'
  },
  {
    id: 3,
    username: 'user2',
    realName: '李四',
    email: 'user2@example.com',
    phone: '13800138002',
    role: 'viewer',
    status: 0,
    createTime: '2024-01-03 10:00:00'
  },
  {
    id: 4,
    username: 'user3',
    realName: '王五',
    email: 'user3@example.com',
    phone: '13800138003',
    role: 'editor',
    status: 1,
    createTime: '2024-01-04 10:00:00'
  },
  {
    id: 5,
    username: 'user4',
    realName: '赵六',
    email: 'user4@example.com',
    phone: '13800138004',
    role: 'viewer',
    status: 1,
    createTime: '2024-01-05 10:00:00'
  }
]

export const mockRoles = [
  {
    id: 1,
    name: '管理员',
    code: 'admin',
    description: '系统管理员，拥有所有权限',
    permissions: ['users:view', 'users:add', 'users:edit', 'users:delete', 'roles:view', 'roles:add', 'roles:edit', 'roles:delete', 'settings:view', 'settings:edit'],
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '编辑',
    code: 'editor',
    description: '内容编辑，拥有部分权限',
    permissions: ['users:view', 'users:add', 'users:edit'],
    createTime: '2024-01-02 10:00:00'
  },
  {
    id: 3,
    name: '查看者',
    code: 'viewer',
    description: '仅拥有查看权限',
    permissions: ['users:view', 'roles:view'],
    createTime: '2024-01-03 10:00:00'
  }
]

export const mockDashboardData = {
  totalUsers: 128,
  totalRoles: 8,
  todayLogin: 24,
  avgLoginTime: '2小时30分',
  userTrend: [12, 18, 15, 22, 19, 25, 30],
  roleDistribution: [
    { name: '管理员', value: 12 },
    { name: '编辑', value: 56 },
    { name: '查看者', value: 60 }
  ]
}