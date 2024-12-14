// 通过 url 获取 uniacid
export function getUniacid(): string | null {
  return window.location.pathname.match(/^\/(\d+)/)?.[1] || null
}
