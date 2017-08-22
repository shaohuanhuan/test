import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/**
 * 登录之后主路由
 * @param  {[type]} resolve [description]
 * @return {[type]}         [description]
 */
const UserIndex = resolve => require(['@/components/UserIndex'], resolve)
const OrderLogisticSub = resolve => require(['@/components/subNavBars/OrderLogisticsBar'], resolve)
const ContactSub = resolve => require(['@/components/subNavBars/ContactBar'], resolve)
const MonitorSub = resolve => require(['@/components/subNavBars/MonitorBar'], resolve)
const CustomerDevSub = resolve => require(['@/components/subNavBars/CustomerDevBar'], resolve)
const MyHomePageSub = resolve => require(['@/components/subNavBars/MyHomePageBar'], resolve)
const Contact = resolve => require(['@/views/contact/contact'], resolve)
const Login = resolve => require(['@/views/login/Login'], resolve)
const Forgot = resolve => require(['@/views/login/Forgot'], resolve)
const Register = resolve => require(['@/views/login/Register'], resolve)
const Index = resolve => require(['@/views/index/Index'], resolve)
const PageManagement = resolve => require(['@/views/myHomePage/PageManagement'], resolve)
const PagePreview = resolve => require(['@/views/myHomePage/PagePreview'], resolve)
const Explore = resolve => require(['@/views/explore/Explore'], resolve)
const PpcList = resolve => require(['@/views/explore/cpnts/ppcList'], resolve)
const PpcDetail = resolve => require(['@/views/explore/cpnts/ppcDetail'], resolve)
const Search = resolve => require(['@/views/explore/cpnts/search'], resolve)
const companyDetail = resolve => require(['@/views/explore/cpnts/companyDetail'], resolve)
const Order = resolve => require(['@/views/order/Order'], resolve)
const orderDetail = resolve => require(['@/views/order/orderDetail'], resolve)
const Product = resolve => require(['@/views/product/Product'], resolve)
const ProductModify = resolve => require(['@/views/product/Modify'], resolve)
const ProductCategory = resolve => require(['@/views/product/Category'], resolve)
const Group = resolve => require(['@/views/group/Group'], resolve)
const newsList = resolve => require(['@/views/school/newsList'], resolve)
const articleDetail = resolve => require(['@/views/school/articleDetail'], resolve)
const CreateShop = resolve => require(['@/views/register/CreateShop'], resolve)
const Certify = resolve => require(['@/views/register/cpnts/certify'], resolve)
const Back = resolve => require(['@/views/callback/back'], resolve)
const socialMonitor = resolve => require(['@/views/monitor/socialMonitor'], resolve)
const mailMonitor = resolve => require(['@/views/monitor/mailMonitor'], resolve)
const inquiryMonitor = resolve => require(['@/views/monitor/inquiryMonitor'], resolve)
const Develop = resolve => require(['@/views/develop/findCustomer'], resolve)
const SearchResult = resolve => require(['@/views/develop/findcptns/searchResult'], resolve)
const CompanyDetail = resolve => require(['@/views/develop/findcptns/companyDetail'], resolve)
const StaffDetail = resolve => require(['@/views/develop/findcptns/staffDetail'], resolve)
const Extension = resolve => require(['@/views/develop/extension'], resolve)
const SetAccount = resolve => require(['@/views/systemSetting/setAccount'], resolve)
const SetCompany = resolve => require(['@/views/systemSetting/setCompany'], resolve)
const SetKeyWord = resolve => require(['@/views/systemSetting/setKeyWord'], resolve)
const ChannelList = resolve => require(['@/views/systemSetting/channelList'], resolve)
const SystemIndex = resolve => require(['@/views/systemSetting/systemIndex'], resolve)
const FundsManagement = resolve => require(['@/views/orderLogistics/funds/fundsManagement'], resolve)
const LogisticsManagement = resolve => require(['@/views/orderLogistics/logistics/logisticsManagement'], resolve)
const LogisticsEdit = resolve => require(['@/views/orderLogistics/logistics/logisticsEdit'], resolve)
const LogisticsSetAddress = resolve => require(['@/views/orderLogistics/logistics/setAddress'], resolve)
const BindAccount = resolve => require(['@/views/orderLogistics/funds/bindAccount'], resolve)
const PagerEditor = resolve => require(['@/views/myHomePage/pagerEditor/pagerEditor'], resolve)
const ContactDetail = resolve => require(['@/views/contact/contactDetail/contactDetail'], resolve)
export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/forgot',
      name: '忘记密码',
      component: Forgot
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/CreateShop',
      name: '创建店铺',
      component: CreateShop
    },
    {
      path: '/certify',
      name: '认证',
      component: Certify
    },
    {
      path: '/newsList',
      name: '小学堂',
      component: newsList
    },
    {
      path: '/articleDetail/:Id',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '/userIndex',
      name: '登陆后主页模板',
      component: UserIndex,
      children: [
        {
          path: '/contactDetail',
          name: '联系人管理',
          component: ContactDetail
        },
        {
          path: '/pagerEditor',
          name: '官网编辑页',
          component: PagerEditor
        },
        {
          path: '/ppcDetail',
          name: '精准推荐',
          component: PpcDetail
        },
        {
          path: '/orderDetail/:orderid',
          name: '订单详情',
          component: orderDetail
        },
        {
          path: '/orderLogisticSub',
          name: '订单物流主页面',
          component: OrderLogisticSub,
          children: [
            {
              path: '/fundsManagement',
              name: '资金管理',
              component: FundsManagement
            },
            {
              path: '/logisticsManagement',
              name: '物流管理',
              component: LogisticsManagement
            },
            {
              path: '/logisticsEdit/:lid',
              name: '编辑物流模板',
              component: LogisticsEdit
            },
            {
              path: '/logisticsSetAddress',
              name: '编辑物流地址',
              component: LogisticsSetAddress
            },
            {
              path: '/order',
              name: '订单管理',
              component: Order
            },
            {
              path: '/bindAccount',
              name: 'BindAccount',
              component: BindAccount
            }
          ]
        },
        {
          path: '/contactSub',
          name: '联系人管理',
          component: ContactSub,
          children: [
            {
              path: '/contact',
              name: '联系人管理',
              component: Contact
            }
          ]
        },
        {
          path: '/monitorSub',
          name: '全网监控二级菜单',
          component: MonitorSub,
          children: [
            {
              path: '/socialMonitor',
              name: '社交监控',
              component: socialMonitor
            },
            {
              path: '/mailMonitor',
              name: '邮件监控',
              component: mailMonitor
            },
            {
              path: '/inquiryMonitor',
              name: '询盘监控',
              component: inquiryMonitor
            }
          ]
        },
        {
          path: '/customerSub',
          name: '客户开发二级菜单',
          component: CustomerDevSub,
          children: [
            {
              path: '/develop',
              name: '客户开发',
              component: Develop
            },
            {
              path: '/extension',
              name: '社交推广',
              component: Extension
            }
          ]
        },
        {
          path: '/searchResult',
          name: '搜索结果页',
          component: SearchResult
        },
        {
          path: '/companyDetail',
          name: '公司详情页',
          component: CompanyDetail
        },
        {
          path: '/staffDetail',
          name: '员工详情页',
          component: StaffDetail
        },
        {
          path: '/myHomePageSub',
          name: '我的官网',
          component: MyHomePageSub,
          children: [
            {
              path: '/product',
              name: '产品列表',
              component: Product
            },
            {
              path: '/ProductModify/:itemId/:status/:ismodify',
              name: '新增产品',
              component: ProductModify
            },
            {
              path: '/category',
              name: '产品分类',
              component: ProductCategory
            },
            {
              path: '/group',
              name: '分组管理',
              component: Group
            },
            {
              path: '/pageManagement',
              name: '页面管理',
              component: PageManagement
            }
          ]
        },
        {
          path: '/pagePreview',
          name: 'PagePreview',
          component: PagePreview
        },
        {
          path: '/index',
          name: '工作台',
          component: Index
        },
        {
          path: '/explore',
          name: 'Explore',
          component: Explore
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/ppcList',
          name: 'ppcList',
          component: PpcList
        },
        {
          path: '/companyDetail',
          name: 'companyDetail',
          component: companyDetail
        },
        {
          path: '/back/:type',
          name: 'back',
          component: Back
        },
        {
          path: '/setAccount',
          name: '账户设置',
          component: SetAccount
        },
        {
          path: '/setCompany',
          name: '公司设置',
          component: SetCompany
        },
        {
          path: '/setKeyword',
          name: '关键字设置',
          component: SetKeyWord
        },
        {
          path: '/channelList',
          name: '渠道列表',
          component: ChannelList
        },
        {
          path: '/systemIndex',
          name: '系统设置',
          component: SystemIndex
        }
      ]
    }
  ]
})
