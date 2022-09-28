import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块uuid-->生成一个随机字符串（不能在变了）
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {

    },
    //游客临时身份
    uuid_token: getUUID()
}
const actions = {
    //获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的结果
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据，只是返回code==200,代表这次操作成功
        //因为服务器没有返回其余数据，因此不需要vuex三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }

    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
//简化数据而生
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //state.goodsInfo初始状态为空对象，空对象的categoryView属性值undefined
        //当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了
        return state.goodsInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(steat) {
        return state.goodsInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state, actions, mutations, getters
}
