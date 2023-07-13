export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface tradeMark {
  id: number
  logoUrl: string
  tmName: string
}

export type tradeMarkList = tradeMark[]

export interface tradeMarkData extends ResponseData {
  data: tradeMarkList
}

export interface SpuData {
  category3Id: number | string
  description: string
  id?: number | string
  spuImageList: SpuImg[]
  spuName: string
  spuPosterList: []
  spuSaleAttrList: SkuAttrValue[]
  tmId: number | string
}

export interface HasSpuData extends ResponseData {
  //   records: SpuData[]
  data: {
    records: SpuData[]
    orders: []
    total: number
  }
}
export interface SpuImg {
  createTime: string
  id: number
  imgName: string
  imgUrl: string
  spuId: number
  updateTime: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

export interface attrValue {
  attrId: number
  id: number
  valueName: string
}

export interface saleAttrValue {
  attrName: string
  id: number
  attrValueList?: attrValue[]
}
export interface SpuSaleAttr {
  id: number
  saleAttrName: string
  saleAttrValueName: string
  spuId: number
}

export interface SkuAttrValue {
  id: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: SpuSaleAttr[]
}

export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList: saleAttrValue[]
  skuSaleAttrValueList: SkuAttrValue[]
  skuImageList: []
  skuDefaultImg: string
}
// export interface SpuImage {
//   id?: number
//   imgName: string
//   imgUrl: string
//   spuId: number
// }

// export interface ReqSpuImage extends ResponseData {
//   data: SpuImage[]
// }
export interface SaleAttr {
  id: number
  name: string
}
export interface AllSaleAttr {
  data: SaleAttr[]
}
