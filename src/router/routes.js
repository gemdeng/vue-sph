/*传统引入方式不如使用路由懒加载
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
import PaySuccess from "@/views/PaySuccess"
import Center from '@/views/Center'
//引入二级路由组件
import MyOrder from "@/views/Center/myOrder"
import GroupOrder from "@/views/Center/groupOrder"
*/

/*路由懒加载：
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})

简写成：component:() => import('./views/UserDetails')

*/

//路由配置信息
export default [
    {
        path: '/home',
        component: () => import('@/views/Home'),
        meta: { show: true }
    },
    {
        path: '/center',
        component: () => import('@/views/Center'),
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: () => import("@/views/Center/myOrder"),
            },
            {
                path: 'grouporder',
                component: () => import("@/views/Center/groupOrder"),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: "search",
        path: '/search/:keyword?',
        component: () => import("@/views/Search"),
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
        component: () => import("@/views/Detail"),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: "addcartsuccess",
        component: () => import("@/views/AddCartSuccess"),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: () => import("@/views/ShopCart"),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () => import("@/views/Trade"),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import("@/views/Pay"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import("@/views/PaySuccess"),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import("@/views/Login"),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import("@/views/Register"),
        meta: { show: false }

    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]