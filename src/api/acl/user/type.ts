export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface UserModel {
  id?: number
  name: string
  password: string
  phone: number
  updateTime: string
  createTime: string
  roleName: string
  username: string
}

export interface ReqUserModel extends ResponseData {
  data: {
    records: UserModel[]
    total: number
    sizes: number
  }
}

export interface User {
  id?: number
  name: string
  username: string
  password: string
}

export interface RoleModel {
  createTime: string
  id: number
  remark: string
  roleName: string
  updateTime: string
}

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: RoleModel[]
    allRolesList: RoleModel[]
  }
}

//给用户分配职位接口携带参数的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
