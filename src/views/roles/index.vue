<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">角色管理</h2>
      <el-button type="primary" @click="openAddDialog">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新增角色
      </el-button>
    </div>

    <div class="card">
      <el-table :data="roleList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="permissions" label="权限">
          <template #default="scope">
            <el-tag 
              v-for="(perm, index) in scope.row.permissions.slice(0, 3)" 
              :key="index" 
              size="small"
              type="info"
            >
              {{ getPermissionName(perm) }}
            </el-tag>
            <span v-if="scope.row.permissions.length > 3">
              等{{ scope.row.permissions.length }}项
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form ref="roleFormRef" :model="roleForm" :rules="formRules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色标识" prop="code">
          <el-input v-model="roleForm.code" placeholder="请输入角色标识（英文）" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input 
            v-model="roleForm.description" 
            type="textarea" 
            placeholder="请输入角色描述"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="roleForm.permissions">
            <el-checkbox v-for="perm in permissionOptions" :key="perm.value" :label="perm.value">
              {{ perm.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
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

const roleList = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const isEdit = ref(false)
const roleFormRef = ref(null)

const roleForm = reactive({
  id: null,
  name: '',
  code: '',
  description: '',
  permissions: []
})

const formRules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入角色标识', trigger: 'blur' },
    { pattern: /^[a-z]+$/, message: '角色标识只能包含小写字母', trigger: 'blur' }
  ]
}

const permissionOptions = [
  { value: 'users:view', label: '用户查看' },
  { value: 'users:add', label: '用户新增' },
  { value: 'users:edit', label: '用户编辑' },
  { value: 'users:delete', label: '用户删除' },
  { value: 'roles:view', label: '角色查看' },
  { value: 'roles:add', label: '角色新增' },
  { value: 'roles:edit', label: '角色编辑' },
  { value: 'roles:delete', label: '角色删除' },
  { value: 'settings:view', label: '设置查看' },
  { value: 'settings:edit', label: '设置编辑' }
]

onMounted(() => {
  loadRoles()
})

function loadRoles() {
  const result = mockApi.getRoles()
  if (result.code === 200) {
    roleList.value = result.data.list
  }
}

function openAddDialog() {
  isEdit.value = false
  dialogTitle.value = '新增角色'
  resetForm()
  dialogVisible.value = true
}

function openEditDialog(row) {
  isEdit.value = true
  dialogTitle.value = '编辑角色'
  Object.assign(roleForm, row)
  dialogVisible.value = true
}

function resetForm() {
  roleForm.id = null
  roleForm.name = ''
  roleForm.code = ''
  roleForm.description = ''
  roleForm.permissions = []
}

async function saveRole() {
  const valid = await roleFormRef.value.validate()
  if (!valid) return

  try {
    let result
    if (isEdit.value) {
      result = mockApi.updateRole(roleForm.id, roleForm)
    } else {
      result = mockApi.createRole(roleForm)
    }

    if (result.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadRoles()
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

function deleteRole(row) {
  ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const result = mockApi.deleteRole(row.id)
    if (result.code === 200) {
      ElMessage.success('删除成功')
      loadRoles()
    } else {
      ElMessage.error(result.message)
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

function getPermissionName(perm) {
  const option = permissionOptions.find(item => item.value === perm)
  return option ? option.label : perm
}
</script>

<style scoped>
</style>