// 物业
import request from '@/utils/request'
import qs from 'qs'
// 用户列表接口
export function userlists(data) {
  return request({
    url: '/admin/userlists',
    method: 'post',
    data
  })
}
// 物业角色列表接口
export function prorolelists(data) {
  return request({
    url: '/admin/prorolelists',
    method: 'post',
    data
  })
}
// 添加物业角色
export function addrole(data) {
  return request({
    url: '/admin/addrole',
    method: 'post',
    data
  })
}
// 绑定物业角色
export function adduserrole(data) {
  return request({
    url: '/admin/adduserrole',
    method: 'post',
    data: qs.stringify(data)
  })
}
