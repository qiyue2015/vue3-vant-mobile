// 通过 url 获取 uniacid
export function getUniacid(): string | null {
  return window.location.pathname.match(/^\/(\d+)/)?.[1] || null
}

export function isWeixinBrowser(): boolean {
  return navigator.userAgent.toLowerCase().includes('micromessenger')
}

// 获取历史记录
export function getHistory(): string[] {
  return JSON.parse(localStorage.getItem(`history-${getUniacid()}`) || '[]')
}

// 设置历史记录
export function setHistory(item: any): void {
  const history = getHistory()
  history.unshift(item)

  // 如果超过 50 条，移除多余的记录
  if (history.length > 50) {
    history.splice(50)
  }

  localStorage.setItem(`history-${getUniacid()}`, JSON.stringify(history))
}
