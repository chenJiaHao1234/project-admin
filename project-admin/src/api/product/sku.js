import request from '@/utils/request'

export const reqSkuList = ({page, limit}) => request({url:`/admin/product/list/${page}/${limit}`, method:'get'})

// 上架 GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`, method: 'get'})

// 下架
export const reqCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`, method: 'get'})

// 查看详细信息 /admin/product/getSkuById/{skuId}
export const reqGetSkuById = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})

// 删除sku
export const reqDelSku = (skuId) => request({url:`/admin/product/deleteSku/${skuId}`,method:'delete'})