export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface recordData {
  id?: number
  tmName: string
  logoUrl: string
}

export type Record = recordData[]

export interface tradeMarkData extends responseData {
  data: {
    records: Record
    total: number
    size: string
    current: string
    pages: string
    searchCount: boolean
  }
}
