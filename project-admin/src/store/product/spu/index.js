import { reqSpuList, reqdelSpu, reqGetSpuInfo, reqGetTrademarkList, reqBaseSaleAttrList, reqSpuImageList, reqUpdateSpuInfo, reqSaveSpuInfo, reqSpuSaleAttrList, reqSaveSkuInfo, reqSkuList } from "@/api/product/spu"
const spu = {
    state: {
        spuList: {},
        getSpuInfo: {},
        trademarkList: [],
        baseSaleAttrList: [],
        spuImageList: [],
        spuSaleAttrList: [],
        skuList: []
    },
    getters: {},
    mutations: {
        SPULIST(state, data) {
            state.spuList = data
        },

        GETSPUINFO(state, data) {
            state.getSpuInfo = data
        },

        // 品牌列表
        GETTRADEMARKLIST(state, data) {
            state.trademarkList = data
        },

        // 销售属性列表
        BASESALEATTRLIST(state, data) {
            state.baseSaleAttrList = data
        },

        // 图片列表
        SPUIMAGELIST(state, data) {
            state.spuImageList = data
        },

        // spu销售属性列表
        SPUSALEATTRLIST(state, data) {
            state.spuSaleAttrList = data
        },

        INQUIRESKULIST(state, data) {
            state.skuList = data
        }
    },
    actions: {
        async spuList(context, pageInfo) {
            let result = await reqSpuList(pageInfo)
            console.log(result);
            if (result.code == 200) {
                context.commit('SPULIST', result.data)
            }
        },

        // ----------------------------------删除spu按钮
        async delSpu(context, spuId) {
            let result = await reqdelSpu(spuId)
            // console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('删除失败'))
            }
        },
        
        // ----------------------------------修改或添加按钮
        async getSpuInfo(context, spuId) {
            let result = await reqGetSpuInfo(spuId)
            if (result.code == 200) {
                // result.data.spuSaleAttrList.forEach(spuSaleAttr => {
                //     spuSaleAttr.inputVisible = false
                //     spuSaleAttr.inputValue = ''
                // })
                context.commit('GETSPUINFO', result.data)
            }
        },

        // 品牌列表
        async getTrademarkList(context) {
            let result = await reqGetTrademarkList()
            // console.log(result);
            if (result.code == 200) {
                context.commit('GETTRADEMARKLIST', result.data)
            }
        },

        // 销售属性列表
        async baseSaleAttrList(context) {
            let result = await reqBaseSaleAttrList()
            // console.log(result);
            if (result.code == 200) {
                context.commit('BASESALEATTRLIST', result.data)
            }
        },

        // spu图片列表
        async spuImageList(context, spuId) {
            let result = await reqSpuImageList(spuId)
            // console.log(result);
            if (result.code == 200) {
                // 加工数据(因为elementUI展示需要的是name、url属性)
                result.data.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl 
                });
                context.commit('SPUIMAGELIST', result.data)
            }
        },

        // 添加或修改spu信息
        async updateSpuInfo(context, getSpuInfo) {
            if (getSpuInfo.id) {
                let result = await reqUpdateSpuInfo(getSpuInfo)
                // console.log(result);
                if (result.code == 200) {
                    return 'ok'
                } else {
                    return Promise.reject(new Error('faile'))
                }
            }else {
                let result = await reqSaveSpuInfo(getSpuInfo)
                // console.log(result);
                if (result.code == 200) {
                    return 'ok'
                } else {
                    return Promise.reject(new Error('faile'))
                }
            }

        },

        // ---------------------------------添加sku按钮
        // spu销售属性列表
        async spuSaleAttrList(context, spuId) {
            let result = await reqSpuSaleAttrList(spuId)
            // console.log(result);
            if(result.code == 200) {
                context.commit('SPUSALEATTRLIST', result.data) 
            }
        },

        // 保存sku信息
        async saveSkuInfo(context, skuInfo) {
            let result = await reqSaveSkuInfo(skuInfo)
            // console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('失败'))
            }
        },

        //-----------------------------------查看sku列表
        async inquireSkuList(context, spuId) {
            let result = await reqSkuList(spuId)
            console.log(result);
            if(result.code == 200) {
                context.commit('INQUIRESKULIST', result.data)
            }
        }
    }
}
export default spu