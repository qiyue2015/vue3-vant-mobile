import { defineStore } from 'pinia'
import type { ConfigProviderTheme } from 'vant'
import { queryQiyueProSetting, queryQiyueProTabbar } from '@/api/qiyue-pro'

export interface Account {
  uniacid: string
  name: string
  logo: string
  default_page?: string
}

export interface Menu {
  title: string
  url: string
  icon: {
    name: string
    color: string
  }
  hover_icon: {
    name: string
    color: string
  }
  image: string
  hover_image: string
}

export interface Tabbar {
  position: string
  ignore_paths: string[]
  menus: Menu[]
}

export interface AppStore {
  switchMode: (val: ConfigProviderTheme) => void
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref<ConfigProviderTheme>(theme)
  const account = ref<Account>(undefined)
  const tabbar = ref<Tabbar>(undefined)

  const switchMode = (val: ConfigProviderTheme) => {
    mode.value = val
  }

  const getSetting = async () => {
    const settingResponse = await queryQiyueProSetting()
    account.value = settingResponse.data
  }

  const getTabbar = async () => {
    const tabbarResponse = await queryQiyueProTabbar()
    tabbar.value = tabbarResponse.data
  }

  const resetSetting = () => {
    account.value = undefined
    tabbar.value = undefined
  }

  return {
    mode,
    switchMode,
    account,
    tabbar,
    getSetting,
    resetSetting,
    getTabbar,
  }
}, {
  persist: {
    pick: ['mode', 'account', 'tabbar'],
  },
})

export default useAppStore
