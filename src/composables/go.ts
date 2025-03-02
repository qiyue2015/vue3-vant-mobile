import { useRouter } from 'vue-router'

function isUrl(url: string): boolean {
  return /^https?:\/\/.*/.test(url)
}

export function useNavigation() {
  const router = useRouter()

  function go(url: string | { [key: string]: any }) {
    if (typeof url === 'object') {
      const shouldReplace = url.replace === true
      if (shouldReplace) {
        router.replace(url)
      }
      else {
        router.push(url)
      }
    }
    else {
      if (url.startsWith('javas') || !url) {
        return
      }

      if (isUrl(url)) {
        window.location.href = url
      }
      else {
        if (url === 'BACK') {
          router.go(-1)
        }
        else {
          router.push({ path: url })
        }
      }
    }
  }

  return { go }
}
