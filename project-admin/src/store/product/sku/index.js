import { reqSkuList, reqOnSale, reqCancelSale, reqGetSkuById, reqDelSku } from "@/api/product/sku";
const sku = {
    state: {
        skuList: {},
        skuDetailInfo: {}
    },
    getters: {},
    mutations: {
        SKULIST(state, data) {
            state.skuList = data
        },
        GETSKUBYID(state, data) {
            state.skuDetailInfo = data
        }
    },
    actions: {
        async skuList(context, pageInfo) {
            let result = await reqSkuList(pageInfo)
            // console.log(result);
            if(result.code == 200) {
                context.commit('SKULIST', result.data)
            }
        },
        // 上架
        async onSale(context, skuId) {
            let result = await reqOnSale(skuId)
            // console.log(result);
            if(result.code == 200) {
                return 'ok'
            }
        },
        // 下架
        async cancelSale(context, skuId) {
            let result = await reqCancelSale(skuId)
            // console.log(result);
            if(result.code == 200) {
                return 'ok'
            }
        },
        // 查看
        async getSkuById(context, skuId) {
            let result = await reqGetSkuById(skuId)
            // console.log(result);
            if(result.code == 200) {
                context.commit('GETSKUBYID', result.data)
            }
        },
        // 删除
        async delSku(context, skuId) {
            let result = await reqDelSku(skuId)
            // console.log(result);
            if(result.code == 200) {
                return 'ok'
            }
        }
    },
}
export default sku