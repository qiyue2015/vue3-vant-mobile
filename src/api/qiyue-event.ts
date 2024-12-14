import request from '@/utils/request'

export async function queryQiyueEventList(params: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=event&op=list', {
    params,
  })
}
