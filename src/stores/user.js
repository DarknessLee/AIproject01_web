import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, getUserInfoApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(username, password) {
    try {
      const response = await loginApi(username, password)
      const data = response.data
      if (data.code === 200) {
        token.value = data.data.token
        localStorage.setItem('token', token.value)
        await getUserInfo()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function getUserInfo() {
    try {
      const response = await getUserInfoApi()
      const data = response.data
      if (data.code === 200) {
        userInfo.value = data.data
      }
    } catch (error) {
      console.error('Get user info failed:', error)
    }
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    getUserInfo,
    logout
  }
})