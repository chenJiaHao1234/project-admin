import request from '@/utils/request'

// 请求spu列表
export const reqSpuList = ({page, limit, category3Id}) => request({url: `/admin/product/${page}/${limit}`,  method: 'get', params:{category3Id}})

// 请求spu基本信息
export const reqGetSpuInfo = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`, method:'get'})

// 请求品牌列表
export const reqGetTrademarkList = () => request({url:'/admin/product/baseTrademark/getTrademarkList', method: 'get'})

// 请求销售属性列表 baseSaleAttrList
export const reqBaseSaleAttrList = () => request({url: '/admin/product/baseSaleAttrList', method: 'get'})

// 请求spu图片列表
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`, method: 'get'})

// 修改spu信息
export const reqUpdateSpuInfo = (data) => request({url:'/admin/product/updateSpuInfo', method:'post', data})

// 添加新spu POST /admin/product/saveSpuInfo
export const reqSaveSpuInfo = (data) => request({url:'/admin/product/saveSpuInfo', method:'post', data})

// 删除spu信息 /admin/product/deleteSpu/{spuId}
export const reqdelSpu = (spuId) => request({url: `/admin/product/deleteSpu/${spuId}`, method:'delete'})

// 添加sku
// /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get'})


export const reqSaveSkuInfo = (data) => request({url:'/admin/product/saveSkuInfo', method: 'post', data})

//  查看sku列表  /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`, method:'get'})