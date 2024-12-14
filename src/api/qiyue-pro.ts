import request from '@/utils/request'

// 获取站点基本配置信息
export async function queryQiyueProSetting(): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_pro&do=setting&op=base')
}

// 获取站点tabbar
export async function queryQiyueProTabbar(): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_pro&do=tabbar')
}

// 获取页面布局
export async function queryQiyueProLayout(op: string): Promise<any> {
  return request(`/app/index.php?c=entry&m=qiyue_pro&do=page&op=${op}`)
}
