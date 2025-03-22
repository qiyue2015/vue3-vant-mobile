import request from '@/utils/request'

export interface EventItem {
  id: string
  title: string
  logo: string
  address: string
  date_str: string
  status: number
}

export interface EventSignupItem {
  id: string
  event_id: string
  name: string
  phone: string
  status: number
  is_checkin: number
  checkin_at: string
  created_at: string
  event: EventItem
}

// 活动例表
export async function queryQiyueEventList(params?: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=event&op=list', {
    params,
  })
}

// 活动详情
export async function queryQiyueEventDetail(params?: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=event&op=detail', {
    params,
  })
}

// 提交活动报名信息
export async function qiyueEventSignup(params?: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=signup&op=post', {
    method: 'POST',
    data: params,
  })
}

// 活动签到
export async function qiyueEventCheckin(eventId: string): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=event&op=checkin', {
    method: 'POST',
    data: {
      event_id: eventId,
    },
  })
}

// 用户报名的活动列表
export async function queryUserEventList(params?: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=user&op=event_list', {
    params,
  })
}

// 绑定操作员
export async function bindOperator(params: any): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=operator&op=bind', {
    method: 'POST',
    data: params,
  })
}

// 核销报名信息
export async function checkinSignup(event_id: string, signup_id: string): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=operator&op=checkin', {
    method: 'POST',
    data: {
      event_id,
      signup_id,
    },
  })
}

// 操作员查看报名详情
export async function querySignupDetail(event_id: string, signup_id: string): Promise<any> {
  return request('/app/index.php?c=entry&m=qiyue_event&do=operator&op=signup_detail', {
    params: {
      event_id,
      signup_id,
    },
  })
}
