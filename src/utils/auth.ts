import { ROUTE_PATH_KEY, STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

function isLogin() {
  return !!localStorage.getItem(STORAGE_TOKEN_KEY)
}

function getToken() {
  return localStorage.getItem(STORAGE_TOKEN_KEY)
}

function setToken(token: string) {
  localStorage.setItem(STORAGE_TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(STORAGE_TOKEN_KEY)
}

// 记录用户当前路由path
// 用于在微信授权登录后，跳转到之前的页面
export function setRedirectPath(path: string) {
  localStorage.setItem(ROUTE_PATH_KEY, path)
}

// 获取用户授权后要回到的路由path
export function getRedirectPath() {
  return localStorage.getItem(ROUTE_PATH_KEY)
}

// 删除用户授权后要回到的路由path
export function removeRedirectPath() {
  localStorage.removeItem(ROUTE_PATH_KEY)
}

export { isLogin, getToken, setToken, clearToken }
