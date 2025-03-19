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

// 记录用户当前路由
// 用于在微信授权登录后，跳转到之前的页面
function setRedirectParam(path: string, query: object) {
  localStorage.setItem(ROUTE_PATH_KEY, JSON.stringify({ path, query }))
}

// 获取用户授权后要回到的路由path
function getRedirectParam() {
  const data = localStorage.getItem(ROUTE_PATH_KEY)
  if (data) {
    return JSON.parse(data)
  }
}

// 删除用户授权后要回到的路由path
function removeRedirectParam() {
  localStorage.removeItem(ROUTE_PATH_KEY)
}

export { isLogin, getToken, setToken, clearToken, getRedirectParam, setRedirectParam, removeRedirectParam }
