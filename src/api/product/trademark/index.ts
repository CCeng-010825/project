import request from '@/utils/request'
import { tradeMarkData, recordData } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove',
}

export function getTradeMark(page: number, limit: number) {
  return request<any, tradeMarkData>({
    url: `${API.TRADEMARK_URL}/${page}/${limit}`,
    method: 'get',
  })
}

// export function addTradeMark(data: recordData) {
//   return request({
//     url: API.ADDTRADEMARK_URL,
//     method: 'post',
//     data,
//   })
// }

// export function updateTradeMark(data: recordData) {
//   return request({
//     url: API.UPDATE_TRADEMARK_URL,
//     method: 'put',
//     data,
//   })
// }

export function removeTradeMark(id: number) {
  return request({
    url: `${API.DELETE_URL}/${id}`,
    method: 'delete',
  })
}

export function addOrUpdateTradeMark(data: recordData) {
  if (data.id) {
    return request({
      url: API.UPDATE_TRADEMARK_URL,
      method: 'put',
      data,
    })
  } else {
    return request({
      url: API.ADDTRADEMARK_URL,
      method: 'post',
      data,
    })
  }
}
