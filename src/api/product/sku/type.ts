export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SkuImageModel {
  id: number
  skuId: number
  imgName: string
  imgUrl: string
  spuImgId: number
  isDefault: string
}

export type SkuImageList = SkuImageModel[]

export interface skuAttrValueModel {
  id: number
  skuId: number
  attrId: number
  valueId: number
  attrName: string
  valueName: string
}

export type skuAttrValueList = skuAttrValueModel[]

export interface skuSaleAttrValueModel {
  id: number
  skuId: number
  spuId: number
  saleAttrValueId: number
  saleAttrId: number
  saleAttrName: string
  saleAttrValueName: string
}

export type skuSaleAttrValueList = skuSaleAttrValueModel[]

export interface Records {
  id: number
  spuId: number
  price: number
  skuName: string
  skuDesc: string
  weight: string
  tmId: number
  category3Id: string | number
  skuDefaultImg: string
  isSale: number
  skuImageList?: SkuImageList
  skuAttrValueList?: skuAttrValueList
  skuSaleAttrValueList?: skuSaleAttrValueList
}

export type records = Records[]

export interface ReqSkuInfoModel extends ResponseData {
  data: {
    records: records
    total: number
    size: number
    current: number
  }
}

export interface ReqSkuInfoData extends ResponseData {
  data: {
    records: records
  }
}
