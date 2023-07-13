export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface categoryObj {
  name: string
  id: number
  category1Id?: number
  category2Id?: number
}

export interface AttrResponseData extends ResponseData {
  data: categoryObj[]
}

export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface AttrValueData {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number | string
  attrValueList: AttrValue[]
}

export interface AttrInfoResponseData extends ResponseData {
  data: AttrValueData[]
}

// export interface attrValueInfo {
//   attrName: string
//   attrValueList: AttrValue[]
//   categoryId: number
//   categoryLevel: number
//   id: number
// }
