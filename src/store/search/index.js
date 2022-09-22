import { reqSearchInfo } from "@/api"
//search模块的小仓库
const state = {
    searchList: {}
}
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }

}
const actions = {
    // 获取search模块的数据
    async SearchList({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            commit('SEARCHLIST', result.data)
        }
    }
}
//项目中getters主要的作用是：简化仓库中的数据(简化数据而生)
// 可以吧我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    //当前形参state,当前仓库中的state,并非大仓库中的那个state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList() {
        return state.searchList.trademarkList || []
    },
    attrsList() {
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}