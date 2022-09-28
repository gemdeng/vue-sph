//引入路由组件
import Home from "@/views/Home"
import Search from "@/views/Search"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Detail from "@/views/Detail"
import AddCartSuccess from "@/views/AddCartSuccess"
import ShopCart from "@/views/ShopCart"
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
//路由配置信息
export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        name: "search",
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        //路由组合能不能传递props数据？
        //布尔值写法
        // props: true
        // 对象写法
        // props: { a: 1, b: 2 }
        // 函数写法：可以parmas参数、query参数，通过props传递给路由组件
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }

    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]