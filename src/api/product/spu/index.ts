import request from '@/utils/request'
import {
  HasSpuData,
  SkuData,
  tradeMarkData,
  SpuHasImg,
  AllSaleAttr,
} from './type'

export function getSpuList(
  page: number,
  limit: number,
  category3Id: string | number,
) {
  return request<any, HasSpuData>({
    url: `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
    method: 'get',
  })
}

//获取某个spu下全部销售属性
export function reqSpuHasSaleAttr(spuId: number) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get',
  })
}

// 获取某个SPU下商品的图片
export function reqSpuHasImageList(spuId: number) {
  return request<any, SpuHasImg>({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
  })
}

export function reqAddSku(data: SkuData) {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data,
  })
}

// 获取全部spu数据
export function reqAllTradeMark() {
  return request<any, tradeMarkData>({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
  })
}

export function reqAllSaleAttr() {
  return request<any, AllSaleAttr>({
    url: '/admin/product/baseSaleAttrList',
    method: 'get',
  })
}

export function reqAddOrUpdateSpu(data) {
  if (data.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data,
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data,
    })
  }
}

export function removeSpu(id: string | number) {
  return request<any, any>({
    url: `/admin/product/deleteSpu/${id}`,
    method: 'delete',
  })
}
