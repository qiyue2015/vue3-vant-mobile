import { defineStore } from 'pinia'
import type { LoginData, UserState } from '@/api/user'
import { getFansInfo, getUserInfo, resetPassword, login as userLogin, logout as userLogout, register as userRegister, getWechatAuthUrl as wechatAuth } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'

const InitUserInfo = {
  uid: 0,
  nickname: '',
  avatar: '',
  token: '',
  mobile: '',
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserState>({ ...InitUserInfo })

  // Set user's information
  const setInfo = (partial: Partial<UserState>) => {
    userInfo.value = { ...partial }
  }

  const login = async (loginForm: LoginData) => {
    try {
      await userLogin(loginForm)
      const { data } = await getUserInfo()
      setToken(data.token)
      setInfo(data)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  const info = async () => {
    const { data } = await getUserInfo()
    setToken(data.token)
    setInfo(data)
  }

  const fans = async () => {
    const { data } = await getFansInfo()
    return data
  }

  const logout = async () => {
    try {
      await userLogout()
    }
    finally {
      clearToken()
      setInfo({ ...InitUserInfo })
    }
  }

  const getWechatAuthUrl = async (url: string) => {
    const { data } = await wechatAuth(url)
    return data
  }

  const reset = async () => {
    try {
      return await resetPassword()
    }
    catch {}
  }

  const register = async () => {
    try {
      const data = await userRegister()
      return data
    }
    catch {}
  }

  return {
    userInfo,
    fans,
    info,
    login,
    logout,
    reset,
    register,
    getWechatAuthUrl,
  }
}, {
  persist: true,
})

export default useUserStore
