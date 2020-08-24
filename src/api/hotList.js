// 物业
import request from '@/utils/request'
// import qs from 'qs'
// 热点列表接口
export function userlists(data) {
  return request({
    url: '/admin/userlists',
    method: 'post',
    data
  })
}
