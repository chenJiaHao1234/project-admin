import request from '@/utils/request'

// 请求展示的商标列表
export const reqTradeMarkList = (page, limit) => request({url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get'})

// 请求删除某个商标
export const reqDelTradeMark = (id) => request({url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'})

// 请求修改某个商标
export const reqChangeTradeMark = (data) => request({url: '/admin/product/baseTrademark/update', method: 'put', data})

// 请求添加某个商标
export const reqAddTradeMark = (data) => request({url: '/admin/product/baseTrademark/save', method: 'post', data})