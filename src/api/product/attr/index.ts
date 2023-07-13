import request from '@/utils/request'
import { AttrResponseData, AttrInfoResponseData, AttrValueData } from './type'
export function getC1() {
  return request<any, AttrResponseData>({
    url: '/admin/product/getCategory1',
    method: 'get',
  })
}

export function getC2(category1Id: number | string) {
  return request<any, AttrResponseData>({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}

export function getC3(category2Id: number | string) {
  return request<any, AttrResponseData>({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get',
  })
}

export function getAttrInfoList(
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) {
  return request<any, AttrInfoResponseData>({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })
}

export function saveAttrValue(data: AttrValueData) {
  return request<any, any>({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data,
  })
}

export function deleteAttrValue(id: number) {
  return request<any, any>({
    url: `/admin/product/deleteAttr/${id}`,
    method: 'delete',
  })
}
