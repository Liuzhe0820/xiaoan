import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/News/check',
    method: 'post',
    data
  })
}