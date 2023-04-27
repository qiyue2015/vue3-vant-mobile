import type { AxiosRequestConfig } from 'axios'
import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}

export async function queryStoreCategories(): Promise<any> {
  return request('/store/categories')
}

export async function queryActivities(params): Promise<any> {
  const config: AxiosRequestConfig = { params }
  return request.get('/activities', config)
}

export async function queryActivityDetail(id, storeId): Promise<any> {
  return request(`/activities/${id}/${storeId}`)
}

export async function queryStores(params): Promise<any> {
  const config: AxiosRequestConfig = { params }
  return request.get('/stores', config)
}

export async function queryStoreDetail(id): Promise<any> {
  return request(`/stores/${id}`)
}

export async function queryProducts(params): Promise<any> {
  const config: AxiosRequestConfig = { params }
  return request('/products', config)
}

export async function queryProductDetail(id): Promise<any> {
  return request(`/products/${id}`)
}

export async function queryProductCategories(): Promise<any> {
  return request('/product/categories')
}

export async function queryArticles(): Promise<any> {
  return request('/articles')
}
