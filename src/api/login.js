import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login/check',
    method: 'post',
    data
  })
}
export function index(data) {
  return request({
    url: '/admin/news/index',
    method: 'post',
    data
  })
}
