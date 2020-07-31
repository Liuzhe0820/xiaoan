// 商户
import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/admin/lists',
    method: 'post',
    data
  })
}
