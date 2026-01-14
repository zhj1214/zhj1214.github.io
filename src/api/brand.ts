import http from './http'

/**
 * 获取个人品牌聚合数据
 */
export const getBrandData = (): Promise<any> => {
  return http.get('/brand')
}

/**
 * 提交咨询意向
 */
export const submitInquiry = (data: any): Promise<any> => {
  return http.post('/brand/inquiry', data)
}
