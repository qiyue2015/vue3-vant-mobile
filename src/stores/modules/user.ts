import { defineStore } from 'pinia'
import type { LoginData, UserState } from '@/api/user'
import { getUserInfo, login as userLogin, logout as userLogout, register as userRegister } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'

const InitUserInfo = {
  uid: 0,
  nickname: '',
  realname: '',
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

  const logout = async () => {
    try {
      await userLogout()
    }
    finally {
      clearToken()
      setInfo({ ...InitUserInfo })
    }
  }

  const resetToken = () => {
    clearToken()
    setInfo({ ...InitUserInfo })
  }

  const register = async (data: any) => {
    try {
      return await userRegister(data)
    }
    catch {}
  }

  return {
    userInfo,
    info,
    login,
    logout,
    register,
    resetToken,
  }
}, {
  persist: true,
})

export default useUserStore
