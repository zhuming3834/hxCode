import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/page/home'
// import shopcar from '@/components/page/shopcar'
// import me from '@/components/page/me'
// import goodsDetail from '@/components/page/goodsDetail'
// import feedBack from '@/components/page/feedBack'
// import modifyTel from '@/components/page/modifyTel'
// import orders from '@/components/page/orders'
// import login from '@/components/page/login'
// import address from '@/components/page/address'
// import editAddress from '@/components/page/editAddress'
// import addAddress from '@/components/page/addAddress'
// import confirmOrder from '@/components/page/confirmOrder'
// import wxCode from '@/components/page/wxCode'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: "登录" },
      component: resolve => require(['@/components/page/login.vue'], resolve)
      // component: login
    },
    {
      path: '/home',
      name: 'home',
      meta: { title: "翺海商城" },
      component: resolve => require(['@/components/page/home.vue'], resolve)
      // component: home
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      meta: { title: "购物车" },
      component: resolve => require(['@/components/page/shopcar.vue'], resolve)
      // component: shopcar
    },
    {
      path: '/me',
      name: 'me',
      meta: { title: "我的" },
      component: resolve => require(['@/components/page/me.vue'], resolve)
      // component: me
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      meta: { title: "商品详情" },
      component: resolve => require(['@/components/page/goodsDetail.vue'], resolve)
      // component: goodsDetail
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      meta: { title: "意见反馈" },
      component: resolve => require(['@/components/page/feedBack.vue'], resolve)
      // component: feedBack
    },
    {
      path: '/modifyTel',
      name: 'modifyTel',
      meta: { title: "修改手机号" },
      component: resolve => require(['@/components/page/modifyTel.vue'], resolve)
      // component: modifyTel
    },
    {
      path: '/orders',
      name: 'orders',
      meta: { title: "我的订单" },
      component: resolve => require(['@/components/page/orders.vue'], resolve)
      // component: orders
    },
    {
      path: '/address',
      name: 'address',
      meta: { title: "收货地址" },
      component: resolve => require(['@/components/page/address.vue'], resolve)
      // component: address
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      meta: { title: "编辑地址" },
      component: resolve => require(['@/components/page/editAddress.vue'], resolve)
      // component: editAddress
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      meta: { title: "新增地址" },
      component: resolve => require(['@/components/page/addAddress.vue'], resolve)
      // component: addAddress
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      meta: { title: "确认订单" },
      component: resolve => require(['@/components/page/confirmOrder.vue'], resolve)
      // component: confirmOrder
    },
    {
      path: '/coupon',
      name: 'coupon',
      meta: { title: "我的优惠券" },
      component: resolve => require(['@/components/page/coupon.vue'], resolve)
    },
    {
      path: '/exchange',
      name: 'exchange',
      meta: { title: "兑换" },
      component: resolve => require(['@/components/page/exchange.vue'], resolve)
    }
  ]
})
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})
export default router
