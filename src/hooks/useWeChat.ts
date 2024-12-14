export default function useWeChat() {
  const ua = navigator.userAgent.toLowerCase()
  const isWeixinBrowser = ua.includes('micromessenger')

  return {
    isWeixinBrowser,
  }
}
