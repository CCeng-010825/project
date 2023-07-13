import request from '@/utils/request'
import { ReqSkuInfoModel, ReqSkuInfoData } from './type'
export function reqSkuList(page: number, limit: number) {
  return request<any, ReqSkuInfoModel>({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get',
  })
}

export function reqSaleSku(skuId: number) {
  return request<any, any>({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get',
  })
}

export function reqCancelSale(skuId: number) {
  return request<any, any>({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get',
  })
}

export function reqSkuInfo(skuId: number) {
  return request<any, ReqSkuInfoData>({
    url: `/admin/product/getSkuInfo/${skuId}`,
    method: 'get',
  })
}
export function reqRemoveSku(skuId: number) {
  return request<any, any>({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete',
  })
}
