<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">用户管理</h2>
      <el-button type="primary" @click="openAddDialog">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新增用户
      </el-button>
    </div>

    <div class="card">
      <div class="search-bar">
        <el-input 
          v-model="searchKeyword" 
          placeholder="请输入用户名、姓名或邮箱"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter="loadUsers"
        />
        <el-button type="primary" @click="loadUsers">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>

      <el-table :data="userList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="realName" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag :type="getRoleType(scope.row.role)">
              {{ getRoleName(scope.row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch 
              :value="scope.row.status === 1" 
              @change="toggleStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          :current-page="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-dialog 
      :title="dialogTitle" 
      v-model="dialogVisible"
      width="500px"
    >
      <el-form ref="userFormRef" :model="userForm" :rules="formRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userForm.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑" value="editor" />
            <el-option label="查看者" value="viewer" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import mockApi from '@/mock'

const icons = { Plus }

const userList = ref([])
const searchKeyword = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const isEdit = ref(false)
const userFormRef = ref(null)

const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

const userForm = reactive({
  id: null,
  username: '',
  realName: '',
  password: '',
  email: '',
  phone: '',
  role: '',
  status: 1
})

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

onMounted(() => {
  loadUsers()
})

function loadUsers() {
  const result = mockApi.getUsers({
    page: pagination.page,
    size: pagination.size,
    keyword: searchKeyword.value
  })
  if (result.code === 200) {
    userList.value = result.data.list
    pagination.total = result.data.total
  }
}

function handleSizeChange(size) {
  pagination.size = size
  pagination.page = 1
  loadUsers()
}

function handleCurrentChange(page) {
  pagination.page = page
  loadUsers()
}

function resetSearch() {
  searchKeyword.value = ''
  pagination.page = 1
  loadUsers()
}

function openAddDialog() {
  isEdit.value = false
  dialogTitle.value = '新增用户'
  resetForm()
  dialogVisible.value = true
}

function openEditDialog(row) {
  isEdit.value = true
  dialogTitle.value = '编辑用户'
  Object.assign(userForm, row)
  dialogVisible.value = true
}

function resetForm() {
  userForm.id = null
  userForm.username = ''
  userForm.realName = ''
  userForm.password = ''
  userForm.email = ''
  userForm.phone = ''
  userForm.role = ''
  userForm.status = 1
}

async function saveUser() {
  const valid = await userFormRef.value.validate()
  if (!valid) return

  try {
    let result
    if (isEdit.value) {
      result = mockApi.updateUser(userForm.id, userForm)
    } else {
      result = mockApi.createUser(userForm)
    }

    if (result.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadUsers()
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

function toggleStatus(row) {
  const newStatus = row.status === 1 ? 0 : 1
  const result = mockApi.updateUser(row.id, { status: newStatus })
  if (result.code === 200) {
    row.status = newStatus
    ElMessage.success('状态已更新')
  } else {
    ElMessage.error('更新失败')
  }
}

function deleteUser(row) {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const result = mockApi.deleteUser(row.id)
    if (result.code === 200) {
      ElMessage.success('删除成功')
      loadUsers()
    } else {
      ElMessage.error(result.message)
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

function getRoleName(role) {
  const roleMap = {
    admin: '管理员',
    editor: '编辑',
    viewer: '查看者'
  }
  return roleMap[role] || role
}

function getRoleType(role) {
  const typeMap = {
    admin: 'danger',
    editor: 'primary',
    viewer: 'info'
  }
  return typeMap[role] || 'info'
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.search-bar .el-input {
  width: 300px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>