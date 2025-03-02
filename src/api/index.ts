import request from '@/utils/request'

export async function uploadFile(data): Promise<any> {
  return request('/app/index.php?c=utility&a=file&do=upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data', // 确保是文件上传
    },
    data,
  })
}
