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
  realname?: string
  nickname?: string
  gender?: number
  avatar?: string
  mobile?: string
  token?: string
  birthyear?: string
  birthmonth?: string
  birthday?: string
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

export function register(data: any): Promise<any> {
  data.repassword = data.password
  return request.post('/app/index.php?c=auth&a=register&do=register', data)
}

// 绑定手机号
export function bindMobile(mobile: string, code: string): Promise<any> {
  return request.post('/app/index.php?c=mc&a=bond&do=mobile', {
    mobile,
    code,
  })
}

// 获取微信授权地址
export function getWechatAuthUrl(redirect: string): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_pro&do=oauth&op=redirect_uri', {
    params: {
      redirect,
    },
  })
}

// 发送验证码
export function sendVerifyCode(phone: string): Promise<any> {
  return request.post('/app/index.php?c=entry&m=qiyue_pro&do=verify_code&op=send_code', {
    receiver: phone,
  })
}

// 验证码登录并注册
export function loginByVerifyCode(receiver: string, code: number): Promise<any> {
  return request.post('/app/index.php?c=entry&m=qiyue_pro&do=auth&op=verify_code', {
    receiver,
    code,
  })
}

// 修改头像
export function updateAvatar(avatar: string): Promise<any> {
  return request.post('/app/index.php?c=mc&a=profile&do=avatar', {
    avatar,
  })
}

// 修改基本信息
export function updateProfileIndex(data: any): Promise<any> {
  return request.post('/app/index.php?c=mc&a=profile&do=editprofile&operate=index', data)
}
