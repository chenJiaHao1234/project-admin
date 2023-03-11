import request from '@/utils/request'

// 请求一级分类列表
export const reqCategory1List = () => request({url: '/admin/product/getCategory1', method:'get'})

// 请求二级分类列表
export const reqCategory2List = (category1Id) => request({url: `/admin/product/getCategory2/${category1Id}`, method: 'get'})

// 请求三级分类列表
export const reqCategory3List = (category2Id) => request({url: `/admin/product/getCategory3/${category2Id}`, method: 'get'})

// 请求分类展示信息列表
export const reqAttrInfoList = ({category1Id, category2Id, category3Id}) => request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get'})

// 修改属性 
export const reqSaveAttrInfo = (data) => request({url: '/admin/product/saveAttrInfo', method: 'post', data})

// 删除某个属性(整条属性)
export const reqdelAttr = (attrId) => request({url: `/admin/product/deleteAttr/${attrId}`, method: 'delete'})