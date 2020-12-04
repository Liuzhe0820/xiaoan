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
export function orderlistss(data) { // 订单列表
  return request({
    url: '/admin/orderlistss',
    method: 'post',
    data
  })
}
export function deletecorder(data) { // 订单删除
  return request({
    url: '/admin/deletecorder',
    method: 'post',
    data
  })
}
