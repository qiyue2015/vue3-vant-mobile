import request from '@/utils/request'

export interface LoginData {
  email: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserState {
  uid?: number
  nickname?: string
  avatar?: string
  mobile?: string
  token?: string
}

export function login(data: LoginData): Promise<any> {
  return request.post<LoginRes>('/app/index.php?c=auth&a=login&do=basic', data)
}

export function logout() {
  return request.post('/app/index.php?c=entry&m=qiyue_pro&do=auth&op=logout')
}

export function getUserInfo() {
  return request<UserState>('/app/index.php?c=entry&m=qiyue_pro&do=auth&op=me')
}

// 获取粉丝信息
export function getFansInfo() {
  return request.get('/app/index.php?c=entry&m=qiyue_pro&do=auth&op=fans')
}

export function resetPassword(): Promise<any> {
  return request.post('/user/reset-password')
}

export function register(): Promise<any> {
  return request.post('/user/register')
}

// 获取微信授权地址
export function getWechatAuthUrl(redirect: string): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_pro&do=oauth&op=redirect_uri', {
    params: {
      redirect,
    },
  })
}
