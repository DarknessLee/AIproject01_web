<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">仪表盘</h2>
      <span class="current-date">{{ currentDate }}</span>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon user-icon">
          <el-icon><component :is="icons.User" /></el-icon>
        </div>
        <div class="stat-content">
          <p class="stat-value">{{ dashboardData.totalUsers }}</p>
          <p class="stat-label">总用户数</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon role-icon">
          <el-icon><component :is="icons.UserFilled" /></el-icon>
        </div>
        <div class="stat-content">
          <p class="stat-value">{{ dashboardData.totalRoles }}</p>
          <p class="stat-label">角色数量</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon login-icon">
          <el-icon><component :is="icons.Sunny" /></el-icon>
        </div>
        <div class="stat-content">
          <p class="stat-value">{{ dashboardData.todayLogin }}</p>
          <p class="stat-label">今日登录</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon time-icon">
          <el-icon><component :is="icons.Clock" /></el-icon>
        </div>
        <div class="stat-content">
          <p class="stat-value">{{ dashboardData.avgLoginTime }}</p>
          <p class="stat-label">平均登录时长</p>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3 class="chart-title">近7日用户增长趋势</h3>
        <div class="chart-container">
          <div class="bar-chart">
            <div 
              v-for="(value, index) in dashboardData.userTrend" 
              :key="index" 
              class="bar-item"
            >
              <div 
                class="bar" 
                :style="{ height: (value / maxTrendValue * 100) + '%' }"
              ></div>
              <span class="bar-label">{{ weekDays[index] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">角色分布</h3>
        <div class="chart-container">
          <div class="pie-chart">
            <div 
              v-for="(item, index) in dashboardData.roleDistribution" 
              :key="index" 
              class="pie-item"
              :style="{ 
                background: pieColors[index],
                width: (item.value / totalRoleValue * 100) + '%'
              }"
            ></div>
          </div>
          <div class="legend">
            <div 
              v-for="(item, index) in dashboardData.roleDistribution" 
              :key="index" 
              class="legend-item"
            >
              <span class="legend-color" :style="{ background: pieColors[index] }"></span>
              <span class="legend-text">{{ item.name }} ({{ item.value }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { User, UserFilled, Sunny, Clock } from '@element-plus/icons-vue'
import mockApi from '@/mock'

const icons = {
  User,
  UserFilled,
  Sunny,
  Clock
}

const dashboardData = ref({
  totalUsers: 0,
  totalRoles: 0,
  todayLogin: 0,
  avgLoginTime: '',
  userTrend: [],
  roleDistribution: []
})

const currentDate = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const pieColors = ['#409EFF', '#67C23A', '#E6A23C']

const maxTrendValue = computed(() => Math.max(...dashboardData.value.userTrend, 1))

const totalRoleValue = computed(() => 
  dashboardData.value.roleDistribution.reduce((sum, item) => sum + item.value, 0)
)

onMounted(() => {
  loadDashboardData()
})

function loadDashboardData() {
  const result = mockApi.getDashboard()
  if (result.code === 200) {
    dashboardData.value = result.data
  }
}
</script>

<style scoped>
.current-date {
  font-size: 14px;
  color: #909399;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.user-icon {
  background: #E8F4FD;
  color: #409EFF;
}

.role-icon {
  background: #E8F8EB;
  color: #67C23A;
}

.login-icon {
  background: #FFF7E6;
  color: #E6A23C;
}

.time-icon {
  background: #F5F0FF;
  color: #909399;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.chart-container {
  height: 200px;
}

.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 30px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
}

.bar {
  width: 32px;
  background: linear-gradient(180deg, #409EFF 0%, #83BFF6 100%);
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.pie-chart {
  display: flex;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  margin-bottom: 20px;
}

.pie-item {
  flex-shrink: 0;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-text {
  font-size: 14px;
  color: #606266;
}
</style>