<template>
  <div class="layout-container">
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-logo">
        <h2 v-show="!sidebarCollapsed">后台管理</h2>
        <span v-show="sidebarCollapsed" class="logo-icon">MG</span>
      </div>
      <nav class="sidebar-nav">
        <el-menu 
          :default-active="activeMenu" 
          :collapse="sidebarCollapsed"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          router
        >
          <el-menu-item index="/dashboard">
            <el-icon><component :is="icons.Odometer" /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon><component :is="icons.User" /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon><component :is="icons.UserFilled" /></el-icon>
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <el-icon><component :is="icons.Setting" /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </nav>
    </aside>
    <main class="main-content">
      <header class="header">
        <div class="header-left">
          <el-button @click="sidebarCollapsed = !sidebarCollapsed" class="toggle-btn">
            <el-icon><component :is="sidebarCollapsed ? icons.Expand : icons.Fold" /></el-icon>
          </el-button>
          <span class="breadcrumb">
            {{ currentPageTitle }}
          </span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-icon><component :is="icons.User" /></el-icon>
              <span>{{ userStore.userInfo?.realName || '用户' }}</span>
              <el-icon><component :is="icons.ArrowDown" /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { 
  Odometer, 
  User, 
  UserFilled, 
  Setting, 
  Fold, 
  Expand, 
  ArrowDown 
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const sidebarCollapsed = ref(false)

const icons = {
  Odometer,
  User,
  UserFilled,
  Setting,
  Fold,
  Expand,
  ArrowDown
}

const activeMenu = computed(() => route.path)

const currentPageTitle = computed(() => route.meta.title || '')

function handleCommand(command) {
  if (command === 'logout') {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background: #304156;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b3a4a;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: #409EFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.sidebar-nav {
  padding-top: 20px;
}

.sidebar-nav :deep(.el-menu) {
  border-right: none;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #EBEEF5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #F5F7FA;
  cursor: pointer;
}

.toggle-btn:hover {
  background: #E4E7ED;
}

.breadcrumb {
  font-size: 14px;
  color: #606266;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
}

.user-info:hover {
  background: #F5F7FA;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  background: #F5F7FA;
}
</style>