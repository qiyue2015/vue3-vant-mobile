import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { getUniacid } from '@/utils/index'
import { useUserStore } from '@/stores'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  withCredentials: true, // 跨域请求时发送 cookies
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  console.error('111', error)
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.message) || statusText,
      })
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  // 替换 index.php? 替换为 index.php?i=uniacid
  const uniacid = getUniacid()
  if (uniacid) {
    config.url = config.url.replace(/index\.php\?/, `index.php?i=${uniacid}&`)
  }

  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: any, config: InternalAxiosRequestConfig }) {
  // 没有登录
  if (response.data?.act && response.data.url.includes('c=auth&a=login')) {
    const userStore = useUserStore()
    userStore.logout().then(() => {})
    return Promise.reject(response.data)
  }

  const result = typeof response.data.message === 'object' ? response.data.message : response.data

  if (result.errno !== 0) {
    showNotify({ type: 'danger', message: result.message })
    console.error('result-error', result)
    return Promise.reject(result)
  }

  return result
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request
