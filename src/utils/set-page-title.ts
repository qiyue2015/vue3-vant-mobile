import { appName } from '@/constants'

const titles: Record<string, string> = {
  Home: '主页',
  Profile: '我的',
  Mock: '🗂️ Mock',
  Charts: '📊 图表',
  UnoCSS: '⚡ UnoCSS',
  Counter: '🍍 状态持久化',
  KeepAlive: '♻️ 页面缓存',
  ScrollCache: '📍 滚动缓存',
  Login: '🧑‍💻 登录',
  Register: '🧑‍💻 注册',
  ForgotPassword: '❓ 忘记密码',
  Settings: '⚙️ 设置',
  404: '⚠️ 404 页面',
}

export default function setPageTitle(name?: string): void {
  if (name && titles[name]) {
    window.document.title = `${titles[name]} - ${appName()}`
  }
  else {
    window.document.title = appName()
  }
}
