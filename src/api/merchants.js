// 商户
import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/admin/lists',
    method: 'post',
    data
  })
}
export function examine(data) {
  return request({
    url: '/admin/examine',
    method: 'post',
    data
  })
}
export function refuse(data) {
  return request({
    url: '/admin/refuse',
    method: 'post',
    data
  })
}
