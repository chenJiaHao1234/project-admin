import { reqCategory1List, reqCategory2List, reqCategory3List, reqAttrInfoList, reqSaveAttrInfo, reqdelAttr } from "@/api/product/attr"
const attr = {
    state: {
        returnCategory1List: [],
        returnCategory2List: [],
        returnCategory3List: [],
        attrInfoList: [],
        category3Id: ''
    },
    getters: {},
    mutations: {
        // 请求一级分类列表
        CATEGORY1LIST(state, data) {
            state.returnCategory1List = data
        },
        // 请求一级分类列表
        CATEGORY2LIST(state, data) {
            state.returnCategory2List = data
        },
        // 请求一级分类列表
        CATEGORY3LIST(state, data) {
            state.returnCategory3List = data
        },
        // 请求二级分类列表数据
        CLEARRETURNCATEGORY2LIST(state) {
            state.returnCategory2List = []
        },
        // 请求二级分类列表数据
        CLEARRETURNCATEGORY3LIST(state) {
            state.returnCategory3List = []
        },
        // 分类展示信息列表(且把三级分类id存入仓库)
        ATTRINFOLIST(state, {data, category3Id}) {
            state.attrInfoList = data
            state.category3Id = category3Id
        }
    },
    actions: {
        // 请求一级分类列表
        async category1List(context) {
            let result = await reqCategory1List()
            //    console.log(result);
            if (result.code == 200) {
                context.commit('CATEGORY1LIST', result.data)
            }
        },

        // 请求二级分类列表
        async category2List(context, category1Id) {
            let result = await reqCategory2List(category1Id)
            // console.log(result);
            if (result.code == 200) {
                context.commit('CATEGORY2LIST', result.data)
            }
        },

        // 请求三级分类列表
        async category3List(context, category2Id) {
            let result = await reqCategory3List(category2Id)
            // console.log(result);
            if (result.code == 200) {
                context.commit('CATEGORY3LIST', result.data)
            }
        },

        // 分类展示信息列表(且把三级分类id存入仓库)
        async attrInfoList(context, formInline) {
            // console.log(formInline.category3Id);
            let result = await reqAttrInfoList(formInline)
            console.log(result);
            if(result.code == 200) {
                context.commit('ATTRINFOLIST', {data:result.data, category3Id:formInline.category3Id})
            }
        },

        // 修改保存属性值
        async saveAttrInfo(context, attrInfo) {
            let result = await reqSaveAttrInfo(attrInfo)
            console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        },

        // 删除某个属性(整条属性)
        async delAttr(context, attrId) {
            let result = await reqdelAttr(attrId)
            console.log(result);
            if(result.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        }
    }
}
export default attr