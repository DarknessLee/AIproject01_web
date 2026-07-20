<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">系统设置</h2>
    </div>

    <div class="settings-grid">
      <div class="setting-card">
        <h3 class="setting-title">系统信息</h3>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">系统名称</span>
            <span class="info-value">后台管理系统</span>
          </div>
          <div class="info-item">
            <span class="info-label">系统版本</span>
            <span class="info-value">v1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">技术栈</span>
            <span class="info-value">Vue3 + Element Plus</span>
          </div>
          <div class="info-item">
            <span class="info-label">运行环境</span>
            <span class="info-value">development</span>
          </div>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">安全设置</h3>
        <el-form :model="securityForm" label-width="120px">
          <el-form-item label="登录超时时间">
            <el-input-number 
              v-model="securityForm.loginTimeout" 
              :min="10" 
              :max="120" 
              :step="10"
              style="width: 150px;"
            />
            <span style="margin-left: 8px;">分钟</span>
          </el-form-item>
          <el-form-item label="密码有效期">
            <el-input-number 
              v-model="securityForm.passwordExpire" 
              :min="7" 
              :max="365" 
              :step="7"
              style="width: 150px;"
            />
            <span style="margin-left: 8px;">天</span>
          </el-form-item>
          <el-form-item label="登录失败锁定">
            <el-switch v-model="securityForm.lockOnFail" />
          </el-form-item>
          <el-form-item label="失败锁定次数">
            <el-input-number 
              v-model="securityForm.maxFailCount" 
              :min="3" 
              :max="10" 
              :step="1"
              style="width: 150px;"
            />
            <span style="margin-left: 8px;">次</span>
          </el-form-item>
        </el-form>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">基础设置</h3>
        <el-form :model="basicForm" label-width="120px">
          <el-form-item label="网站标题">
            <el-input v-model="basicForm.siteTitle" placeholder="请输入网站标题" />
          </el-form-item>
          <el-form-item label="网站Logo">
            <el-input v-model="basicForm.siteLogo" placeholder="请输入Logo地址" />
          </el-form-item>
          <el-form-item label="默认主题">
            <el-select v-model="basicForm.defaultTheme" placeholder="请选择主题">
              <el-option label="明亮主题" value="light" />
              <el-option label="暗黑主题" value="dark" />
            </el-select>
          </el-form-item>
          <el-form-item label="语言">
            <el-select v-model="basicForm.language" placeholder="请选择语言">
              <el-option label="中文" value="zh-CN" />
              <el-option label="English" value="en" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">通知设置</h3>
        <el-form :model="notificationForm" label-width="120px">
          <el-form-item label="邮件通知">
            <el-switch v-model="notificationForm.emailNotify" />
          </el-form-item>
          <el-form-item label="短信通知">
            <el-switch v-model="notificationForm.smsNotify" />
          </el-form-item>
          <el-form-item label="系统通知">
            <el-switch v-model="notificationForm.systemNotify" />
          </el-form-item>
          <el-form-item label="消息推送">
            <el-switch v-model="notificationForm.pushNotify" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="btn-group" style="margin-top: 24px;">
      <el-button type="primary" @click="saveSettings">保存设置</el-button>
      <el-button @click="resetSettings">重置</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const securityForm = reactive({
  loginTimeout: 30,
  passwordExpire: 90,
  lockOnFail: true,
  maxFailCount: 5
})

const basicForm = reactive({
  siteTitle: '后台管理系统',
  siteLogo: '',
  defaultTheme: 'light',
  language: 'zh-CN'
})

const notificationForm = reactive({
  emailNotify: true,
  smsNotify: false,
  systemNotify: true,
  pushNotify: false
})

function saveSettings() {
  ElMessage.success('设置已保存')
}

function resetSettings() {
  securityForm.loginTimeout = 30
  securityForm.passwordExpire = 90
  securityForm.lockOnFail = true
  securityForm.maxFailCount = 5

  basicForm.siteTitle = '后台管理系统'
  basicForm.siteLogo = ''
  basicForm.defaultTheme = 'light'
  basicForm.language = 'zh-CN'

  notificationForm.emailNotify = true
  notificationForm.smsNotify = false
  notificationForm.systemNotify = true
  notificationForm.pushNotify = false

  ElMessage.info('已重置为默认设置')
}
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.setting-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.setting-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #EBEEF5;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 14px;
  color: #606266;
}

.info-value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}
</style>