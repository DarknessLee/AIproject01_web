import request from '@/utils/request'

export function getRolesApi(params) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

export function getRoleApi(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

export function createRoleApi(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateRoleApi(id, data) {
  return request({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRoleApi(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}