// 物业
import request from '@/utils/request'
// import qs from 'qs'
// 热点列表接口
export function listshotspot(data) {
  return request({
    url: '/admin/hotspotlists',
    method: 'post',
    data
  })
}
export function addhotspot(data) {
  return request({
    url: '/admin/addhotspot',
    method: 'post',
    data
  })
}
