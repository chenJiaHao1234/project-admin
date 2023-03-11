import { reqTradeMarkList, reqDelTradeMark, reqAddTradeMark, reqChangeTradeMark } from "@/api/product/tradeMark"
const tradeMark = {
    state: {
        tradeMarkList: {}
    },
    getters: {
        records(state) {
            return state.tradeMarkList.records || []
        }
    },
    mutations: {
        TRADEMARKLIST(state, data) {
            state.tradeMarkList = data
        }
    },
    actions: {
        // 请求商标列表
        async tradeMarkList(context, {page, limit}) {
            let result = await reqTradeMarkList(page, limit)
            console.log(result);
            if(result.code == 200) {
                context.commit('TRADEMARKLIST', result.data)
            }
        },

        // 请求删除某个商标
        async delTradeMark(context, id) {
            // console.log(id);
            let result = await reqDelTradeMark(id)
            console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new error('删除失败'))
            }

        },

        // 请求添加某个商标
        async addTradeMark(context, {tmName, logoUrl}) {
            console.log(tmName, logoUrl);
            let result = await reqAddTradeMark({tmName, logoUrl})
            console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new error('faile'))
            }
        },

        // 请求修改某个商标
        async changeTradeMark(context, {id, tmName, logoUrl}) {
            let result = await reqChangeTradeMark({id, tmName, logoUrl})
            console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new error('faile'))
            }
        }
    }
}
export default tradeMark