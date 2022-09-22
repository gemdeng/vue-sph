//home模块的小仓库
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组，【根据接口返回值初始化】
    categoryList: [],
    //轮播图数据
    bannerList: [],
    //floor数据
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, 15)
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图数据
    async bannerList({ commit }) {
        let result = await reqBannerList()
        if (result.code == 200) {
            commit("BANNERLIST", result.data)
        }
    },
    //获取floor数据
    async floorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit("FLOORLIST", result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}