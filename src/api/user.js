import request from '@/utils/request'

export function loginApi(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfoApi() {
  return request({
    url: '/auth/userinfo',
    method: 'get'
  })
}

export function getUsersApi(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function getUserApi(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

export function createUserApi(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUserApi(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

export function deleteUserApi(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}