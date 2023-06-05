import request from '@/utils/request'
import type { loginFormData, loginResponseData, userInfoData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login', //POST
  LOGOUT_URL = '/admin/acl/index/logout', //POST
  USERINFO_URL = '/admin/acl/index/info', //GET
}

export function userLogin(data: loginFormData) {
  return request<any, loginResponseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  })
  // request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

export function userInfo() {
  return request<any, userInfoData>({
    url: API.USERINFO_URL,
    method: 'get',
  })
}
export function userLogOut() {
  return request<any, any>({
    url: API.LOGOUT_URL,
    method: 'post',
  })
}
